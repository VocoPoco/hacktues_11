from app.model.dto.freelancer_dto import FreelancerDTO
from app.model.dto.project_data_dto import ProjectDataDTO
from app.model.dto.subtask_dto import SubtaskDTO
from app.utils.consts import CATEGORIES
from app.model.user_model import User
import requests
from flask import jsonify
import ollama
import json


class MainService:
    def __init__(self, freelancer_repository, project_repository, subtask_repository, user_repository):
        self.FreelancerRepository = freelancer_repository
        self.ProjectRepository = project_repository
        self.SubtaskRepository = subtask_repository
        self.UserRepository = user_repository

    def create_project(self, project, description, budget, time_period, username):
        user = self.UserRepository.find_by_username(username)
        proj = self.ProjectRepository.build_project(project, description, budget, time_period, user.id)
        self.ProjectRepository.save(proj)

        dataset = [{"project": project, "description": description, "budget": budget, "time_period": time_period}]
        subtasks = self._generate_and_store_subtasks(proj.id, dataset)

        return {"project_id": proj.id, "subtasks": subtasks}

    def _generate_and_store_subtasks(self, project_id, dataset):
        response = self.send_prompt(dataset)
        raw = json.dumps(response.text)

        try:
            subtasks = json.loads(str(raw))
        except ValueError:
            return jsonify({"error": "Invalid JSON from Ollama", "raw": str(raw)}), 500
        stored = []

        for entry in subtasks:
            sub = self.SubtaskRepository.build_subtask(
                project_id=project_id,
                title=entry["title"],
                description=entry["description"],
                dependencies=entry.get("dependencies", []),
            )
            self.SubtaskRepository.save(sub)
            stored.append(sub.to_dict())

        return stored

    def get_subtasks_and_freelancers_by_project(self, project_id):

        subtasks = self.SubtaskRepository.find_all_by_project(project_id)

        if not subtasks:
            return ProjectDataDTO(project_id=project_id, subtasks=[]).to_dict()

        subtask_dtos = []
        for subtask in subtasks:
            freelancers = self.FreelancerRepository.find_all_by_subtask_id(subtask.id)

            freelancer_dtos = [
                FreelancerDTO(
                    freelancer_id=freelancer.id,
                    freelancer_name=freelancer.name,
                    freelancer_skills=freelancer.skills,
                )
                for freelancer in freelancers
            ]

            subtask_dtos.append(
                SubtaskDTO(
                    subtask_id=subtask.id,
                    subtask_title=subtask.title,
                    subtask_description=subtask.description,
                    freelancers=freelancer_dtos,
                )
            )

        # Create and return ProjectDataDTO
        return ProjectDataDTO(project_id=project_id, subtasks=subtask_dtos).to_dict()

    def list_projects_by_user(self, user_id):
        """
        Retrieves all projects from the repository by a given user_id.
        """
        try:
            projects = self.ProjectRepository.find_all_by_user_id(user_id)
            return projects
        except Exception as e:
            # Optionally, add logging or more specific error handling here
            raise Exception(f"Error fetching projects for user {user_id}: {str(e)}")

    def send_prompt(self, dataset):
        data = dataset[0]
        project = data.get("project", "")
        description = data.get("description", "")
        budget = data.get("budget", "undefined")
        time_period = data.get("time_period", "undefined")

        prompt = f'''Freelancer Categories: {json.dumps(CATEGORIES)}.
        Project: "{project}".
        Overall Timeline: {time_period}.
        Use only the information provided below. Analyze the project and decompose it into clear, actionable subtasks. For each subtask, assign the most relevant category or categories from the provided hierarchical list. Each assignment must include at least one main category, and from that main category, choose an appropriate subcategory and top skill. The assigned categories should be provided as an array containing the hierarchical skills in the format [Main Category, Sub Category, Top Skill]. Output only a structured JSON array exactly following this format: [ {{ "title": "Title", "description": "Description", "categories": ["Main Category", "Sub Category", "Top Skill"], "budget_percentage": "Estimated percentage of the total budget", "approximate_time": "Estimated time for completion of the subtask", "ID": "Unique identifier for the subtask", "dependencies": ["ID(s) of dependent subtasks"] }} ]. Constraints: - Use exclusively the provided data; do not infer or generate any additional information. - Do not include any text or commentary outside of the JSON array. - Ensure clarity and brevity in all fields. - All subtask times must sum up to the overall project timeline {time_period}.'''

        payload = {
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }

        response = ollama.chat(
            model="llama2:7b",
            messages=payload["messages"],
            options={"temperature": 0.2},
            stream=False
        )

        return response

    # @staticmethod
    # def __format_hierarchy(self, categories):
    #     lines = []
    #     for main_cat, sub_cats in categories.items():
    #         lines.append(f"- {main_cat}")
    #         for sub_cat, final_cats in sub_cats.items():
    #             lines.append(f" - {sub_cat}")
    #             for final_cat in final_cats:
    #                 lines.append(f" - {final_cat}")
    #         return "\n".join(lines)

    # here needs to create a function that must get as a parameter the specific project id and by the project id to return all the subtasks and freelancers connected to the subtask that are connected to the project from the database using the repositories
    # for subtasks in project
    # for freelancers in subtask
    # return freelancers
