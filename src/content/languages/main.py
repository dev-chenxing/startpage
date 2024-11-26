import json
import colorsys


def hex_to_rgb(hex):
    rgb = []
    for i in (0, 2, 4):
        decimal = int(hex[i:i+2], 16)
        rgb.append(decimal)

    return tuple(rgb)


known_languages = ["Lua", "Python", "JavaScript", "TypeScript", "CSS", "QML", "HTML", "SCSS",
                   "Ruby", "Astro", "Shell", "Pug", "PHP", "TeX", "MDX", "Less", "C", "Batchfile", "Jinja"]

rainbow = {}

with open('languages.json', 'r') as file:
    languages: dict[str, str] = json.load(file)
    for language in languages:
        if language in known_languages:
            hex = languages[language]
            [r, g, b] = hex_to_rgb(hex.replace("#", ""))
            [h, s, v] = colorsys.rgb_to_hsv(r/255, g/255, b/255)
            rainbow[language] = [round(h*360), round(s*100), round(v*100)]

rainbow = dict(sorted(rainbow.items(), key=lambda item: item[1][0]))

json.dump(rainbow, open('rainbow.json', 'w'))
