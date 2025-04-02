/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "drop-gray": "#eceeee",
        "drop-silver": "#ced2d4",
        "drop-yellow": "#ffdf36",
        "drop-white": "#ffffff",
        "drop-black": "#000000",
        "drop-header-menu": "rgba(0, 0, 0, 0.9)",
      },
      spacing: {
        0.75: "0.1875rem",
        "drop-header-menu": "calc(100% - 15px)",
        "drop-header-menu-lists": "calc(100% / 12 * 6)",
      },
      zIndex: {
        "minus-10": "-10",
      },
    },
  },
  plugins: [],
};
