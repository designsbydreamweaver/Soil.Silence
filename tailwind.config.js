module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        creepy: ['Creepster', 'cursive'],
        journal: ['"Special Elite"', 'serif'],
      },
      animation: {
        flicker: 'flicker 3s infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '10%': { opacity: '0.8' },
          '20%': { opacity: '0.9' },
          '30%': { opacity: '0.85' },
          '40%': { opacity: '1' },
          '50%': { opacity: '0.7' },
          '60%': { opacity: '0.9' },
          '70%': { opacity: '1' },
          '80%': { opacity: '0.85' },
          '90%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
