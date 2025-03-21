from models.freelancer_model import Freelancer

class FreelancerRepository:
    def __init__(self, db_session):
        self.db_session = db_session

    def create(self, user_id, **kwargs):
        new_freelancer = Freelancer(user_id=user_id, **kwargs)
        self.db_session.add(new_freelancer)
        self.db_session.commit()
        return new_freelancer

    def get_by_user_id(self, user_id):
        return self.db_session.query(Freelancer).filter_by(user_id=user_id).first()

    def update(self, freelancer, **kwargs):
        for key, value in kwargs.items():
            setattr(freelancer, key, value)
        self.db_session.commit()
        return freelancer

    def delete(self, freelancer):
        self.db_session.delete(freelancer)
        self.db_session.commit()

    def search_by_skills(self, skills):
        return self.db_session.query(Freelancer).filter(
            Freelancer.skills.any(db.cast(skills, ARRAY(db.String)))
        ).all()

    def get_top_rated(self, limit=10):
        return self.db_session.query(Freelancer).order_by(
            Freelancer.total_score.desc()
        ).limit(limit).all()