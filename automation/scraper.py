import re
from bs4 import BeautifulSoup
from constants import BASE_URL, HEADERS  # HEADERS may not be used now with playwright


def concatenate_skills(skills):
    """
    Joins a list of skills into a single URL path. Each skill is converted to lowercase,
    spaces are replaced with dashes, and each skill is prefixed with 'skill/'.

    For example:
        ["Web Development", "Data  Science"]
        becomes "skill/web-development/skill/data-science".

    Args:
        skills (list): A list of skill strings.

    Returns:
        str: A URL-friendly string with each skill prefixed by 'skill/'.
    """

    def format_skill(skill):
        # Remove leading/trailing whitespace, make lowercase, replace spaces with dashes
        formatted = skill.strip().lower()
        formatted = re.sub(r"\s+", "-", formatted)
        return formatted

    return "/".join(f"skill/{format_skill(skill)}" for skill in skills)


def fetch_page_html(url):
    """
    Uses Playwright to launch a headless browser, navigate to the URL, wait for
    the JavaScript-rendered content, and then return the rendered HTML.

    Args:
        url (str): The URL to fetch.

    Returns:
        str: The fully rendered HTML content.
    """
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto(url)

        page.wait_for_selector("ul.module_list.cozy", timeout=10000)
        html = page.content()
        browser.close()
    return html


def get_unordered_list(soup):
    """
    Extracts the unordered list (ul) with the class 'module_list cozy' from the parsed HTML.

    Args:
        soup (BeautifulSoup): The parsed HTML soup.

    Returns:
        Tag: The <ul> element if found, else None.
    """
    return soup.find("ul", class_="module_list cozy")


def extract_avatar_img_url(avatar_div):
    """
    Extracts the avatar image URL from the 'avatar' div.

    Args:
        avatar_div (Tag): The BeautifulSoup Tag object representing the 'avatar' div.

    Returns:
        str: The URL of the freelancer's avatar image, or an empty string if not found.
    """
    avatar_img_tag = avatar_div.find("div", class_="avatar").find("a").find("img")
    return avatar_img_tag.get("src", "").strip() if avatar_img_tag else ""


def extract_screen_name(avatar_info_div):
    """
    Extracts the freelancer's screen name from the 'avatarinfo' div.

    Args:
        avatar_info_div (Tag): The BeautifulSoup Tag object representing the 'avatarinfo' div.

    Returns:
        str: The screen name of the freelancer, or an empty string if not found.
    """
    screen_name_tag = (
        avatar_info_div.find("h3", class_="freelancerAvatar__screenName").find("a")
        if avatar_info_div
        else None
    )
    return screen_name_tag.get_text(strip=True) if screen_name_tag else ""


def extract_location(meta_p_tags):
    """
    Extracts city, state, and country from the first p tag with the class 'freelancerAvatar__meta'.

    Args:
        meta_p_tags (list): A list of <p> elements with the class 'freelancerAvatar__meta'.

    Returns:
        tuple: A tuple containing city, state, and country, or empty strings if not found.
    """
    city, state, country = "", "", ""
    if len(meta_p_tags) > 0:
        city_state_country_span = meta_p_tags[0].find("span", title=True)
        if city_state_country_span:
            location = city_state_country_span.get("title", "").strip()
            city, state, country = (
                location.split(", ") if len(location.split(", ")) == 3 else ("", "", "")
            )
    return city, state, country


def extract_earnings_and_feedback(meta_p_tags):
    """
    Extracts earnings and feedback from the second p tag with the class 'freelancerAvatar__meta'.

    Args:
        meta_p_tags (list): A list of <p> elements with the class 'freelancerAvatar__meta'.

    Returns:
        tuple: A tuple containing earnings and feedback, or empty strings if not found.
    """
    earnings, feedback = "", ""
    if len(meta_p_tags) > 1:
        earnings_elem = meta_p_tags[1].find("span", class_="earnings__amount")
        earnings = earnings_elem.get_text(strip=True) if earnings_elem else ""

        feedback_elem = meta_p_tags[1].find("span", class_="freelancerAvatar__feedback")
        feedback = feedback_elem.get_text(strip=True) if feedback_elem else ""
    return earnings, feedback


def extract_additional_details(avatar_div):
    """
    Extracts additional details from the avatar div, such as earnings all-time and profile URL.

    Args:
        avatar_div (Tag): The BeautifulSoup Tag object representing the 'avatar' div.

    Returns:
        dict: A dictionary with 'earningsalltime' and 'profileurl'.
    """
    earningsalltime_elem = avatar_div.find("span", class_="earningsalltime")
    earningsalltime = (
        earningsalltime_elem.get_text(strip=True) if earningsalltime_elem else ""
    )

    profileurl_elem = avatar_div.find("a", class_="profileurl")
    profileurl = profileurl_elem.get("href", "").strip() if profileurl_elem else ""

    return {"earningsalltime": earningsalltime, "profileurl": profileurl}


def extract_service_title(service_listing_div):
    """
    Extracts the service title from the 'serviceListing__details' div.

    Args:
        service_listing_div (Tag): The BeautifulSoup Tag object representing the 'serviceListing__details' div.

    Returns:
        str: The service title, or an empty string if not found.
    """
    service_title_tag = service_listing_div.find(
        "h2", class_="serviceListing__title serviceListing__title--dark"
    )
    return service_title_tag.get_text(strip=True) if service_title_tag else ""


