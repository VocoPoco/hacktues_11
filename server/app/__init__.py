from app.config import Config
from app.controller import register_blueprints
from app.extensions import db, migrate, jwt, socketio, limiter, cors, cache
from flask import Flask


def create_app(config_class=Config):
    app = Flask(__name__)
    app.json.sort_keys = False
    app.config.from_object(config_class)

    cors.init_app(app, resources={
        r"/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": app.config['CORS_METHODS'],
            "allow_headers": app.config['CORS_ALLOW_HEADERS'],
            "supports_credentials": app.config['CORS_SUPPORTS_CREDENTIALS'],
            "expose_headers": ["Content-Type", "Authorization"]  
        },
    })

    cache.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")

    from app.model.user_model import User
    from app.model.revoked_refresh_token_model import RevokedRefreshToken
    from app.model.revoked_access_token_model import RevokedAccessToken
    from app.model.active_token_model import ActiveRefreshToken
    from app.model.project_model import Project
    from app.model.freelancer_model import Freelancer
    from app.model.subtask_model import Subtask


    from app.controller import register_blueprints
    register_blueprints(app)

    return app