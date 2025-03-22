# app/service/profile_service.py
from typing import Optional, Dict, List

from app.repository.user_repository import UserRepository
from app.repository.freelancers_repository import FreelancerRepository
from app.repository.project_repository import ProjectRepository
from app.repository.subtask_repository import SubtaskRepository

class ProfileService:
    def __init__(
        self, 
        user_repo: UserRepository,
        freelancer_repo: FreelancerRepository,
        project_repo: ProjectRepository,
        subtask_repo: SubtaskRepository
    ):
        self.user_repo = user_repo
        self.freelancer_repo = freelancer_repo
        self.project_repo = project_repo
        self.subtask_repo = subtask_repo

    def get_user_by_identifier(self, username: Optional[str], email: Optional[str]):

        if not username and not email:
            raise ValueError("Either username or email must be provided")
            
        if username:
            return self.user_repo.find_by_username(username)
        return self.user_repo.find_by_email(email)

    def get_all_user_projects(self, username: str = None, email: str = None) -> List[Dict]:

        user = self.get_user_by_identifier(username, email)
        if not user:
            return None

        projects = self.project_repo.find_all_by_user_id(user.id)
        return [self._format_project_summary(project) for project in projects]

    def _format_project_summary(self, project) -> Dict:

        subtasks = self.subtask_repo.find_all_by_project(project.id)
        return {
            'name': project.name,
            'budget': float(project.budget) if project.budget else None,
            'time_period': project.time_period,
            'created_at': project.created_at.isoformat() if project.created_at else None,
            'subtask_titles': [subtask.title for subtask in subtasks],
            'id': project.id
        }

    def get_project_details(self, project_id: int, username: str = None, email: str = None) -> Optional[Dict]:

        user = self.get_user_by_identifier(username, email)
        if not user:
            return None

        project = self.project_repo.find_by_id(project_id)
        if not project or project.user_id != user.id:
            return None

        return self._format_project_details(project)

    def _format_project_details(self, project) -> Dict:

        subtasks = self.subtask_repo.find_all_by_project(project.id)
        return {
            'project': self._format_project(project),
            'subtasks': [self._format_subtask(subtask) for subtask in subtasks]
        }

    def _format_project(self, project) -> Dict:

        return {
            'id': project.id,
            'name': project.name,
            'description': project.description,
            'budget': float(project.budget) if project.budget else None,
            'time_period': project.time_period,
            'created_at': project.created_at.isoformat() if project.created_at else None
        }

    def _format_subtask(self, subtask) -> Dict:

        freelancers = self.freelancer_repo.find_all_by_subtask_id(subtask.id)
        return {
            'id': subtask.id,
            'title': subtask.title,
            'description': subtask.description,
            'freelancers': [self._format_freelancer(f) for f in freelancers]
        }

    def _format_freelancer(self, freelancer) -> Dict:

        return {
            'id': freelancer.id,
            'screen_name': freelancer.screen_name,
            'service_title': freelancer.service_title,
            'service_rates': freelancer.service_rates,
            'skills': freelancer.skills,
            'total_score': float(freelancer.total_score) if freelancer.total_score else None,
            'profile_url': freelancer.profile_url
        }