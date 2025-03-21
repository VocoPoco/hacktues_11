from app.extensions import db
from sqlalchemy.dialects.postgresql import ARRAY


class Subtask(db.Model):
    __tablename__ = "subtasks"

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    dependency_ids = db.Column(ARRAY(db.Integer), nullable=False, default=list)

    project = db.relationship("Project", backref="subtasks")

    def __repr__(self):
        return f"<Subtask {self.title}>"
