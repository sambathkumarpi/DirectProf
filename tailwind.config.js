/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./pages/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    backgroundColor: {
      'black': '#000',
      'white': '#fff',
    },
  },
};
export const plugins = [];

