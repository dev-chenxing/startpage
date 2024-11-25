import json
import os
from pathlib import Path

pokemons = []

for entry in os.scandir("../../../public/pokemons"):
    pokemons.append(Path(entry.name).stem)


json.dump(pokemons, open("./pokemon.json", "w"))
