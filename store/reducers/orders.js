import { ORDERS_SET_ORDERS, ORDERS_SET_ORDER_SELECTED } from '../actions/orders'

export default function orders(state = {}, action){
    switch (action.type) {
        case ORDERS_SET_ORDERS:
            return {
                ...state,
                orders: {
                    ...state.orders,
                    ...action.orders
                }
            }
        case ORDERS_SET_ORDER_SELECTED:
            return {
                ...state,
                order_selected: action.key
            }
        default:
            return state
    }
}