import { motion } from "motion/react";
import pokemons from "../../content/pokemons/pokemon.json";
import languagesColor from "../../content/languages/languages.json";
import rainbow from "../../content/languages/rainbow.json";
import { useEffect, useState } from "react";

type LanguagesData = Record<string, number>;

function getLanguageColor(lang: string) {
  return languagesColor[lang as keyof typeof languagesColor] || "#C5C5C5";
}
function choice(arr: Array<string>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PokeFetcher({ name, languages }: { name: string; languages: LanguagesData }) {
  const [pokemon, setPokemon] = useState("pikachu");
  useEffect(() => {
    setPokemon(choice(pokemons));
  }, []);
  const infoList = [
    { name: "󰮂 Trainer", value: name },
    { name: "󰐝 Pokémon", value: pokemon.toUpperCase() }
  ];

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
        {infoList.map((info, index) => {
          return (
            <p key={index}>
              <span className="text-blue">{info.name}: </span>
              {info.value}
            </p>
          );
        })}
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
        <div className="inline-block w-full h-[18px] m-1 p-0">
          {Object.keys(rainbow)
            .slice(0, 11)
            .map(lang => {
              const language_color = getLanguageColor(lang);
              return <div key={lang} className="h-full inline-block m-0 overflow-hidden" style={{ backgroundColor: language_color, width: `9%` }}>{lang}</div>;
            })}
        </div>
      </div>
    </motion.div>
  );
}
