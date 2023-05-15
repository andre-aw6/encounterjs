import {
    SET_CURRENT_LOCATION,
    SET_CURRENT_LOCATION_NOT_FOUND,
    SET_LOCATIONS_SEARCHS,
    SET_LOCATIONS_SEARCHS_NOT_FOUND, 
    EDIT_ADDRESS,
    SET_SEARCHS_LOCATIONS_TERM ,
    SET_LOCATIONS_SEARCHS_LOADING, 
    ADD_ADDRESS,
    SET_ADRESSES ,
    SET_CHOSE_ADDRESS_MODE,
    REMOVE_ADDRESS
} from '../actions/address'
import { arrayToObj } from '../../utils/helpers'

export default function address(state = {}, action) {
    
    switch (action.type) {
        case SET_ADRESSES:
            return {
                ...state,
                adresses: {
                    ...(state.adresses || {} ),
                    ...(action.adresses || {} )
                }
            }
        case ADD_ADDRESS:
            return {
                ...state,
                adresses: {
                    ...state.adresses,
                    [action.address.key] : {
                        ...action.address
                    }
                }
            }
        case EDIT_ADDRESS:
            return {
                ...state,
                adresses: {
                    ...state.adresses,
                    [action.address.key] : {
                        ...state.adresses[action.address.key],
                        ...action.address
                    }
                }
            }
        case REMOVE_ADDRESS:
            return {
                ...state,
                adresses: {
                    ...state.adresses,
                    [action.key] : {
                        ...state.adresses[action.key],
                        active: false
                    }
                }
            }
        case SET_SEARCHS_LOCATIONS_TERM:
            return {
                ...state,
                searchLocations: {
                    ...state.searchLocations,
                    term: action.searchLocationsTerm,

                }
            }
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.currentLocation
            }
        case SET_CURRENT_LOCATION_NOT_FOUND:
            return {
                ...state,
                currentLocation: {
                    notFound: true
                }
            }
        case SET_LOCATIONS_SEARCHS:
            return {
                ...state,
                searchLocations: {
                    ...state.searchLocations,
                    loading: false,
                    locations: action.locations,
                }
            }
        case SET_LOCATIONS_SEARCHS_LOADING:
            return {
                ...state,
                searchLocations: {
                    ...state.searchLocations,
                    loading: true,
                }
            }
        case SET_CHOSE_ADDRESS_MODE:
            return {
                ...state,
                choseAddressMode: action.choseAddressMode,
            }
        default:
            return state
    }
}