import json

pokemons = {}

with open('dex.json', 'r', encoding="utf-8") as file:
    dex = json.load(file)
    for pokemon in dex:
        name = pokemon["slug"]["eng"]
        data = {
            "idx": pokemon["idx"],
            "name": pokemon["name"]["eng"]
        }
        for icon in pokemon["icons"]:
            if icon == "_":
                pokemons[name] = data
            elif "is_alias_of" in pokemon["icons"][icon]:
                pass
            else:
                pokemons[f"{name}-{icon}"] = data


# print(pokemons)
json.dump(pokemons, open('pokemon.json', 'w',
          encoding="utf-8"), ensure_ascii=False)
