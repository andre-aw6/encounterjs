import { SET_CUPONS } from "../actions/cupons";

export default function cupons(state = {}, action){

    switch(action.type){
        case SET_CUPONS:
            return {
                ...state,
                cupons: [
                    ...action.cupons
                ]
            }
        default:
            return state;
    }
}