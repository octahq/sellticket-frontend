import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
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
					1000: '#475520'
				},
				secondary: {//renamed from Grey in the design
					100: '#ABABAB',
					200: '#A1A1A1',
					300: '#929292',
					400: '#8D9091',
					500: '#6B6A6A',
					600: '#5B5B5B',
					700: '#292D32',
					800: '#0D0D0D',
				},
				neutral: {//renamed from BG in the design
					100: '#FAFAFA',
					200: '#F5F5F5F5',
					300: '#E6E6E6'
				},
				danger: {
					100: '#FCEFEF',
					500: '#C5292A'
				},
				warning: {
					500: '#FFAC00'
				},
				lines: {
					100: '#EFEFEF'
				},
				stroke: {
					100: '#F1F1F1',
					200: '#E8EAEA',
					300: '#ECECEC',
					400: '#A0A0A0',
					500: '#9C9C9C'
				}
  		},
			backgroundImage: {
				'primary-gradient': 'linear-gradient(360deg, #D4FF5F 8.93%, #E2FF94 100%)', 
				'secondary-gradient': 'linear-gradient(360deg, #292D32 8.93%, #56606B 100%)',
				'auth-icon-wrapper-bg': 'linear-gradient(132.46deg, #292D32 0%, #8D9091 100%)',
				'auth-icon-wrapper-border': 'linear-gradient(132.46deg, #8D9091 0%, #292D32 100%)'
			},
			boxShadow: {
				'auth-card-shadow': '0px 3.53px 15.87px -3.53px #6A803040'
			},
  	}
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
