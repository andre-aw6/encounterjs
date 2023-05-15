import { Vibration } from "react-native"

export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const SHOW_NOTIFICATION = "SHOW_NOTIFICATION"

function setNotification(notificationText, notificationType, notificationAction, notificationKey) {
    return {
        type: SET_NOTIFICATION,
        notificationType,
        notificationText,
        notificationAction,
        notificationKey,
    }
}

function showNotification(show) {
    return {
        type: SHOW_NOTIFICATION,
        show
    }
}

let showing = false
export function handleShowNotification(notification, type = 'success', time = 3000) {
    return async dispatch => {
        const notificationText = notification.text ? notification.text : notification;
        if(showing) {
            clearInterval(showing)

            dispatch(showNotification(false))
            await new Promise(r => setTimeout(r,300))
        };

        dispatch(setNotification(notificationText, type, notification.action, notification.key))
        
        dispatch(showNotification(true))
        showing = setTimeout(() => {
            showing = undefined
            dispatch(showNotification(false))
        }, time)
    }
}


export function handleHideNotification() {
    return dispatch => {
        dispatch(showNotification(false))

    }
}