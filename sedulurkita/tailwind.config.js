import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-beige': '#FDFBF6', // Latar belakang utama
        'brand-brown': {
          light: '#EADDCB', // Tombol "Sign up" & "Jelajah"
          DEFAULT: '#8B5E3C', // Teks atau aksen (perkiraan)
        },
        'brand-text': '#4A4A4A', // Teks utama (perkiraan)
      },
    },
  },
  plugins: [],
};
export default config;