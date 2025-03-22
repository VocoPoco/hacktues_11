from .auth_controller import auth_bp
from .main_controller import main_bp
from .test_controller import test_bp
from .profile_controller import profile_bp

def register_blueprints(app):

    app.register_blueprint(auth_bp)
    app.register_blueprint(main_bp)
    app.register_blueprint(test_bp)
    app.register_blueprint(profile_bp)

