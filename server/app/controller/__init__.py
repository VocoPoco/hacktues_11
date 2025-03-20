from .auth_controller import auth_bp


def register_blueprints(app):

    app.register_blueprint(auth_bp)