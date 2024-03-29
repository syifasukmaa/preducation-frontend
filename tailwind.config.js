/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    fontFamily: {
      Montserrat: ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary-dark-blue': '#202244',
        'secondary-dark-blue': '#56598E',
        'orange-04': '#FFD8D1',
        'orange-05': '#EB5437',
        'orange-06': '#d1260c',
        'alert-red': '#DF0000',
        'alert-yellow': '#F9CC00',
        'alert-green': '#73CA5C',
        'light-green': '#167F71',
        'gray-05': '#4E5566',
        'neutral-01': '#FFFFFF',
        'neutral-03': '#8A8A8A',
        'neutral-02': '#FFF4F2',
        'dark-blue-05': '#6148FF',
        'dark-blue-04': '#6148FF57',
        'dark-blue-03': '#489CFF',
        'dark-blue-02': '#D0B7E6',
        'dark-blue-01': '#E2D4F0 ',
        'neutral-05': '#151515',
        'neutral-04': '#3C3C3C',
        'dark-grey': '#282828',
        'dark-grey-02': '#E2DFDF',
        'dark-grey-03': '#3B3A39',
        'dark-grey-04': '#1E1F20',
        'dark-grey-05': '#A8A6A5',
        'dark-backgroud': '#1B1A19',
        'dark-yellow': '#F4DAB0',
        'bintang-hidup': '#EBB12B',
        'bintang-mati': '#F9D4AB',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scroll-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
