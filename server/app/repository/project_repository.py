from app.model.project_model import Project
from app.extensions import db
from sqlalchemy import exists, and_

class ProjectRepository:
    def find_by_id(self, project_id):
        return Project.query.get(project_id)

    def find_all_by_user_id(self, user_id):
        return Project.query.filter_by(user_id=user_id).all()

    def create_project(self, name, description, budget, period, user_id):
        return Project(
            name=name,
            description=description,
            budget=budget,
            period=period,
            user_id=user_id
        )

    def save(self, project):
        db.session.add(project)
        db.session.commit()
        return project

    def update(self, project, **kwargs):
        for key, value in kwargs.items():
            setattr(project, key, value)
        db.session.commit()
        return project

    def delete(self, project):
        db.session.delete(project)
        db.session.commit()

    def project_exists(self, user_id, name):
        return db.session.query(
            exists().where(
                and_(
                    Project.user_id == user_id,
                    Project.name == name
                )
            )
        ).scalar()