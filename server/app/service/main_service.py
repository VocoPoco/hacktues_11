from app.utils.consts import CATEGORIES, LLAMA_PROMPT
import requests
from flask import jsonify

class MainService:
    def send_prompt(self, dataset):
        prompt = self.__construct_prompt(dataset)

        api_url = "http://127.0.0.1:11434/api/chat?model=llama3.2:latest"
        response = requests.post(api_url, json={"prompt": prompt})

        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                "error": "Failed to fetch response from API",
                "details": response.text
            }), 500

    @staticmethod
    def __construct_prompt(self, dataset):
        formatted_categories = self.__format_hierarchy(CATEGORIES)

        formatted_prompts = []

        if 'task' not in dataset or 'description' not in dataset:
            raise KeyError("Each dataset item must contain 'task', 'description' and 'time_period' keys.")

        formatted_prompt = LLAMA_PROMPT.replace("[task]",
                                                dataset["task"]).replace("[description]",
                                                                                dataset["description"]).replace("[categories]",
                                                                                                                formatted_categories).replace("[time_period]",
                                                                                                                                              dataset["time_period"])
        formatted_prompts.append(formatted_prompt)

        return formatted_prompts

    @staticmethod
    def __format_hierarchy(self, categories):
     lines = []
     for main_cat, sub_cats in categories.items():
        lines.append(f"- {main_cat}")
        for sub_cat, final_cats in sub_cats.items():
            lines.append(f" - {sub_cat}")
            for final_cat in final_cats:
                lines.append(f" - {final_cat}")
        return "\n".join(lines)