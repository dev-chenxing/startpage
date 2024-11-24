let plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            primary: "#000000",
            secondary: "#fdfdfd",
            accent: "#a5a5a5",
        },
        extend: {},
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("!first", "&:not(:first-child)");
        }),
    ],
};
