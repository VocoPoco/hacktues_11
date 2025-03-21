from werkzeug.security import generate_password_hash, check_password_hash

from app.extensions import cache, db
from flask_jwt_extended import create_access_token, create_refresh_token, decode_token
from datetime import timedelta, datetime, timezone

from app.repository.token_repository import TokenRepository
from app.repository.user_repository import UserRepository


class AuthService:
    def __init__(self, user_repository: UserRepository, token_repository: TokenRepository):
        self.user_repository = user_repository
        self.token_repository = token_repository

    def register_user(self, username, email, password):
        user_exists = self.user_repository.user_exists(email, username)

        if user_exists:
            return None

        password_hash = generate_password_hash(password)
        user = self.user_repository.create_user(username, email, password_hash)

        db.session.flush()  # Ensures unique constraint before commit
        self.user_repository.save(user)
        return user

    def authenticate_user(self, email, password):
        attempt_key = f"login_attempts:{email}"
        attempts = cache.get(attempt_key) or 0

        if attempts >= 5:
            return None, 'account_locked'

        user = self.user_repository.find_by_email(email)
        if user and check_password_hash(user.password_hash, password):
            cache.delete(attempt_key)
            return user, None
        else:
            cache.set(attempt_key, attempts + 1, timeout=900)
            return None, 'invalid_credentials'

    def generate_tokens(self, user):
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=1))
        refresh_token = create_refresh_token(identity=str(user.id), expires_delta=timedelta(days=30))

        refresh_jti = decode_token(refresh_token)["jti"]

        self.token_repository.create_active_refresh_token(
            user.id, refresh_jti,
            datetime.now(timezone.utc) + timedelta(days=30)
        )

        return access_token, refresh_token

    @staticmethod
    def create_access_token(identity):

        access_expires = timedelta(hours=1)

        access_token = create_access_token(identity=identity, expires_delta=access_expires)

        return access_token

    def get_user_by_id(self, user_id):
        return self.user_repository.find_by_id(int(user_id))

    @staticmethod
    def verify_password(user, current_password):
        return check_password_hash(user.password_hash, current_password)

    def change_password(self, user, new_password):
        user.password_hash = generate_password_hash(new_password)
        self.user_repository.save(user)

    def revoke_access_token(self, jti):
        self.token_repository.store_revoked_access_token(jti)

    def is_access_token_revoked(self, jti):
        return self.token_repository.is_access_token_revoked(jti)

    def revoke_refresh_token(self, jti):
        self.token_repository.store_revoked_refresh_token(jti)
        self.token_repository.delete_active_refresh_token(jti)

    def is_refresh_token_revoked(self, jti):
        return self.token_repository.is_refresh_token_revoked(jti)

    def is_refresh_token_active(self, jti):
        return self.token_repository.is_refresh_token_active(jti)

    def change_username(self, user, new_username):
        user.username = new_username
        self.user_repository.save(user)