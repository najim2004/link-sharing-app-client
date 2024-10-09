/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure these paths match your file structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6256CA",
        secondary: "#4d4d4d",
        danger: "#e74c3c",
      },
    },
  },
  plugins: [],
};
