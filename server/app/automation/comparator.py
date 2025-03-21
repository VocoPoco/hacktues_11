import json
from .utils.file_manager import extract_json


def compare_freelancers(freelancers, job_description):
    """
    Compare freelancers based on relevant factors (ratings, earnings, and service description match)
    and return the top 3 freelancers suited for the job.

    Args:
        freelancers (list): List of freelancer dictionaries.
        job_description (str): The job description to compare against.

    Returns:
        list: The top 3 freelancers sorted based on their suitability.
    """

    def rating_score(fl):
        """
        Convert feedback percentage to a numeric score.
        If feedback is missing or invalid, return 0.0.

        Args:
            fl (dict): The freelancer dictionary.

        Returns:
            float: The feedback score as a float.
        """
        feedback = fl.get("feedback", "").strip()

        if feedback.endswith("%"):
            try:
                return float(feedback.strip("%")) / 100
            except ValueError:
                return 0.0
        else:
            return 0.0

    def earnings_score(fl):
        try:
            return float(
                fl.get("earnings", "0").replace(",", "").replace("$", "")
            )
        except ValueError:
            return 0.0

    def service_description_match(fl):
        return sum(
            1
            for word in job_description.split()
            if word.lower() in fl["service_desc"].lower()
        )

    def compute_total_score(fl):
        rating_score_value = rating_score(fl) * 0.4
        earnings_score_value = earnings_score(fl) * 0.3
        description_score = service_description_match(fl) * 0.3

        return rating_score_value + earnings_score_value + description_score

    for freelancer in freelancers:
        freelancer["total_score"] = compute_total_score(freelancer)

    freelancers_sorted = sorted(
        freelancers, key=lambda x: x["total_score"], reverse=True
    )

    top_freelancers = freelancers_sorted[:3]

    return top_freelancers


def compare(job_description, budget=None, allocated_time=10):
    """
    Compare freelancers based on the given job description while considering budget constraints.

    Args:
        job_description (str): The job description to compare against.
        budget (float, optional): The maximum budget allowed for hiring a freelancer.
        allocated_time (int, optional): The estimated time in hours the freelancer will be working.

    Returns:
        list: The top 3 freelancers who fit the criteria.
    """
    freelancers = extract_json("freelancers.json")

    if budget is not None:
        # Filter freelancers whose total cost exceeds the budget
        filtered_freelancers = [
            f for f in freelancers  # Changed variable name to `f` to avoid shadowing
            if (
                f.get("service_rates", {}).get("rate_per_hour", 0) * allocated_time +
                f.get("service_rates", {}).get("starting_rate", 0)
            ) <= budget
        ]
    else:
        filtered_freelancers = freelancers  # No budget filtering

    top_freelancers = compare_freelancers(filtered_freelancers, job_description)

    return top_freelancers
