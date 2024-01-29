/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,tsx,jsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", 
    './components/**/*.{js,ts,jsx,tsx}'

  ],
  theme: {
    extend: {
      spacing: {
        '2/3': '66.666667%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
}