def extract_service_rates(service_listing_div):
    """
    Extracts the service rates from the 'serviceListing__rates' p tag.

    Args:
        service_listing_div (Tag): The BeautifulSoup Tag object representing the 'serviceListing__rates' p tag.

    Returns:
        str: The service rates, or an empty string if not found.
    """
    service_rates_tag = service_listing_div.find("p", class_="serviceListing__rates")
    return service_rates_tag.get_text(strip=True) if service_rates_tag else ""


def extract_service_description(service_listing_div):
    """
    Extracts the service description from the 'serviceListing__desc' p tag.

    Args:
        service_listing_div (Tag): The BeautifulSoup Tag object representing the 'serviceListing__desc' p tag.

    Returns:
        str: The service description, or an empty string if not found.
    """
    service_desc_tag = service_listing_div.find("p", class_="serviceListing__desc")
    return service_desc_tag.get_text(strip=True) if service_desc_tag else ""


def extract_skills_from_service_listing(service_listing_div):
    """
    Extracts all the skills from the 'skillsList__skill greyBackground' spans inside the 'serviceListing__skills' div.
    Includes the first skill and all subsequent skills from the 'a' tags in each span.

    Args:
        service_listing_div (Tag): The BeautifulSoup Tag object representing the 'skillsList serviceListing__skills' div.

    Returns:
        list: A list of skill names (strings).
    """
    skills_list = []

    # Find all span elements with the class 'skillsList__skill greyBackground'
    skills_span_tags = service_listing_div.find_all(
        "span", class_="skillsList__skill greyBackground"
    )

    # Extract the first skill (if available)
    if skills_span_tags:
        first_skill_span = skills_span_tags[0]
        skill_links = first_skill_span.find_all("a")
        skills_list.extend([link.get_text(strip=True) for link in skill_links])

    # Extract all skills from the remaining span elements (if any)
    for skill_span in skills_span_tags[1:]:  # Start from the second skill
        skill_links = skill_span.find_all("a")
        skills_list.extend([link.get_text(strip=True) for link in skill_links])

    all_a_tags = service_listing_div.find_all("a")
    for a_tag in all_a_tags:
        skills_list.append(a_tag.get_text(strip=True))

    # Remove duplicates by converting to a set and then back to a list
    skills_list = list(set(skills_list))

    return skills_list


def parse_freelancer_li(li):
    """
    Parses a freelancer <li> element to extract freelancer details.

    Args:
        li (Tag): A BeautifulSoup Tag object representing an <li> element.

    Returns:
        dict: A dictionary with the extracted freelancer details, or None if parsing fails.
    """
    # Find the div with class 'module_avatar freelancerAvatar'
    avatar_div = li.find("div", class_="module_avatar freelancerAvatar")
    if not avatar_div:
        print("avatar_div not found")
        return None

    # Extract avatar image URL
    avatar_img_url = extract_avatar_img_url(avatar_div)

    # Extract freelancer's screen name
    avatar_info_div = avatar_div.find("div", class_="avatarinfo")
    screen_name = extract_screen_name(avatar_info_div)

    # Extract city, state, and country
    meta_p_tags = avatar_info_div.find_all("p", class_="freelancerAvatar__meta")
    city, state, country = extract_location(meta_p_tags)

    # Extract earnings and feedback
    earnings, feedback = extract_earnings_and_feedback(meta_p_tags)

    # Extract additional details (earningsalltime and profileurl)
    additional_details = extract_additional_details(avatar_div)

    # Extract service listing details
    service_listing_div = li.find("div", class_="serviceListing__details")
    service_title = extract_service_title(service_listing_div)
    service_rates = extract_service_rates(service_listing_div)
    service_desc = extract_service_description(service_listing_div)

    # Extract skills from the second skill span in the skills list
    skills_list = extract_skills_from_service_listing(service_listing_div)

    return {
        "avatar_img_url": avatar_img_url,
        "screen_name": screen_name,
        "city": city,
        "state": state,
        "country": country,
        "earningsalltime": additional_details["earningsalltime"],
        "profileurl": additional_details["profileurl"],
        "earnings": earnings,
        "feedback": feedback,
        "service_title": service_title,
        "service_rates": service_rates,
        "service_desc": service_desc,
        "skills": skills_list,
    }


def extract_freelancers(skills):
    """
    Given a list of skills, builds the URL, fetches the page using Playwright,
    and extracts freelancer details from the rendered HTML.

    Args:
        skills (list): A list of skills.

    Returns:
        list: A list of dictionaries, each representing a freelancer's details.
    """
    # Build the URL by concatenating the skills
    skill_path = concatenate_skills(skills)
    url = f"{BASE_URL}/{skill_path}"

    # Fetch the rendered HTML of the page using Playwright
    page_html = fetch_page_html(url)
    soup = BeautifulSoup(page_html, "html.parser")

    # Get the unordered list that contains the freelancer records
    ul = get_unordered_list(soup)
    if not ul:
        raise ValueError("Unordered list with class 'module_list cozy' not found")

    freelancers = []
    li_elements = ul.find_all("li")
    print(f"Found {len(li_elements)} li elements.")
    for li in li_elements:
        freelancer_data = parse_freelancer_li(li)
        if freelancer_data:
            freelancers.append(freelancer_data)

    return freelancers


def main():
    # Example list of skills
    skills = ["Logo Design"]
    freelancers = extract_freelancers(skills)
    for freelancer in freelancers:
        print(freelancer)


if __name__ == "__main__":
    main()
