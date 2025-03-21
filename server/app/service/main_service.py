from app.model.dto.freelancer_dto import FreelancerDTO
from app.model.dto.project_data_dto import ProjectDataDTO
from app.model.dto.subtask_dto import SubtaskDTO
from app.utils.consts import CATEGORIES, LLAMA_PROMPT
import requests
from flask import jsonify

class MainService:
    def __init__(self, freelancer_repository, project_repository, subtask_repository):
        self.FreelancerRepository = freelancer_repository
        self.ProjectRepository = project_repository
        self.SubtaskRepository = subtask_repository

    def send_prompt(self, dataset):
        prompt = self.__construct_prompt(dataset)

        api_url = "http://127.0.0.1:11434/api/chat?model=llama3.2:latest"
        response = requests.post(api_url, json={"prompt": prompt})

        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                "error": "Failed to fetch response from API",
                "details": response.text
            }), 500

    @staticmethod
    def __construct_prompt(self, dataset):
        formatted_categories = self.__format_hierarchy(CATEGORIES)

        formatted_prompts = []

        if 'project' not in dataset or 'description' not in dataset:
            raise KeyError("Each dataset item must contain 'project', 'description' and 'time_period' keys.")

        formatted_prompt = LLAMA_PROMPT.replace("[project]",
                                                dataset["project"]).replace("[description]",
                                                                                dataset["description"]).replace("[categories]",
                                                                                                                formatted_categories).replace("[time_period]",
                                                                                                                                              dataset["time_period"])
        formatted_prompts.append(formatted_prompt)

        return formatted_prompts

    def get_subtasks_and_freelancers_by_project(self, project_id):

        # Get all subtasks for the project
        subtasks = self.SubtaskRepository.find_all_by_project(project_id)

        if not subtasks:
            return ProjectDataDTO(project_id=project_id, subtasks=[]).to_dict()

        # Prepare the result
        subtask_dtos = []
        for subtask in subtasks:
            freelancers = self.FreelancerRepository.find_all_by_subtask_id(subtask.id)

            freelancer_dtos = [
                FreelancerDTO(
                    freelancer_id=freelancer.id,
                    freelancer_name=freelancer.name,
                    freelancer_skills=freelancer.skills
                )
                for freelancer in freelancers
            ]

            subtask_dtos.append(
                SubtaskDTO(
                    subtask_id=subtask.id,
                    subtask_title=subtask.title,
                    subtask_description=subtask.description,
                    freelancers=freelancer_dtos
                )
            )

        # Create and return ProjectDataDTO
        return ProjectDataDTO(project_id=project_id, subtasks=subtask_dtos).to_dict()

    @staticmethod
    def __format_hierarchy(self, categories):
     lines = []
     for main_cat, sub_cats in categories.items():
        lines.append(f"- {main_cat}")
        for sub_cat, final_cats in sub_cats.items():
            lines.append(f" - {sub_cat}")
            for final_cat in final_cats:
                lines.append(f" - {final_cat}")
        return "\n".join(lines)

     # here needs to create a function that must get as a parameter the specific project id and by the project id to return all the subtasks and freelancers connected to the subtask that are connected to the project from the database using the repositories
     # for subtasks in project
        # for freelancers in subtask
            # return freelancers
