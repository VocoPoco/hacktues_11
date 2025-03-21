from app.model.subtask_model import Subtask
from app.extensions import db
from sqlalchemy import exists, and_


class SubtaskRepository:
    def find_by_id(self, subtask_id: int) -> Subtask:
        """Return a Subtask by its ID."""
        return Subtask.query.get(subtask_id)

    def find_all_by_project(self, project_id: int) -> list:
        """Return all Subtasks associated with a given project."""
        return Subtask.query.filter_by(project_id=project_id).all()

    def find_all_by_title(self, title: str) -> list:
        """Return all Subtasks that match the given title."""
        return Subtask.query.filter_by(title=title).all()

    def build_subtask(self, project_id: int, title: str, description: str) -> Subtask:
        """
        Instantiate a new Subtask without persisting it immediately.
        Use this method if you want to perform further operations before saving.
        """
        return Subtask(project_id=project_id, title=title, description=description)

    def save(self, subtask: Subtask) -> Subtask:
        """Persist the Subtask to the database."""
        try:
            db.session.add(subtask)
            db.session.commit()
            return subtask
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, subtask: Subtask, **kwargs) -> Subtask:
        """Update attributes of the given Subtask and commit the changes."""
        for key, value in kwargs.items():
            setattr(subtask, key, value)
        try:
            db.session.commit()
            return subtask
        except Exception as e:
            db.session.rollback()
            raise e

    def delete(self, subtask: Subtask) -> None:
        """Delete the given Subtask from the database."""
        try:
            db.session.delete(subtask)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def subtask_exists(self, project_id: int, title: str) -> bool:
        """Check if a Subtask with the specified title exists for the given project."""
        return db.session.query(
            exists().where(
                and_(Subtask.project_id == project_id, Subtask.title == title)
            )
        ).scalar()
