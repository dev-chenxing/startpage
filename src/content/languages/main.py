import yaml
import json

colors = {}

with open('languages.yml', 'r') as file:
    languages = yaml.safe_load(file)
    for language in languages:
        if "color" in languages[language]:
            colors[language] = languages[language]["color"]


json.dump(colors, open('languages.json', 'w'))
