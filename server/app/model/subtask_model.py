from app.extensions import db

class Subtask(db.Model):
    __tablename__ = "subtask"

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    title = db.Column(db.String(100), nullable=False)

    project = db.relationship('Project', backref='subtasks')

    def __repr__(self):
        return f'<Subtask {self.title}>'
