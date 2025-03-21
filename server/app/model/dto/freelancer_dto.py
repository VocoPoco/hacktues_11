class FreelancerDTO:
    def __init__(self, freelancer_id, freelancer_name, freelancer_skills):
        self.freelancer_id = freelancer_id
        self.freelancer_name = freelancer_name
        self.freelancer_skills = freelancer_skills

    def to_dict(self):
        return {
            "freelancer_id": self.freelancer_id,
            "freelancer_name": self.freelancer_name,
            "freelancer_skills": self.freelancer_skills
        }