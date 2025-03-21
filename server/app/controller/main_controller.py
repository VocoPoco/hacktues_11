import requests

from flask import Blueprint, request, jsonify
from app.service.main_service import MainService
from app.utils.consts import CATEGORIES
from app.automation.scraper import extract_freelancers
from app.automation.comparator import compare
main_bp = Blueprint('categories', __name__, url_prefix='/api')

main_service = MainService()

@main_bp.route('/create-project', methods=['POST'])
def create_project():
    task, budget, time_period, description = extract_project_data(request.get_json())

    dataset = [
        {
            "task": task,
            "description": description,
            "budget": budget,
            "time_period": time_period
        }
    ]
    # somewhere here the big task is stored in the database

    result = main_service.send_prompt(dataset)

    for entry in result:

        # somewhere here the subtasks are stored in the database

        subtasks = entry.get('subtasks', [])

        for subtask in subtasks:
            subtask_budget = None if budget == 'undefined' else budget * subtask.get('budget_percentage', 0)

            subtask_time_period = subtask.get('time_period') if time_period != 'undefined' else None

            skills = subtask.get('skills', [])
            freelancers = extract_freelancers(skills)

            if subtask_budget is None:
                top_freelancers = compare(freelancers)
            else:
                top_freelancers = compare(freelancers, subtask_budget)

            subtask['top_freelancers'] = top_freelancers

            if subtask_time_period is not None:
                pass
            subtask['time_period'] = subtask_time_period

        # store the freelancers in the database that needs to be conneceted to the particular task

# request that fetches the freelancers from the db and sends a request with the freelancers to visualize the result in the frontend

def extract_project_data(request_data):
    task = request_data.get('task', '').strip()
    description = request_data.get('description', '').strip()

    if 'budget' not in request_data:
        budget = 'undefined'
    budget = request_data.get('budget', '').strip()

    if 'time_period' not in request_data:
        time_period = 'undefined'
    time_period = request_data.get('time_period', '').strip()

    if not task:
        raise ValueError("Task is required and cannot be empty.")

    if not description:
        raise ValueError("Description is required and cannot be empty.")

    return task, budget, time_period, description