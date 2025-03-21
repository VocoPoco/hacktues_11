from .auth_controller import auth_bp
from .main_controller import main_bp

def register_blueprints(app):

    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)