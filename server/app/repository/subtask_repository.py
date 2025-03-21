from models.subtask_model import Subtask

class SubtaskRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def create_subtask(self, project_id, title, description):
        new_subtask = Subtask(
            project_id=project_id,
            title=title,
            description=description
        )
        self.db_session.add(new_subtask)
        self.db_session.commit()
        return new_subtask

    def get_by_project(self, project_id):
        return self.db_session.query(Subtask).filter_by(project_id=project_id).all()

    def get_by_id(self, subtask_id):
        return self.db_session.query(Subtask).get(subtask_id)

    def update_subtask(self, subtask, **kwargs):
        for key, value in kwargs.items():
            setattr(subtask, key, value)
        self.db_session.commit()
        return subtask

    def delete_subtask(self, subtask):
        self.db_session.delete(subtask)
        self.db_session.commit()