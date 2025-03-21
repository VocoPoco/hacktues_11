import json
from utils.file_manager import extract_json


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

    def rating_score(freelancer):
        """
        Convert feedback percentage to a numeric score.
        If feedback is missing or invalid, return 0.0.

        Args:
            freelancer (dict): The freelancer dictionary.

        Returns:
            float: The feedback score as a float.
        """
        feedback = freelancer.get("feedback", "").strip()

        if feedback.endswith("%"):
            try:
                return float(feedback.strip("%")) / 100
            except ValueError:
                return 0.0
        else:
            return 0.0

    def earnings_score(freelancer):
        try:
            return float(
                freelancer.get("earnings", "0").replace(",", "").replace("$", "")
            )
        except ValueError:
            return 0.0

    def service_description_match(freelancer):
        return sum(
            1
            for word in job_description.split()
            if word.lower() in freelancer["service_desc"].lower()
        )

    def compute_total_score(freelancer):
        rating_score_value = rating_score(freelancer) * 0.4
        earnings_score_value = earnings_score(freelancer) * 0.3
        description_score = service_description_match(freelancer) * 0.3

        return rating_score_value + earnings_score_value + description_score

    for freelancer in freelancers:
        freelancer["total_score"] = compute_total_score(freelancer)

    freelancers_sorted = sorted(
        freelancers, key=lambda x: x["total_score"], reverse=True
    )

    top_freelancers = freelancers_sorted[:3]

    return top_freelancers


def compare(job_description):
    freelancers = extract_json("freelancers.json")

    top_freelancers = compare_freelancers(freelancers, job_description)

    return top_freelancers
