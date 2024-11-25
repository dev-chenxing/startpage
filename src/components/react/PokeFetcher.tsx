import { motion } from "motion/react";
import pokemons from "../../content/pokemons/pokemon.json";

function choice(arr: Array<string>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function InfoFetcher() {
  const pokemon = choice(pokemons);
  const infoList = [
    { name: "Trainer", value: "陈刑" },
    { name: "Pokémon", value: pokemon.toUpperCase() },
    { name: "Abilities", value: "56% vim, 16% lua, 6% h" }
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
    <motion.div className="border text-white flex p-2 w-max my-4" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} layout>
      <img src={`/pokemons/${pokemon}.png`} alt={pokemon} className="h-24" style={{ imageRendering: "pixelated" }} />
      <div className="ml-2 m-4">
        {infoList.map((info, index) => {
          return (
            <p key={index}>
              <span className="text-blue">{info.name}: </span>
              {info.value}
            </p>
          );
        })}
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
