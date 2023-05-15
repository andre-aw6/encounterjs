import { SET_QUICK_SEARCHS, REMOVE_QUICK_SEARCHS } from "../actions/quickSearch";

export default function quickSearch(state = {}, action){
    switch(action.type){
        case REMOVE_QUICK_SEARCHS:
            return {
                ...(
                    Object.keys(state)
                    .filter(key => key != action.key)
                    .map(key => ({
                        [key]: state[key]
                    }))
                    .reduce((a,b) => ({
                        ...a,
                        ...b
                    }), {})
                )
                
            }
        case SET_QUICK_SEARCHS:
            return {
                ...state,
                ...(
                    action.quickSearchs
                    .map(quick => ({
                        [quick.key]: quick
                    }))
                    .reduce((a,b) => ({
                        ...a,
                        ...b
                    }), {})
                )
            }
        default:
            return state
    }
}