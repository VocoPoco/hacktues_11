from app.model.project_model import Project
from app.extensions import db
from sqlalchemy import exists, and_


class ProjectRepository:
    def find_by_id(self, project_id: int) -> Project:
        """Retrieve a Project by its ID."""
        return Project.query.get(project_id)

    def find_all_by_user_id(self, user_id: int) -> list:
        """Retrieve all Projects associated with a given user ID."""
        return Project.query.filter_by(user_id=user_id).all()

    def build_project(
        self, name: str, description: str, budget, time_period: str, user_id: int
    ) -> Project:
        """
        Instantiate a new Project instance.
        This method does not persist the project to the database.
        """
        return Project(
            name=name,
            description=description,
            budget=budget,
            time_period=time_period,
            user_id=user_id,
        )

    def save(self, project: Project) -> Project:
        """Persist the given Project to the database."""
        try:
            db.session.add(project)
            db.session.commit()
            return project
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, project: Project, **kwargs) -> Project:
        """Update attributes of the given Project and commit changes."""
        for key, value in kwargs.items():
            setattr(project, key, value)
        try:
            db.session.commit()
            return project
        except Exception as e:
            db.session.rollback()
            raise e

    def delete(self, project: Project) -> None:
        """Delete the given Project from the database."""
        try:
            db.session.delete(project)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def project_exists(self, user_id: int, name: str) -> bool:
        """Check if a Project exists for the given user ID and name."""
        return db.session.query(
            exists().where(and_(Project.user_id == user_id, Project.name == name))
        ).scalar()
