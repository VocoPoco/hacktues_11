module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)'
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)'
        },
        divider: 'var(--divider)'
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}