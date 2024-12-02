// tailwind.config.js
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // For Tailwind v2
  // For Tailwind v3 and above, use 'content' instead of 'purge'
  // content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: [
    flowbite.content()
  ], // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'bounce-in': 'bounce-in 0.8s ease-out',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'bounce-in': {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};
