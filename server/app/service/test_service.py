class TestService:
    def __init__(self, freelancer_repository, project_repository, subtask_repository):
        self.freelancer_repository = freelancer_repository
        self.project_repository = project_repository
        self.subtask_repository = subtask_repository

    def test_repositories(self):
        """Test all repository methods in the correct order."""
        results = {}

        # Step 1: Create a User (if needed)
        # Since your database is empty, you might need to create a user first.
        # Assuming you have a User model and repository, you can do something like this:
        # user = User(username="test_user", email="test@example.com")
        # db.session.add(user)
        # db.session.commit()
        # For now, we'll assume a user with id=2 exists.

        # Step 2: Create a Project
        project = self.project_repository.build_project(
            name="Test Project",
            description="This is a test project",
            budget=5000,
            time_period="30 days",
            user_id=2  # Use user_id=2
        )
        project = self.project_repository.save(project)
        results["create_project"] = project.id

        # Step 3: Create a Subtask
        subtask = self.subtask_repository.build_subtask(
            project_id=project.id,  # Use the ID of the created project
            title="Test Subtask",
            description="This is a test subtask"
        )
        subtask = self.subtask_repository.save(subtask)
        results["create_subtask"] = subtask.id

        # Step 4: Create a Freelancer
        freelancer = self.freelancer_repository.build_freelancer(
            screen_name="test_freelancer",
            country="USA",
            service_title="Web Developer",
            service_desc="I build websites",
            skills=["Python", "Flask"],
            subtask_id=subtask.id  # Use the ID of the created subtask
        )
        freelancer = self.freelancer_repository.save(freelancer)
        results["create_freelancer"] = freelancer.id

        # Step 5: Test ProjectRepository methods
        found_project = self.project_repository.find_by_id(project.id)
        results["find_project_by_id"] = found_project.id if found_project else None

        updated_project = self.project_repository.update(project, budget=6000)
        results["update_project"] = updated_project.budget

        user_projects = self.project_repository.find_all_by_user_id(2)  # Use user_id=2
        results["find_all_projects_by_user_id"] = [p.id for p in user_projects]

        # Step 6: Test SubtaskRepository methods
        found_subtask = self.subtask_repository.find_by_id(subtask.id)
        results["find_subtask_by_id"] = found_subtask.id if found_subtask else None

        updated_subtask = self.subtask_repository.update(subtask, title="Updated Subtask")
        results["update_subtask"] = updated_subtask.title

        project_subtasks = self.subtask_repository.find_all_by_project(project.id)
        results["find_all_subtasks_by_project"] = [s.id for s in project_subtasks]

        # Step 7: Test FreelancerRepository methods
        found_freelancer = self.freelancer_repository.find_by_id(freelancer.id)
        results["find_freelancer_by_id"] = found_freelancer.id if found_freelancer else None

        updated_freelancer = self.freelancer_repository.update(freelancer, service_title="Senior Web Developer")
        results["update_freelancer"] = updated_freelancer.service_title

        freelancers_with_skill = self.freelancer_repository.search_all_by_skills("Python")
        results["search_freelancers_by_skills"] = [f.id for f in freelancers_with_skill]


        return results