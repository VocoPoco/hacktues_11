class ProjectDataDTO:
    def __init__(self, project_id, subtasks):
        self.project_id = project_id
        self.subtasks = subtasks

    def to_dict(self):
        return {
            "project_id": self.project_id,
            "subtasks": [subtask.to_dict() for subtask in self.subtasks]
        }