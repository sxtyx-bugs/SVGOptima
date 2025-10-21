/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        neue: ['"Neue Haas Grotesk Display Pro"', 'ui-sans-serif', 'system-ui'],
        europa: ['"Europa Grotesk No 2 SH"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        glass: {
          5: 'rgba(255,255,255,0.05)',
          8: 'rgba(255,255,255,0.08)',
          10: 'rgba(255,255,255,0.10)',
          15: 'rgba(255,255,255,0.15)',
          20: 'rgba(255,255,255,0.20)'
        }
      },
      backdropBlur: {
        xs: '2px',
        xl: '24px'
      },
      boxShadow: {
        premium: '0 10px 60px rgba(0,0,0,0.35)'
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
};


