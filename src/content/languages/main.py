import yaml

colors = {}

with open('languages.yml', 'r') as file:
    languages = yaml.safe_load(file)
    for language in languages:
        if "color" in languages[language]:
            colors[language] = languages[language]["color"]


yaml.dump(colors, open('languages_color.yaml', 'w'))
