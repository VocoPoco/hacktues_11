from datetime import datetime, timezone

from app.model.active_token_model import ActiveRefreshToken
from app.model.revoked_access_token_model import RevokedAccessToken
from app.model.revoked_refresh_token_model import RevokedRefreshToken
from app.extensions import db

class TokenRepository:

    def create_active_refresh_token(self, user_id, jti, expires_at):
        token = ActiveRefreshToken(user_id=user_id, jti=jti, expires_at=expires_at)
        db.session.add(token)
        db.session.commit()

    def is_refresh_token_active(self, jti):
        token = db.session.query(ActiveRefreshToken).filter_by(jti=jti).first()
        return token and token.expires_at > datetime.now(timezone.utc)

    def delete_active_refresh_token(self, jti):
        db.session.query(ActiveRefreshToken).filter_by(jti=jti).delete()
        db.session.commit()

    def remove_expired_refresh_tokens(self):
        db.session.query(ActiveRefreshToken).filter(ActiveRefreshToken.expires_at < datetime.now(timezone.utc)).delete()
        db.session.commit()

    def store_revoked_access_token(self, jti):
        revoked_token = RevokedAccessToken(jti=jti)
        db.session.add(revoked_token)
        db.session.commit()

    def is_access_token_revoked(self, jti):
        return db.session.query(RevokedAccessToken.id).filter_by(jti=jti).scalar() is not None

    def store_revoked_refresh_token(self, jti):
        revoked_refresh_token = RevokedRefreshToken(jti=jti)
        db.session.add(revoked_refresh_token)
        db.session.commit()

    def is_refresh_token_revoked(self, jti):
        return db.session.query(RevokedRefreshToken.id).filter_by(jti=jti).scalar() is not None
