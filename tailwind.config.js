/** @type {import('tailwindcss').Config} */
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
        "3xl":
          "0 0 2px 0 rgba(145, 158, 171, 0.08), 0 12px 24px -4px rgba(145, 158, 171, 0.08)",
      },
      colors: {
        primary: {
          // 50: "#078dee14",
          // 100: "#078dee29",
          50: "#F0AE1114",
          100: "#F0AE1129",
          200: "#F0AE11",
          // 200: "#078dee",
        },
        blueGray: {
          50: "#919eab1f",
          100: "#919eab14",
          200: "#637381",
        },
        secondary: {
          200: "#4D4D4D",
        },
      },
      fontFamily: {
        emirates: ["emirates"],
      },
    },
  },
  plugins: [],
});
