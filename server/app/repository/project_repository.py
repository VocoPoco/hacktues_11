from models.project_model import Project

class ProjectRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def create(self, name, description, budget, period, user_id):
        new_project = Project(
            name=name,
            description=description,
            budget=budget,
            period=period,
            user_id=user_id
        )
        self.db_session.add(new_project)
        self.db_session.commit()
        return new_project

    def get_by_id(self, project_id):
        return self.db_session.query(Project).get(project_id)

    def get_all_by_user(self, user_id):
        return self.db_session.query(Project).filter_by(user_id=user_id).all()

    def update(self, project, **kwargs):
        for key, value in kwargs.items():
            setattr(project, key, value)
        self.db_session.commit()
        return project

    def delete(self, project):
        self.db_session.delete(project)
        self.db_session.commit()