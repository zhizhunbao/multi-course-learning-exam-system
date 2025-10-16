/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 亚岗昆学院品牌色彩
        algonquin: {
          red: "#E31E24",
          "dark-red": "#C41E3A",
          blue: "#003366",
          "light-blue": "#4A90E2",
          gray: "#6B7280",
          "light-gray": "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
