/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue-05': '#6148FF',
        'dark-blue-04': '#6148FF57',
        'dark-blue-03': '#489CFF',
        'dark-blue-02': '#D0B7E6',
        'dark-blue-02': '#E2D4F0 ',
        'light-blue-05': '#EBF3FC',
        'lime-green-05': '#AA9B87',
        'lime-green-04': '#D4C2A8',
        'lime-green-03': '#FFE9CA',
        'lime-green-02': '#FFF0DC',
        'lime-green-01': '#FFF8ED',
        'alert-red': '#FF0000',
        'alert-yellow': '#F9CC00',
        'alert-green': '#73CA5C',
        'neutral-05': '#151515',
        'neutral-04': '#3C3C3C',
        'neutral-03': '#8A8A8A',
        'neutral-02': '#D0D0D0',
        'neutral-01': '#FFFFFF',
        'gray-05': '#4E5566',
        'gray-04': '#202244',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
