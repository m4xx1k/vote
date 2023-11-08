/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
     colors:{
       blue:'#2149A2',
       lightgray:'#f5f5f5',
       gray:'#86868B',
       green:'#00B05C'
     }
    },
  },
  plugins: [],
}
