import requests

from flask import Blueprint, request, jsonify
from app.service.main_service import get_subcategories_for_category
from app.utils.consts import CATEGORIES
from app.automation.scraper import extract_freelancers
from app.automation.comparator import compare_freelancers
main_bp = Blueprint('categories', __name__, url_prefix='/api')

def flatten_categories(categories_dict):
    categories_list = []

    def recurse(dictionary, parent=""):
        for key, value in dictionary.items():
            full_category = f"{parent} > {key}" if parent else key
            categories_list.append(full_category)
            if isinstance(value, dict) and value:
                recurse(value, full_category)

    recurse(categories_dict)
    return categories_list


# Get the full list of categories
CATEGORIES_LIST = flatten_categories(CATEGORIES)


@main_bp.route('/subcategories', methods=['GET'])
def fetch_subcategories():
    category = request.args.get('category')
    if not category:
        return jsonify({'error': 'Missing "category" query parameter'}), 400

    try:
        subcats = get_subcategories_for_category(category)
        return jsonify({'category': category, 'subcategories': subcats}), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 404

    except Exception:
        return jsonify({'error': 'Internal server error'}), 500


@main_bp.route('/subtasks', methods=['POST'])
def fetch_subtasks():
    task = request.args.get('task', '')
    if not task:
        return jsonify({"error": "Task is required"}), 400

    prompt = (
        f"You are provided with a list of freelancer categories: {CATEGORIES_LIST}. "
        f"Analyze the following task and break it down into clear, actionable subtasks. "
        f"For each subtask, assign the most relevant category from the provided list. "
        f"Please format your response as follows:\n"
        f"Subtask Description: A brief description of the subtask.\n"
        f"    • Assigned Category: The category chosen.\n"
        f"    • Explanation: (Optional) A short explanation of why this category fits.\n"
        f"Task: {task}"
    )
    api_url = "http://127.0.0.1:11434/api/chat?model=llama3.2:latest"
    response = requests.post(api_url, json={"prompt": prompt})

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({
            "error": "Failed to fetch response from API",
            "details": response.text
        }), 500


@main_bp.route('/process_task', methods=['POST'])
def process_task():
    """
    Processes a main task by:
    1. Sending the task with a prompt to the Llama AI.
    2. Receiving subtasks with required skills.
    3. Aggregating these skills.
    4. Using the skills to fetch freelancers.
    5. Comparing the freelancers using the comparator's compare_freelancers function.
    """
    data = request.get_json(force=True)
    task = data.get("task")
    if not task:
        return jsonify({"error": "Task is required"}), 400

    # Build prompt expecting JSON-formatted subtasks with skills
    prompt = (
        f"You are provided with a list of freelancer categories: {CATEGORIES_LIST}. "
        "Analyze the following task and break it down into clear, actionable subtasks. "
        "For each subtask, assign the most relevant freelancer category and list the required skills. "
        "Please format your response as a JSON array of objects with the keys: "
        "'subtask' (a brief description), "
        "'assigned_category' (the chosen category), and "
        "'skills' (an array of required skills). "
        f"Task: {task}"
    )

    api_url = "http://127.0.0.1:11434/api/chat?model=llama3.2:latest"
    response = requests.post(api_url, json={"prompt": prompt})

    if response.status_code != 200:
        return jsonify({
            "error": "Failed to fetch response from API",
            "details": response.text
        }), 500

    try:
        subtasks_data = response.json()

        # Aggregate skills from each returned subtask
        all_skills = []
        for subtask in subtasks_data:
            skills = subtask.get("skills", [])
            if isinstance(skills, str):
                # Convert a comma-separated string to list
                skills = [s.strip() for s in skills.split(",")]
            if isinstance(skills, list):
                all_skills.extend(skills)
        unique_skills = list(set(all_skills))

        # Fetch freelancers based on the aggregated skills
        freelancers = extract_freelancers(unique_skills)
        # Compare freelancers using the job description (task) to select the top 3
        top_freelancers = compare_freelancers(freelancers, task)

        return jsonify({
            "subtasks": subtasks_data,
            "freelancers": freelancers,
            "top_freelancers": top_freelancers
        }), 200

    except Exception as e:
        return jsonify({
            "error": "Failed to process task",
            "details": str(e)
        }), 500
