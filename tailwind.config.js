const defaultTheme = require("tailwindcss/defaultTheme");

const regex = new RegExp(/production/);
const production = process.argv.some((e) => regex.test(e));

// Config files
const settings = require("./webpack.settings.js");

const colors = {
    black: "var(--color-black)",
    primary: {
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        400: "var(--color-primary-400)",
        500: "var(--color-primary-500)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        900: "var(--color-primary-900)",
    },
    secondary: {
        100: "var(--color-secondary-100)",
        200: "var(--color-secondary-200)",
        300: "var(--color-secondary-300)",
        400: "var(--color-secondary-400)",
        500: "var(--color-secondary-500)",
        600: "var(--color-secondary-600)",
        700: "var(--color-secondary-700)",
        800: "var(--color-secondary-800)",
        900: "var(--color-secondary-900)",
    },
};

const fontSize = {
    xs: "var(--text-xs)",
    sm: "var(--text-sm)",
    base: "var(--text-base)",
    lg: "var(--text-lg)",
    xl: "var(--text-xl)",
    "2xl": "var(--text-2xl)",
    "3xl": "var(--text-3xl)",
    "4xl": "var(--text-4xl)",
    "5xl": "var(--text-5xl)",
    "6xl": "var(--text-6xl)",
};

const fontFamily = {
    sans: [
        "var(--font-family-primary)",
        ...defaultTheme.fontFamily.sans,
    ],
    headline: [
        "var(--font-family-secondary)",
        ...defaultTheme.fontFamily.sans,
    ],
};

module.exports = {
    target: "ie11",
    purge: {
        enabled: false, // To enable purge add variable 'production'
        content: settings.purgeCssConfig.paths,
    },
    theme: {
        extend: {
            colors,
            fontFamily,
            fontSize,
            truncate: {
                lines: {
                    1: "1",
                    2: "2",
                    3: "3",
                },
            },
            maxWidth: {
                "max-w-screen-xs": "300px",
                "max-w-screen-md": "760px",
                "max-w-screen-lg": "1140px",
            },
        },
        screens: {
            xs: "320px",
            sm: "660px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
    },
    plugins: [
        require("tailwindcss-truncate-multiline")(),
        require("tailwind-css-variables")({
            colors: "color",
            screens: "-screen",
            fontFamily: false,
            fontSize: false,
            fontWeight: false,
            lineHeight: false,
            letterSpacing: false,
            backgroundSize: false,
            borderWidth: false,
            borderRadius: false,
            width: false,
            height: false,
            minWidth: false,
            minHeight: false,
            maxWidth: false,
            maxHeight: false,
            padding: "spacing",
            margin: false,
            boxShadow: false,
            zIndex: false,
            opacity: false,
        }, {}),
    ],
};