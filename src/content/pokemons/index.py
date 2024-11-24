import json

pokemons = []

with open("pokemon.json", "r") as file:
    pokemon_json = json.load(file)
    for pokemon in pokemon_json:
        pokemons.append(pokemon["name"])


json.dump(pokemons, open("myfile.json", "w"))