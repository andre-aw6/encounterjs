import Storage from "../../utils/storage"
import { openLoginPopup } from "./user"
import React from 'react'
import { H4, H3 } from "../../components/Typography"
import { API_URI } from "../../graphql/client"
import { handleLoadShelves } from "./shelves"
import { handleShowNotification } from "./notification"
import { customFilter } from "../../graphql"
export const SET_SELECT_FILTER_TOGGLE_ONBOARDING = 'SET_SELECT_FILTER_TOGGLE_ONBOARDING'
export const SET_SELECT_QUESTION_TOGGLE_ONBOARDING = 'SET_SELECT_QUESTION_TOGGLE_ONBOARDING'
export const RESTART_ONBOARDING = 'RESTART_ONBOARDING'
export const START_ONBOARDING = 'START_ONBOARDING'
export const OPEN_ONBOARD = 'OPEN_ONBOARD'
export const CLOSE_ONBOARD = 'CLOSE_ONBOARD'
export const SET_ONBOARDING_STEPS = 'SET_ONBOARDING_STEPS'
export const SET_FILTERS_ONBOARDING = 'SET_FILTERS_ONBOARDING'


export function setSelectFilterToggleOnboarding(filterType, value){
    return {
        type: SET_SELECT_FILTER_TOGGLE_ONBOARDING,
            filterType,
            value
    }
}

export function setSelectQuestionToggleOnboarding(questionType, value){
    return {
        type: SET_SELECT_QUESTION_TOGGLE_ONBOARDING,
        questionType,
            value
    }
}

function setFilters(filters){
    return {
        type: SET_FILTERS_ONBOARDING,
        filters
    }
}

function setOnboardingSteps(steps){
    return {
        type: SET_ONBOARDING_STEPS,
        steps
    }
}

export function startOnboarding(restart){
    return {
        type: START_ONBOARDING,
        restart
    }
}

export function restartOnboarding(restart){
    return {
        type: RESTART_ONBOARDING,
        restart
    }
}

function openOnboard(){
    return {
        type: OPEN_ONBOARD,
    }
}

export function closeOnboard(){
    return {
        type: CLOSE_ONBOARD,
    }
}

const storageName = 'ONBOARDING_6'

export function handleLoadOnboarding(){
    
    return async dispatch => {
        const onboardingFilters = await Storage.getItem(storageName)
        const steps = await customFilter("onboarding")
        dispatch(setOnboardingSteps(steps))
        dispatch(setFilters(onboardingFilters))
        if(!onboardingFilters) dispatch(openOnboard())
    }
}

export function handleReopenOnboarding(){
    return dispatch => {
        dispatch(openOnboard())
        dispatch(restartOnboarding(true))
    }
}
export function handleFinishOnboarding(){

    return async (dispatch, getState) => {
        const { onboarding } = getState();
        await Storage.setItem(storageName, onboarding.filters)
        dispatch(handleLoadShelves())
        dispatch(closeOnboard())

        if(onboarding.restart)
            dispatch(handleShowNotification('Preferências alteradas.'))
        dispatch(restartOnboarding(false))

    }

}

export function handleSetFilters(){
    return (dispatch, getState) => {
        const { onboarding } = getState();
        const { filters = {}, steps = [] } = onboarding

        // console.log(filters,)
    }
}

export function handleLoginOnboard(){
    return dispatch => {
        dispatch(openLoginPopup())
        dispatch(closeOnboard())
    }
}