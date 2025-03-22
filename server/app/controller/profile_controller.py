import requests

from flask import Blueprint, request, jsonify

from app.repository.freelancers_repository import FreelancerRepository
from app.repository.project_repository import ProjectRepository
from app.repository.subtask_repository import SubtaskRepository
from app.repository.user_repository import UserRepository
from app.service.profile_service import ProfileService

profile_bp = Blueprint("profile", __name__, url_prefix="/profile")

profile_service = ProfileService(
    UserRepository(), FreelancerRepository(), ProjectRepository(), SubtaskRepository()
)


@profile_bp.route("/projects", methods=["GET"])
def get_all_projects():
    username = request.args.get('username')
    email = request.args.get('email')

    if not username and not email:
        return jsonify({'error': 'Username or email is required'}), 400

    try:
        projects_data = profile_service.get_all_user_projects(username, email)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    
    if projects_data is None:
        return jsonify({'error': 'User not found'}), 404
        
    return jsonify(projects_data), 200

@profile_bp.route("/projects/<int:project_id>", methods=["GET"])
def get_project(project_id):
    username = request.args.get('username')
    email = request.args.get('email')
    
    project_details = profile_service.get_project_details(project_id, username, email)
    
    if project_details is None:
        error_msg = 'Project not found' if profile_service.get_user_by_identifier(username, email) else 'User not found'
        return jsonify({'error': error_msg}), 404
    
    return jsonify(project_details), 200

# @profile_bp.route("/freelancers", methods=["POST"])
# def freelancers():
#     pass