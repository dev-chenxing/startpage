let plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        colors: {
            black: "#000000",
            red: "#E64A29",
            green: "#5AC55A",
            yellow: "#FFCE29",
            blue: "#5AADFF",
            magenta: "#C583CD",
            cyan: "#63C5C5",
            white: "#fdfdfd",
            grey: "#C5C5C5",
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
