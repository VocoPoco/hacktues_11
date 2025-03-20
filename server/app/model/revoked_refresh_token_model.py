from app.extensions import db

class RevokedRefreshToken(db.Model):
    __tablename__ = 'revoked_refresh_tokens'

    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)

    def __init__(self, jti):
        self.jti = jti
