from server.app.model.freelancer_model import Freelancer
from app.extensions import db
from sqlalchemy import exists, and_, String


class FreelancerRepository:
    def find_by_id(self, freelancer_id: int) -> Freelancer:
        """Return a Freelancer by its ID."""
        return Freelancer.query.get(freelancer_id)

    def find_all_by_subtask_id(self, subtask_id: int) -> list:
        """Return all Freelancers associated with a specific subtask."""
        return Freelancer.query.filter_by(subtask_id=subtask_id).all()

    def build_freelancer(self, **kwargs) -> Freelancer:
        """
        Instantiate a new Freelancer.
        Note: Ensure that kwargs match the Freelancer model attributes.
        """
        return Freelancer(**kwargs)

    def save(self, freelancer: Freelancer) -> Freelancer:
        """Persist a Freelancer to the database."""
        try:
            db.session.add(freelancer)
            db.session.commit()
            return freelancer
        except Exception as e:
            db.session.rollback()
            raise e

    def update(self, freelancer: Freelancer, **kwargs) -> Freelancer:
        """Update attributes for a given Freelancer."""
        for key, value in kwargs.items():
            setattr(freelancer, key, value)
        try:
            db.session.commit()
            return freelancer
        except Exception as e:
            db.session.rollback()
            raise e

    def delete(self, freelancer: Freelancer) -> None:
        """Delete a Freelancer from the database."""
        try:
            db.session.delete(freelancer)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e

    def freelancer_exists(self, unique_identifier) -> bool:
        """
        Check if a Freelancer exists using a unique identifier.
        Adjust the query based on the actual unique field in your Freelancer model.
        """
        return db.session.query(
            exists().where(Freelancer.screen_name == unique_identifier)
        ).scalar()

    def search_all_by_skills(self, skill: str) -> list:
        """
        Return all Freelancers that have a specific skill in their skills array.
        Assumes 'skill' is a string and Freelancer.skills is an ARRAY of strings.
        """
        return Freelancer.query.filter(Freelancer.skills.any(skill)).all()
