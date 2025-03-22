from flask import Blueprint, jsonify

from app.repository.freelancers_repository import FreelancerRepository
from app.repository.project_repository import ProjectRepository
from app.repository.subtask_repository import SubtaskRepository
from app.service.test_service import TestService

test_bp = Blueprint("test", __name__, url_prefix="/test")

test_service = TestService(
    FreelancerRepository(),
    ProjectRepository(),
    SubtaskRepository()
)

@test_bp.route("/repos", methods=["GET"])
def test_repositories():
    """Endpoint to test all repository methods."""
    results = test_service.test_repositories()
    return jsonify(results), 200