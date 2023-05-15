import { paymentMethods, createPaymentMethod, removePaymentMethod } from "../../graphql";
import { validateCPF } from "../../utils/helpers";
import { handleShowNotification } from "./notification";
import { handleSelectPaymentMethod } from "./cart";
import { openPopupModal } from "./info";
import { Alert } from "react-native";

// PAYMENT METHODS
export const SET_PAYMENT_LOADING = "SET_PAYMENT_LOADING"
export const SET_PAYMENT_METHODS = "SET_USER_PAYMENT_METHODS"
export const SET_CURRENT_PAYMENT_METHODS = "SET_CURRENT_PAYMENT_METHODS"
export const SET_REMOVE_PAYMENT_METHODS = "SET_REMOVE_PAYMENT_METHODS"
export const SET_ADD_PAYMENT_METHODS = "SET_REMOVE_PAYMENT"
export const SET_CHOSE_PAYMENT_METHODS_MODE = "SET_CHOSE_PAYMENT_METHODS_MODE"

function setUserPaymentMethods(paymentMethods) {
    return {
        type: SET_PAYMENT_METHODS,
        paymentMethods
    }
}

function setCurrentPaymentMethods(key){
    return {
        type: SET_CURRENT_PAYMENT_METHODS,
        key
    }
}

export function setChosePaymentMethodsMode(choseMode){
    return {
        type: SET_CHOSE_PAYMENT_METHODS_MODE,
        choseMode
    }
}

function setLoading(loading){
    return {
        type: SET_PAYMENT_LOADING,
        loading
    }
}
function addPaymentMethods(paymentMethod){
    return {
        type: SET_ADD_PAYMENT_METHODS,
        paymentMethod
    }
}
function removePaymentMethods(key){
    return {
        type: SET_REMOVE_PAYMENT_METHODS,
        key
    }
}

export function handleLoadPaymentMethods() {
    return async (dispatch, getState) => {

        const { user } = getState();
        const { isLogged = false } = user;
        if (!isLogged) return

        const paymentMethods_ = await paymentMethods();
        dispatch(setUserPaymentMethods(paymentMethods_))
    }
}

export function handleCreateOrEditPayment(
    card_number,
    card_expiration_date,
    card_holder_name,
    card_cvv,
    card_document
){
    return async (dispatch, getState) => {

        const { payments } = getState();

        if(card_document.length == 14 && !validateCPF(card_document)){
            dispatch(handleShowNotification('CPF inválido', 'danger'));
            return
        }

        dispatch(setLoading(true));

        const result = await createPaymentMethod(card_number, card_expiration_date, card_holder_name, card_cvv, card_document)
        
        
        dispatch(setLoading(false));
        
        if(result.success){
            dispatch(handleLoadPaymentMethods())

            if(payments.choseMode){
                dispatch(handleSelectPaymentMethod(result.paymentMethod.key))
            }
        } else {
            if(result.message)
                 dispatch(handleShowNotification(result.message, 'danger'));

        }
            


            
        return !!result.success
    }
}

export function handleSetCurrentPayment(key){
    return dispatch => {
        dispatch(setCurrentPaymentMethods(key))
    }
}
export function handleRemoveCurrentPaymentConfirmModal(){
    return async dispatch => {
        return await new Promise(resolve => {
            dispatch(openPopupModal('CONFIRM_MODAL', {  
                callBack : (r) => {
                    if(r) dispatch(handleRemoveCurrentPayment())
                    resolve(r)
                },
                title: 'Exluir método de pagamento',
                description: 'Você tem certeza que deseja excluir?'
             }))
        })
       
    }
}
export function handleRemoveCurrentPayment(){
    return async (dispatch, getState) => {
        const { payments } = getState();
        const { currentPaymentKey, paymentMethods } = payments
        
        const paymentMethod = paymentMethods.find(p => p.key == currentPaymentKey)
        
        try {
            dispatch(setCurrentPaymentMethods(undefined))
            dispatch(removePaymentMethods(currentPaymentKey))

            const result = await removePaymentMethod(currentPaymentKey)

            if(!result.success) throw new Error('')
            
            dispatch(handleShowNotification('Método de pagamento excluído'))
            
        } catch (error) {
            dispatch(handleShowNotification('Erro ao excluir método de pagamento', 'danger'))
            dispatch(setCurrentPaymentMethods(currentPaymentKey))
            dispatch(addPaymentMethods(paymentMethod))
            
        }
    }
}