import { APP_SET_CONFIGURATION, APP_SET_TERMS, APP_SET_NEED_UPDATE_VERSION } from "../actions/app";

export default function app(state = {}, action){
    switch (action.type ) {
        case APP_SET_TERMS:
            return {
                ...state,
                terms: {
                    ...state.terms,
                    ...action.terms
                }
            }
    
        case APP_SET_CONFIGURATION:
            return {
                ...state,
                about: {
                    ...state.about,
                    ...action.about
                }
            }
    
        case APP_SET_NEED_UPDATE_VERSION:
            return {
                ...state,
                update: {
                    ...state.update,
                    ...action.update
                }
            }
    
        default:
            return state
    }
}