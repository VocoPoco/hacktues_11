import random
from datetime import datetime, timedelta
from app import create_app
from app.extensions import db
from app.model.user_model import User
from app.model.project_model import Project
from app.model.subtask_model import Subtask
from app.model.freelancer_model import Freelancer

app = create_app()
app.app_context().push()

# Sample data arrays
USERNAMES = ["john_doe", "alice_smith", "bob_jones", "emma_wilson"]
EMAILS = ["john@example.com", "alice@example.com", "bob@example.com", "emma@example.com"]
SERVICES = ["Web Development", "Graphic Design", "Content Writing", "SEO Optimization"]
SKILLS = ["Python", "JavaScript", "Photoshop", "SEO", "Copywriting", "React", "Node.js"]
CITIES = ["New York", "London", "Tokyo", "Sydney"]

def create_users():
    users = []
    for username, email in zip(USERNAMES, EMAILS):
        user = User(
            username=username,
            email=email,
            password_hash="dummy_hash",  # In real scenario, use generate_password_hash
            role="user"
        )
        db.session.add(user)
        users.append(user)
    db.session.commit()
    return users

def create_projects(users):
    projects = []
    for user in users:
        for i in range(2):  # 2 projects per user
            project = Project(
                name=f"{user.username}'s Project {i+1}",
                description=f"Description for {user.username}'s project {i+1}",
                budget=random.randint(1000, 10000),
                time_period=random.choice(["1-3 months", "3-6 months", "6+ months"]),
                user_id=user.id,
                created_at=datetime.utcnow() - timedelta(days=random.randint(1, 30)))
            db.session.add(project)
            projects.append(project)
    db.session.commit()
    return projects

def create_subtasks(projects):
    subtasks = []
    for project in projects:
        for i in range(3):  # 3 subtasks per project
            subtask = Subtask(
                title=f"Subtask {i+1} for {project.name}",
                description=f"Description for subtask {i+1}",
                project_id=project.id,
                dependency_ids=[]
            )
            db.session.add(subtask)
            subtasks.append(subtask)
    db.session.commit()
    return subtasks

def create_freelancers(subtasks):
    service_descriptions = [
        "Professional service with guaranteed quality",
        "Expert implementation with quick turnaround",
        "Comprehensive solution for your needs",
        "Industry-leading best practices applied"
    ]
    
    for subtask in subtasks:
        for i in range(2):  # 2 freelancers per subtask
            freelancer = Freelancer(
                screen_name=f"freelancer_{subtask.id}_{i}",
                service_title=random.choice(SERVICES),
                service_desc=random.choice(service_descriptions),
                service_rates={"hourly": random.randint(20, 100)},
                skills=random.sample(SKILLS, k=2),
                total_score=round(random.uniform(3.5, 5.0), 1),
                profile_url=f"https://example.com/profile/{subtask.id}_{i}",
                subtask_id=subtask.id,
                city=random.choice(CITIES),
                country="USA",
                # These fields are nullable in model
                avatar_img_url=None,
                state=None,
                earnings=None,
                feedback=None
            )
            db.session.add(freelancer)
    db.session.commit()

def main():
    # Clear existing data
    db.drop_all()
    db.create_all()

    # Create hierarchy
    users = create_users()
    projects = create_projects(users)
    subtasks = create_subtasks(projects)
    create_freelancers(subtasks)

    print("Database populated successfully!")
    print(f"Created: {len(users)} users, {len(projects)} projects, {len(subtasks)} subtasks")

if __name__ == "__main__":
    main()