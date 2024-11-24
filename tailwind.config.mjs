let plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            black: "#000000",
            red: "#FF3E00",
            green: "#00F58F",
            yellow: "#FFC65C",
            blue: "#008BD7",
            magenta: "#DA70D6",
            cyan: "#58C4DC",
            white: "#fdfdfd",
            grey: "#a5a5a5",
        },
        extend: {
            typography: ({ theme }) => ({
                grey: {
                    css: {
                        "--tw-prose-body": theme("colors.white"),
                        "--tw-prose-headings": theme("colors.white"),
                        "--tw-prose-links": theme("colors.white"),
                        "--tw-prose-pre-code": theme("colors.white"),
                        "--tw-prose-pre-bg": theme("colors.black"),
                    },
                },
            }),
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("!first", "&:not(:first-child)");
        }),
        require("@tailwindcss/typography"),
    ],
};
