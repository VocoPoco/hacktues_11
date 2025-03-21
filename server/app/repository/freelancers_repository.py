from app.model.freelanser_model import Freelancer
from app.extensions import db
from sqlalchemy import exists, and_, ARRAY, String, cast

class FreelancerRepository:

    def find_by_id(self, freelancer_id):
        return Freelancer.query.get(freelancer_id)

    def find_all_by_subtask_id(self, subtask_id):
        return Freelancer.query.filter_by(subtask_id=subtask_id).all()

    def create_freelancer(self, user_id, **kwargs):
        return Freelancer(user_id=user_id, **kwargs)

    def save(self, freelancer):
        db.session.add(freelancer)
        db.session.commit()
        return freelancer

    def update(self, freelancer, **kwargs):
        for key, value in kwargs.items():
            setattr(freelancer, key, value)
        db.session.commit()
        return freelancer

    def delete(self, freelancer):
        db.session.delete(freelancer)
        db.session.commit()

    def freelancer_exists(self, user_id, email):
        return db.session.query(
            exists().where(
                and_(
                    Freelancer.user_id == user_id,
                    Freelancer.email == email
                )
            )
        ).scalar()

    def search_all_by_skills(self, skills):
        return Freelancer.query.filter(
            Freelancer.skills.any(cast(skills, ARRAY(String)))
        ).all()

    def get_all_top_rated(self, limit=10):
        return Freelancer.query.order_by(
            Freelancer.total_score.desc()
        ).limit(limit).all()