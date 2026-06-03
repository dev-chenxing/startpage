// @ts-check
import { defineConfig } from "astro/config";

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
});
