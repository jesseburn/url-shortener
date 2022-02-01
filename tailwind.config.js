module.exports = {
  content: [
    'index.html'
  ],
  theme: {
    extend: {
      colors: {
        'primary1': '#2acfcf',
        'primary2': '#3b3054',
        'neutral1': '#35323e',
        'neutral2': '#232127',
      },
      spacing: {
        '1p': '1%',        
        '2p': '2%',
        '3p': '3%',
        '4p': '4%',
        '5p': '5%',
        '10p': '10%',
        '12p': '12%',
        '13p': '13%',
        '15p': '15%',
        '20p': '20%',
        '25p': '25%',
        '30p': '30%',
        '35p': '35%',
        '40p': '40%',
        '45p': '45%',
        '50p': '50%',
        '55p': '55%',
        '60p': '60%',
        '70p': '70%',
        '80p': '80%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
