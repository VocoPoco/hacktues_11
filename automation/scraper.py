import requests
from bs4 import BeautifulSoup
from constants import BASE_URL, HEADERS


def fetch_talents(keywords):
    """
    Fetches the list of talents from the Upwork search page based on provided keywords.

    Args:
        keywords (str): The search keywords to use in the Upwork URL.

    Returns:
        list: A list of dictionaries containing information about each talent.
    """
    url = f"{BASE_URL}{keywords}"

    response = requests.get(url, headers=HEADERS)
    assert (
        response.status_code == 200
    ), f"Error: Failed to retrieve data (Status code: {response.status_code})"

    soup = BeautifulSoup(response.text, "html.parser")

    articles = extract_articles(soup)

    talents = []
    for article in articles:
        rate_per_hour = extract_rate_per_hour(article)

        if rate_per_hour:
            talents.append(
                {
                    "rate_per_hour": rate_per_hour,
                }
            )

    return talents


def extract_articles(soup):
    """
    Extract all article elements from the soup.

    Args:
        soup (BeautifulSoup): The parsed HTML page.

    Returns:
        list: A list of article elements.
    """
    return soup.find_all("article", class_="card-list-container profiles-list")


def extract_rate_per_hour(article):
    """
    Extract the 'rate-per-hour' value from the provided article.

    Args:
        article (Tag): A BeautifulSoup Tag object representing an individual article.

    Returns:
        str: The rate per hour or None if not found.
    """
    section = article.find("section", class_="flex-1 section")

    rate_div = (
        section.find("div", {"data-test": "FreelancerTileDetails"}) if section else None
    )

    if rate_div:
        tile_rate = rate_div.find(
            "div", {"data-test": "freelancer-tile-rate FreelancerTileRate"}
        )
        rate_per_hour_element = tile_rate.find(
            "span", {"data-test": "rate-per-hour"}
        ) or rate_div.find("strong")
        if rate_per_hour_element:
            return rate_per_hour_element.get_text(strip=True)

    return None


def main():
    keywords = "web developer"

    talents = fetch_talents(keywords)

    for talent in talents:
        print(
            f"Name: {talent['name']}, Title: {talent['title']}, Rate per hour: {talent['rate_per_hour']}"
        )


if __name__ == "__main__":
    main()
