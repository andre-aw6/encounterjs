import { SET_NOTIFICATION, SHOW_NOTIFICATION } from "../actions/notification";

export default function notification(state = {}, action) {

    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                notificationText: action.notificationText,
                notificationAction: action.notificationAction,
                notificationKey: action.notificationKey,
                type: action.notificationType,
            }
        case SHOW_NOTIFICATION:
            return {
                ...state,
                show: action.show
            }

        default:
            return state
    }
}