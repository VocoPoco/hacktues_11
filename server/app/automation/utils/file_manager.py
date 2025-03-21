import json


def save_json(
    data,
    outdir="freelancers.json",
):
    with open(outdir, "w") as json_file:
        json.dump(data, json_file, indent=4)


def extract_json(path):
    with open(path, "r") as file:
        output = json.load(file)
    return output
