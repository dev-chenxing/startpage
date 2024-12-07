import { motion } from "motion/react";
import pokemons from "../lib/pokemon.json"
import languagesColor from "../lib/languages.json";
import { useEffect, useState } from "react";
import TypeIt from "typeit-react"

type LanguagesData = Record<string, number>;

function getLanguageColor(lang: string) {
  return languagesColor[lang as keyof typeof languagesColor] || "#C5C5C5";
}
function getPokemonIndex(pokemon: string) {
  return pokemons[pokemon as keyof typeof pokemons].idx
}
function getPokemonName(pokemon: string) {
  return pokemons[pokemon as keyof typeof pokemons].name
}
function choice(arr: Array<string>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PokeFetcher({ name, languages }: { name: string; languages: LanguagesData }) {
  const [pokemon, setPokemon] = useState("pikachu");
  useEffect(() => {
    setPokemon(choice(Object.keys(pokemons)));
  }, []);

  const socials = [
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-red" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-yellow" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-green" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-cyan" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-blue" },
    { text: "󰇮 ", href: "chenxing.io@outlook.com", color: "text-magenta" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-white" },
    { text: " ", href: "https://github.com/dev-chenxing", color: "text-grey" }
  ];
  return (
    <motion.div className="border-2 border text-white flex p-2 my-4" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} layout>
      <img src={`/pokemons/${pokemon}.png`} alt={pokemon} className="h-24" style={{ imageRendering: "pixelated" }} />
      <div className="ml-2 mr-8 my-2">
        <TypeIt options={{ breakLines: false }}><span className="text-blue">󰮂 Trainer: </span>{name}</TypeIt>
        <p>
          <span className="text-blue">󰐝 Pokémon: </span>
          <span className="text-black bg-white px-1 mr-2">No.{getPokemonIndex(pokemon)}</span>
          {getPokemonName(pokemon)}
        </p>
        <div className="grid grid-cols-[auto_1fr]">
          <span className="text-blue"> Abilities:</span>
          <div className="inline-block w-full h-[18px] m-1 p-0">
            {Object.keys(languages).map(lang => {
              const language_color = getLanguageColor(lang);
              return <div key={lang} className="h-full inline-block m-0" style={{ backgroundColor: language_color, width: `${languages[lang]}%` }}></div>;
            })}
          </div>
        </div>
        <p>
          {Object.keys(languages).map(lang => {
            const language_color = getLanguageColor(lang);
            return (
              <span key={lang} className="mx-1 inline-block">
                <span style={{ color: language_color }}> </span> {lang} ({languages[lang]}%)
              </span>
            );
          })}
        </p>
        <p className="flex gap-2 text-lg">
          {socials.map((social, index) => {
            return (
              <a key={index} href={social.href} className={"no-underline " + social.color}>
                {social.text}
              </a>
            );
          })}
        </p>
      </div>
    </motion.div>
  );
}
