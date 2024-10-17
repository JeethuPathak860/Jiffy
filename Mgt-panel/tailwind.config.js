/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
      // Extend colors if needed
      colors: {
        'custom-gray': '#D1D5DB', // Example gray color
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '4px', // Make it 2px wide
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1', // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888', // Thumb color
            borderRadius: '2px', // Rounded corners
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555', // Thumb color on hover
          },
        },
      });
    },
  ],
};
