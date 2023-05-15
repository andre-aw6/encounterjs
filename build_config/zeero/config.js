export default {
    API_URI: 'https://zeero-api.herokuapp.com',
    // API_URI: 'https://d064651de7b9.ngrok.io',
    translation: 'zeero',

    notLoggedImg : require('./assets/img/no-orders-2.png'),
    splash : require('./assets/splash.png'),

    facebookAppId: '252890679384327',
    showCompanyOnAvailable: true,
    notFoundSuggestion: true,
    experience: true,
    hideNumberOfPlayers: true,
    chooseTagsAndCategories: true,
    
    evaluation: false,
    favorites: false,
    rentTimeBox: false,
    myPreferences: false,
    cleanStorage: false,

    login: {
        facebook: true,
        google: true,
        password: false,

        googleSignIn: {
            android: "907241676885-5guesahdj42ou2p44lpk8slb7d6j0j7a.apps.googleusercontent.com",
            ios: "907241676885-mm3oh94rcke1a5nfm8ra4jtls0comm6a.apps.googleusercontent.com"
        },

    },

    theme: {
        colors: {
            primaryColor: '#CED4EB',
            primaryDarkColor: '#496DFB',
            primaryLightColor: '#EDEFF7',

            secondColor: '#BCBEC0',
            secondDarkColor: '#6D6E71',
            secondLightColor: '#E6E7E8',

            complementColor: '#081C4F',

            lightColor: '#FAFAFA',
            darkColor: '#414042',

            success: '#6FE382',
            warming: '#E39059',
            danger: '#E35959',
        },
        elements:{
            productDetailsImage: .5,
          },
    },
  
}