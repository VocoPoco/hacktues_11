import requests

from flask import Blueprint, request, jsonify

from app.repository.freelancers_repository import FreelancerRepository
from app.repository.project_repository import ProjectRepository
from app.repository.subtask_repository import SubtaskRepository
from app.service.main_service import MainService
from app.automation.scraper import extract_freelancers
from app.automation.comparator import compare

main_bp = Blueprint("main", __name__, url_prefix="/api")

main_service = MainService(
    FreelancerRepository(), ProjectRepository(), SubtaskRepository()
)


@main_bp.route("/create-project", methods=["POST"])
def create_project():
    project, budget, time_period, description = extract_request_data(request.get_json())

    dataset = [
        {
            "project": project,
            "description": description,
            "budget": budget,
            "time_period": time_period
        }
    ]

    # somewhere here the project is stored in the database

    print("Dataset:", dataset)

    result = main_service.send_prompt(dataset)

    print("Result:", result)

    content = result.get("message", {}).get("content", [])

    subtasks = []

    for subtask in content:
        transformed_subtask = {
            "Subtask Title": subtask.get("Subtask Description", ""),  # Rename field
            "Assigned Category": subtask.get("Assigned Category", ""),
            "Description": subtask.get("Explanation", ""),  # New field
            "Budget Percentage": subtask.get("Budget Percentage", ""),
            "Approximate Time For Task": subtask.get("Approximate Time For Task", ""),
            "ID": subtask.get("ID", ""),
            "Dependencies": subtask.get("Dependencies", [])
        }
        subtasks.append(transformed_subtask)


    print("Subtask:", subtasks)

    normalize_subtask_percentages(subtasks)

    # for subtask in subtasks:

        # somewhere here the subtasks are stored in the database
        #
        # subtask_budget = None if budget == 'undefined' else float(budget) * float(
        #     subtask.get("Budget Percentage", "0%").strip("%")) / 100
        #
        # subtask_time_period = subtask.get("Approximate Time For Task") if time_period != 'undefined' else None
        #
        # skills = subtask.get("Assigned Category", "") # TODO: Fix this

        # freelancers = extract_freelancers(skills)
        #
        # if subtask_budget is None:
        #     top_freelancers = compare(freelancers)
        # else:
        #     top_freelancers = compare(freelancers, subtask_budget)
        #
        # subtask['top_freelancers'] = top_freelancers
        #
        # if subtask_time_period is not None:
        #     pass
        # subtask['time_period'] = subtask_time_period

    # store the freelancers in the database that needs to be conneceted to the particular task


@main_bp.route("/get-project-data/<int:project_id>", methods=["GET"])
def get_project_data(project_id):
    try:
        project_data = main_service.get_subtasks_and_freelancers_by_project(project_id)

        return jsonify(project_data), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# list all projects
@main_bp.route("/user/<int:user_id>/projects", methods=["GET"])
def list_projects_by_user(user_id):
    """
    Endpoint to list all projects associated with a given user_id.
    """
    try:
        projects = main_service.list_projects_by_user(user_id)
        return jsonify({"projects": projects}), 200
    except Exception as e:
        return jsonify({"error": f"Could not fetch projects: {str(e)}"}), 500


def extract_request_data(request_data):
    project = request_data.get("project", "").strip()
    description = request_data.get("description", "").strip()

    if "budget" not in request_data:
        budget = "undefined"
    budget = request_data.get("budget", "").strip()

    if "time_period" not in request_data:
        time_period = "undefined"
    time_period = request_data.get("time_period", "").strip()

    if not project:
        raise ValueError("Project is required and cannot be empty.")

    if not description:
        raise ValueError("Description is required and cannot be empty.")

    return project, budget, time_period, description

def normalize_subtask_percentages(subtasks):

    total_percentage = 0
    for subtask in subtasks:

        percentage_str = subtask.get("Budget Percentage", "0%")
        percentage = float(percentage_str.strip("%"))
        total_percentage += percentage

    if total_percentage != 100:
        scale_factor = 100 / total_percentage
        for subtask in subtasks:

            percentage_str = subtask.get("Budget Percentage", "0%")
            percentage = float(percentage_str.strip("%"))
            scaled_percentage = percentage * scale_factor

            subtask["Budget Percentage"] = f"{scaled_percentage:.2f}%"