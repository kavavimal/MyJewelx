/* @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        xxs: "0px 2px 5px 0px #0000000D",
        "3xl": "0px 0px 20px 1px #0000000D",
        "4xl": "0px 4px 4px 0px #00000040",
      },

      maxWidth: {
        "screen-xl": "1280px", // Default value
      },

      colors: {
        primary: {
          // 50: "#078dee14",
          // 100: "#078dee29",
          50: "#F0AE1114",
          100: "#F0AE1129",
          200: "#F0AE11",
          250: "#FFFCF5",
          300: "#FFF8E7",
          // 200: "#078dee",
        },
        blueGray: {
          50: "#919eab1f",
          100: "#919eab14",
          200: "#637381",
          300: "#CBCBCB",
          400: "#EFEFEF",
          500: "#1A1A1A",
          600: "#999999",
          700: "#343434",
          800: "#F9F2E1",
        },
        secondary: {
          50: "#808080",
          100: "#676767",
          200: "#4D4D4D",
          400: "#DFDFDF",
        },
        red: {
          100: "#D4180E",
          300: "#B23448",
        },
        dark: {
          50: "#010101",
          100: "#000B18",
          200: "#CFD8DC",
        },
        gold: {
          50: "#D0B68B",
        },
      },
      fontFamily: {
        emirates: ["emirates"],
        playfairdisplay: ["playfairdisplay"],
      },
      fontSize: {
        "3xl": "28px",
      },
    },
  },
  plugins: [],
});
