import type { Config } from "tailwindcss";
import colors from "./colors";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gradient1: colors.gradient1,
        gradient2: colors.gradient2,
        background0: colors.background0,
        background: colors.background,
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
        brightened: colors.brightened,
        button_and_input: colors.button_and_input,
        player: colors.player,
        modal: colors.modal,
        slider: colors.slider,
        
      },
    },
  },
  plugins: [],
};
export default config;
