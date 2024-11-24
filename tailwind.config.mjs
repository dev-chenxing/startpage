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
        extend: {
            typography: ({ theme }) => ({
                grey: {
                    css: {
                        "--tw-prose-body": theme("colors.secondary"),
                        "--tw-prose-headings": theme("colors.secondary"),
                        "--tw-prose-links": theme("colors.secondary"),
                        // "--tw-prose-bold": theme("colors.dracula-purple.DEFAULT"),
                        // "--tw-prose-counters": theme("colors.dracula-pink.DEFAULT"),
                        // "--tw-prose-bullets": theme("colors.dracula-pink.DEFAULT"),
                        // "--tw-prose-hr": theme("colors.dracula-pink.DEFAULT"),
                        // "--tw-prose-quotes": theme("colors.dracula-light.DEFAULT"),
                        // "--tw-prose-quote-borders": theme("colors.dracula-pink.DEFAULT"),
                        // "--tw-prose-captions": theme("colors.dracula-pink.DEFAULT"),
                        // "--tw-prose-code": theme("colors.dracula-purple.DEFAULT"),
                        // "--tw-prose-th-borders": theme("colors.dracula-dark.DEFAULT"),
                        // "--tw-prose-td-borders": theme("colors.dracula-dark.DEFAULT"),
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
