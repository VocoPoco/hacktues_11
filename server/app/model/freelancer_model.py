from app.extensions import db
from sqlalchemy.dialects.postgresql import JSON, ARRAY


class Freelancer(db.Model):
    __tablename__ = "freelancers"

    id = db.Column(db.Integer, primary_key=True)
    avatar_img_url = db.Column(db.String(500), nullable=True)
    screen_name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50), nullable=False)
    earnings = db.Column(db.String(20))
    feedback = db.Column(db.String(10))
    service_title = db.Column(db.String(150), nullable=False)
    service_rates = db.Column(JSON)
    service_desc = db.Column(db.Text, nullable=False)
    skills = db.Column(ARRAY(db.String(50)))
    total_score = db.Column(db.Numeric(10, 1))
    profile_url = db.Column(db.String(500))
    subtask_id = db.Column(db.Integer, db.ForeignKey("subtasks.id"), nullable=False)

    subtask = db.relationship("Subtask", backref="freelancers")

    def __repr__(self):
        return f"<Freelancer {self.screen_name}>"
