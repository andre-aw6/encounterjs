import { about as getAbout, updateVersion } from "../../graphql"
import storage from "../../utils/storage"
let pkg = require('../../app.json');


export const APP_SET_CONFIGURATION = "APP_SET_CONFIGURATION"
export const APP_SET_TERMS = "APP_SET_TERMS"
export const APP_SET_NEED_UPDATE_VERSION = "APP_SET_NEED_UPDATE_VERSION"


// const about = {
//     phone: '5511998454090',
//     instagram: 'encounter.bg',
//     name: 'Encounter',
//     nameAbout: ' a Encounter',
//     aboutText: 'Lorem ipsum nisi lorem luctus vitae vel per nam non, quisque suspendisse aenean vivamus inceptos sem mauris morbi, eleifend ornare nisl habitasse vulputate et facilisis habitasse. molestie vitae tellus sem phasellus mollis accumsan mauris lectus tincidunt porta, turpis aenean urna fringilla duis nullam tempus praesent lacus lobortis purus, luctus consectetur luctus quisque justo hendrerit fermentum nisl mauris. pellentesque posuere justo mauris vitae dui nisi sed sem faucibus nisi aenean vulputate ipsum.'
// }

// const terms = {
//     terms: 'https://www.linkedin.com/feed/',
//     policy: 'https://www.linkedin.com/feed/',
// }

function appSetConfiguration(about){
    return {
        type: APP_SET_CONFIGURATION,
        about
    }
}

function appSetTerms(terms){
    return {
        type: APP_SET_TERMS,
        terms
    }
}
function appSetNeedUpdate(update){
    return {
        type: APP_SET_NEED_UPDATE_VERSION,
        update
    }
}

export function handleLoadAppConfig(){
    return async dispatch => {
        const { about, help} = await getAbout()
        const { name, instagram, description, terms, politics } = about;
        

        //  var match = myStr;
        dispatch(appSetConfiguration(
            {
                 phone: '55' + help.match(/\d/g),
                 instagram,
                 name,
                 nameAbout: ' a ' + name,
                 aboutText: description
            }
        ))
        dispatch(appSetTerms({
                 terms,
                 policy: politics,
             }))
    }
}


export function handleLoadNeedUpdateApp(){
    return async dispatch => {
        const currentVersion = pkg.expo.version; 
        const update = await updateVersion(currentVersion)
        
        if(!update) return ;
        const updateSave = await storage.getItem("UPDATE_VERSION" + update.key)
       
        dispatch(appSetNeedUpdate({
            ...update,
            show: !updateSave
        }))
    }
}

export function handleCancelUpdate(){
    return async (dispatch, getState) => {

        const { app } = getState()
        const { update = {} } = app;
        
        await storage.setItem("UPDATE_VERSION" + update.key, { ok : true }) 
        dispatch(appSetNeedUpdate({
            show: false
        }))
    }
}