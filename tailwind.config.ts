import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '516px',
      },
      colors: {
        primary: {
          base: '#D4FF5F',
          50: '#FDFFFA',
          100: '#F6FFDF',
          200: '#F1FFCA',
          300: '#E9FFAF',
          400: '#E2FF94',
          500: '#DBFF7A',
          600: '#B1D44F',
          700: '#8DAA3F',
          800: '#6A8030',
          900: '#475520',
          1000: '#475520',
        },
        secondary: {
          //renamed from Grey in the design
          100: '#ABABAB',
          200: '#A1A1A1',
          300: '#929292',
          400: '#8D9091',
          500: '#6B6A6A',
          600: '#5B5B5B',
          700: '#292D32',
          800: '#0D0D0D',
        },
        neutral: {
          //renamed from BG in the design
          100: '#FAFAFA',
          200: '#F5F5F5F5',
          300: '#E6E6E6',
          400: '#E1E1E180',
          500: '#F4F4F4',
        },
        danger: {
          100: '#FCEFEF',
          300: '#DE8787',
          500: '#C5292A',
        },
        success: {
          50: '#F6FDF4',
          100: '#F4FFF280',
          200: '#EAFAE7',
          300: '#87B180',
          400: '#5E9756',
          700: '#0E6301',
        },
        warning: {
          100: '#FFEFDC',
          200: '#F1D4B1',
          500: '#FFAC00',
          700: '#F28500'
        },
        lines: {
          100: '#EFEFEF',
          200: '#E5E5E5',
        },
        stroke: {
          100: '#F1F1F1',
          200: '#E8EAEA',
          300: '#ECECEC',
          400: '#A0A0A0',
          500: '#9C9C9C',
        },
      },
      backgroundImage: {
        'avatar-gradient-primary':
          'linear-gradient(270deg, rgba(221, 224, 228, 0.24) 0%, rgba(221, 224, 228, 0) 39.6%)',
        'primary-gradient':
          'linear-gradient(360deg, #D4FF5F 8.93%, #E2FF94 100%)',
        'secondary-gradient':
          'linear-gradient(360deg, #292D32 8.93%, #56606B 100%)',
        'auth-icon-wrapper-bg':
          'linear-gradient(132.46deg, #292D32 0%, #8D9091 100%)',
        'auth-icon-wrapper-border':
          'linear-gradient(132.46deg, #8D9091 0%, #292D32 100%)',
        'input-gradient-primary':
          'linear-gradient(180deg, #F1F1F1 0%, #C0C0C0 172.73%)',
        'input-gradient-secondary':
          'linear-gradient(180deg, rgba(241, 241, 241, 0.945098) 0%, #CCCCCC 100%)',
        'input-gradient-error':
          'linear-gradient(180deg, rgba(241, 241, 241, 0.945098) 0%, #C5292A 100%)',
        'input-gradient-transparent': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)'
      },
      boxShadow: {
        'auth-card-shadow': '0px 3.53px 15.87px -3.53px #6A803040',
        'primary-tab-shadow': '0px 0px 0px 1px #0000000D',
        'event-card-shadow': '0px 0px 6px 0px #5B5B5B33',
        'drop-down-shadow': '0px 4px 15px 0px #B6B6B640',
        'nav-bar-shadow': '0px 0px 4px 0px #0000000D',
        'event-image-frame-shadow': '0px 25px 25px 0px #00000008',
        'event-image-frame-hole': '0px 0px 4px 0px #00000040 inset',
        'input-shadow': '0px 1.5px 4.3px 0px #B4B4B440',
        'view-profile':'0px 1px 3px 0px #89898940',
      },
      gridTemplateColumns: {
        'responsive-grid': 'repeat(auto-fit, minmax(242px, 1fr))',
        'modal-shadow': '0px 3.53px 15.87px -3.53px #6A803040',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
