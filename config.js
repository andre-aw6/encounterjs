export default {
  API_URI: "https://encounter-api-prd.herokuapp.com",
  // API_URI: 'https://d064651de7b9.ngrok.io',
  translation: "encounter",
  facebookAppId: "707085366783241",

  notLoggedImg: require("./assets/img/no-orders.png"),
  splash: require("./assets/splash-encounter.png"),

  showCompanyOnAvailable: false,
  notFoundSuggestion: false,
  experience: false,
  hideNumberOfPlayers: false,
  chooseTagsAndCategories: false,

  evaluation: true,
  favorites: true,
  rentTimeBox: true,
  myPreferences: true,
  cleanStorage: false,

  login: {
    facebook: true,
    google: true,
    password: true,

    googleSignIn: {
      android:
        "907241676885-5guesahdj42ou2p44lpk8slb7d6j0j7a.apps.googleusercontent.com",
      ios:
        "907241676885-mm3oh94rcke1a5nfm8ra4jtls0comm6a.apps.googleusercontent.com",
    },
  },

  theme: {
    colors: {
      primaryColor: "#c8e8e0",
      primaryDarkColor: "#0e9577",
      primaryLightColor: "#ebf7f4",

      secondColor: "#BCBEC0",
      secondDarkColor: "#6D6E71",
      secondLightColor: "#E6E7E8",

      complementColor: "#0d3c54",

      lightColor: "#FAFAFA",
      darkColor: "#414042",

      success: "#6FE382",
      warming: "#fda856",
      danger: "#E35959",
    },
    elements: {
      productDetailsImage: 0.5,
    },
  },
};