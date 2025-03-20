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
        # Wait for the unordered list to load (adjust selector if needed)
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


def parse_freelancer_li(li):
    """
    Parses a freelancer <li> element to extract freelancer details.

    The function traverses the following structure:

      li
       └── div.record.record--avatarCheck.findGuruRecord
            └── div.record__details
                 └── div.record__header
                      └── div.record__header__identity
       └── div.module_avatar.freelancerAvatar

    It then extracts:
      - city
      - province
      - country
      - earningsalltime
      - profileurl
      - screename
      - earnings

    Args:
        li (Tag): A BeautifulSoup Tag object representing an <li> element.

    Returns:
        dict: A dictionary with the extracted freelancer details, or None if parsing fails.
    """
    record_div = li.find("div", class_="record record--avatarCheck findGuruRecord")
    if not record_div:
        print("record_div not found")
        return None

    details_div = record_div.find("div", class_="record__details")
    if not details_div:
        return None

    header_div = details_div.find("div", class_="record__header")
    if not header_div:
        return None

    identity_div = header_div.find("div", class_="record__header__identity")
    if not identity_div:
        return None

    avatar_div = li.find("div", class_="module_avatar freelancerAvatar")
    if not avatar_div:
        return None

    avatar_img_tag = avatar_div.find("div", class_="avatar").find("a").find("img")
    avatar_img_url = avatar_img_tag.get("src", "").strip() if avatar_img_tag else ""

    # Extract freelancer's screen name from the 'avatarinfo' div
    avatar_info_div = avatar_div.find("div", class_="avatarinfo")
    screen_name_tag = (
        avatar_info_div.find("h3", class_="freelancerAvatar__screenName").find("a")
        if avatar_info_div
        else None
    )

    screen_name = screen_name_tag.get_text(strip=True) if screen_name_tag else ""

    # # Extracting data from the avatar_div and identity_div
    # city = avatar_div.get("data-city", "").strip()
    # province = avatar_div.get("data-province", "").strip()
    # country = avatar_div.get("data-country", "").strip()

    # earningsalltime_elem = avatar_div.find("span", class_="earningsalltime")
    # earningsalltime = (
    #     earningsalltime_elem.get_text(strip=True) if earningsalltime_elem else ""
    # )

    # profileurl_elem = avatar_div.find("a", class_="profileurl")
    # profileurl = profileurl_elem.get("href", "").strip() if profileurl_elem else ""

    # screename_elem = avatar_div.find("span", class_="screename")
    # screename = screename_elem.get_text(strip=True) if screename_elem else ""

    # earnings_elem = avatar_div.find("span", class_="earnings")
    # earnings = earnings_elem.get_text(strip=True) if earnings_elem else ""

    return {
        "avatar_img_url": avatar_img_url,
        "screen_name": screen_name,
        # "city": city,
        # "province": province,
        # "country": country,
        # "earningsalltime": earningsalltime,
        # "profileurl": profileurl,
        # "screename": screename,
        # "earnings": earnings,
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
    skills = ["Web Development"]
    freelancers = extract_freelancers(skills)
    for freelancer in freelancers:
        print(freelancer)


if __name__ == "__main__":
    main()
