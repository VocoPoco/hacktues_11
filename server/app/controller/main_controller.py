import requests

from flask import Blueprint, request, jsonify, Response

from app.repository.freelancers_repository import FreelancerRepository
from app.repository.project_repository import ProjectRepository
from app.repository.subtask_repository import SubtaskRepository
from app.repository.user_repository import UserRepository
from app.service.main_service import MainService
from app.automation.scraper import extract_freelancers
from app.automation.comparator import compare
import json

main_bp = Blueprint("main", __name__, url_prefix="/api")

main_service = MainService(
    FreelancerRepository(), ProjectRepository(), SubtaskRepository(), UserRepository()
)


@main_bp.route("/create-project", methods=["POST"])
def create_project():
    project, budget, time_period, description, username = extract_request_data(request.get_json())
    created = main_service.create_project(project, description, budget, time_period, username)
    return jsonify(created), 201

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
    username = request_data.get("username", "").strip()

    budget = request_data.get("budget", "undefined").strip() if "budget" in request_data else "undefined"
    time_period = request_data.get("time_period", "undefined").strip() if "time_period" in request_data else "undefined"

    if not project:
        raise ValueError("Project is required and cannot be empty.")
    if not description:
        raise ValueError("Description is required and cannot be empty.")
    if not username:
        raise ValueError("Username is required and cannot be empty.")

    return project, budget, time_period, description, username

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