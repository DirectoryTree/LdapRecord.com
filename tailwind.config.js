const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      'source/**/*.html',
      'source/**/*.md',
      'source/**/*.js',
      'source/**/*.php',
      'source/**/*.vue',
    ],
    options: {
      whitelist: [
        /language/,
        /hljs/,
        /algolia/,
      ],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          ...defaultTheme.fontFamily.sans
        ],
        mono: [
          'Roboto',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      colors: {
        purple: {
          ...defaultTheme.colors.purple,
          '900': '#150050'
        }
      },
      lineHeight: {
        normal: '1.6',
        loose: '1.75',
      },
      maxWidth: {
        none: 'none',
        '7xl': '80rem',
        '8xl': '90rem'
      },
      spacing: {
        '7': '1.75rem',
        '9': '2.25rem'
      },
      boxShadow: {
        'lg': '0 -1px 27px 0 rgba(0, 0, 0, 0.04), 0 4px 15px 0 rgba(0, 0, 0, 0.08)',
      }
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2.125rem',
      '5xl': '2.625rem',
      '6xl': '3rem',
    },
  },
  variants: {
    borderRadius: ['responsive', 'focus'],
    borderWidth: ['responsive', 'active', 'focus'],
    width: ['responsive', 'focus']
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.transition-fast': {
          transition: 'all .2s ease-out',
        },
        '.transition': {
          transition: 'all .5s ease-out',
        },
      }
      addUtilities(newUtilities)
    }
  ]
}