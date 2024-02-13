/** @type {import('tailwindcss').Config} */
import { COLORS } from './src/constants/colors'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}',
    './src/**/**/**/*.{js,ts,jsx,tsx}',
  ],
  // content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
      },
    },
  },
  plugins: [],
}
