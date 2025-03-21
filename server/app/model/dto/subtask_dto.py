class SubtaskDTO:
    def __init__(self, subtask_id, subtask_title, subtask_description, freelancers):
        self.subtask_id = subtask_id
        self.subtask_title = subtask_title
        self.subtask_description = subtask_description
        self.freelancers = freelancers

    def to_dict(self):
        return {
            "subtask_id": self.subtask_id,
            "subtask_title": self.subtask_title,
            "subtask_description": self.subtask_description,
            "freelancers": [freelancer.to_dict() for freelancer in self.freelancers]
        }