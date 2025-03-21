zfrom app.model.subtask_model import Subtask
from app.extensions import db
from sqlalchemy import exists, and_


class SubtaskRepository:

    def find_by_id(self, subtask_id):
        return Subtask.query.get(subtask_id)

    def find_all_by_project(self, project_id):
        return Subtask.query.filter_by(project_id=project_id).all()

    def find_all_by_title(self, title):
        return Subtask.query.filter_by(title=title).all()

    def create_subtask(self, project_id, title, description):
        return Subtask(
            project_id=project_id,
            title=title,
            description=description
        )

    def save(self, subtask):
        db.session.add(subtask)
        db.session.commit()
        return subtask

    def update(self, subtask, **kwargs):
        for key, value in kwargs.items():
            setattr(subtask, key, value)
        db.session.commit()
        return subtask

    def delete(self, subtask):
        db.session.delete(subtask)
        db.session.commit()

    def subtask_exists(self, project_id, title):
        return db.session.query(
            exists().where(
                and_(  # Use explicit AND condition
                    Subtask.project_id == project_id,
                    Subtask.title == title
                )
            )
        ).scalar()