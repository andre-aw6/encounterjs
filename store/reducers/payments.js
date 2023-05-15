import { SET_PAYMENT_METHODS, SET_PAYMENT_LOADING, SET_CURRENT_PAYMENT_METHODS, SET_ADD_PAYMENT_METHODS, SET_REMOVE_PAYMENT_METHODS, SET_CHOSE_PAYMENT_METHODS_MODE } from "../actions/payments";

export default function payments(state = {}, action) {
    switch (action.type) {
        case SET_PAYMENT_METHODS:
            return {
                ...state,
                paymentMethods: action.paymentMethods
            }
            
        case SET_PAYMENT_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_CURRENT_PAYMENT_METHODS:
            return {
                ...state, 
                currentPaymentKey: action.key
            }
        case SET_ADD_PAYMENT_METHODS:
            return {
                ...state, 
                paymentMethods: [...state.paymentMethods, action.paymentMethod]
            }
        case SET_REMOVE_PAYMENT_METHODS:
            return {
                ...state, 
                paymentMethods: state.paymentMethods.filter(f => f.key !== action.key)
            }
        case SET_CHOSE_PAYMENT_METHODS_MODE:
            return {
                ...state,
                choseMode: action.choseMode
            }
        default:
            return state;
    }
}