from app.config import Config
from app.controller import register_blueprints
from app.extensions import db, migrate, jwt, socketio, limiter
from flask import Flask


def create_app(config_class=Config):
    app = Flask(__name__)
    app.json.sort_keys = False
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    from app.model.user_model import User
    from app.model.revoked_refresh_token_model import RevokedRefreshToken
    from app.model.revoked_access_token_model import RevokedAccessToken
    from app.model.active_token_model import ActiveRefreshToken

    from app.controller import register_blueprints
    register_blueprints(app)

    return app