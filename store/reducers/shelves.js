import { SET_SHELVES, SET_LOADING, SET_CURRENT_BANNER, SET_BANNERS } from "../actions/shelves"

export default function shelves(state = {}, action){

    switch (action.type) {
        
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            } 
        case SET_SHELVES:
            return {
                ...state,
                shelves: {
                    ...state.shelves,
                    ...action.shelves
                }
            }
        case SET_BANNERS:
            return {
                ...state,
                banners: {
                    items: action.banners
                }
            } 
            
        case SET_CURRENT_BANNER:
            return {
                ...state,
                banners: {
                    ...state.banners,
                    currentBanner: action.current
                }
            } 
        default:
            return state
    }
}