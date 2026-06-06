// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://dev-chenxing.github.io/startpage",
    base: "/startpage",
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [react(), mdx(), svelte()],
    fonts: [
        {
            provider: fontProviders.local(),
            name: "JetBrains Mono",
            cssVariable: "--font-jetbrains-mono",
            optimizedFallbacks: false,
            options: {
                variants: [
                    {
                        src: ["./src/assets/fonts/JetBrainsMono-Regular.woff2"],
                        weight: "normal",
                        style: "normal",
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: "Noto Sans CJK",
            cssVariable: "--font-noto-sans-cjk",
            optimizedFallbacks: false,
            options: {
                variants: [
                    {
                        src: ["./src/assets/fonts/NotoSansCJK-wght-400-900.ttf.woff2"],
                        weight: "normal",
                        style: "normal",
                    },
                ],
            },
        },
        {
            provider: fontProviders.local(),
            name: "Symbols Nerd Font Mono",
            cssVariable: "--font-symbols-nerd-font",
            optimizedFallbacks: false,
            options: {
                variants: [
                    {
                        src: ["./src/assets/fonts/SymbolsNerdFontMono-Regular.ttf"],
                        weight: "normal",
                        style: "normal",
                    },
                ],
            },
        },
    ],
});
