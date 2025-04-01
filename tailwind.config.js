/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      transitionProperty: {
        'opacity': 'opacity'
      },
      fontFamily: {
        code: ['source-code-pro', 'Menlo', 'monospace']
      }
    }
  }
}
