import { CLOSE_INFO_MODAL, OPEN_INFO_MODAL, CLOSE_POPUP_MODAL, OPEN_POPUP_MODAL, OPEN_CART } from "../actions/info";

export default function info(state = {}, action ){
    
    switch (action.type) {
        case OPEN_CART:
            return {
                ...state,
                showCart: action.show
            }
        case OPEN_INFO_MODAL:
            return {
                ...state,
                infoModal : {
                    open: true,
                    content: action.content,
                    title: action.title,
                }
            }
        case CLOSE_INFO_MODAL:
            return {
                ...state,
                infoModal : {
                    open: false,
                }
            }
        case OPEN_POPUP_MODAL:
            return {
                ...state,
                popup : {
                    open: true,
                    type: action.typeOfModal,
                    data: action.data
                }
            }
        case CLOSE_POPUP_MODAL:
            return {
                ...state,
                popup : {
                    ...state.popup,
                    type: state.popup.type,
                    open: false,
                }
            }
        default:
            return state
    }
}