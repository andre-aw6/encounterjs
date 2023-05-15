import { handleSetSelects } from './filters'
import { API_URI } from '../../graphql/client'
import { customFilter } from '../../graphql'
export const SET_SELECT_FILTER_TOGGLE_DISCOVERY = 'SET_SELECT_FILTER_TOGGLE_DISCOVERY'
export const START_DISCOVERY = 'START_DISCOVERY'
export const OPEN_DISCOVERY = 'OPEN_DISCOVERY'
export const CLOSE_DISCOVERY = 'CLOSE_DISCOVERY'
export const SET_FILTERS_DISCOVERY = 'SET_FILTERS_DISCOVERY'
export const SET_DISCOVERY_STEPS = 'SET_DISCOVERY_STEPS'

export function setSelectFilterToggleDiscovery(filterType, value){
    return {
        type: SET_SELECT_FILTER_TOGGLE_DISCOVERY,
        filterType,
        value
    }
}

function setFilters(filters){
    return {
        type: SET_FILTERS_DISCOVERY,
        filters
    }
}

export function startDiscovery(){
    return {
        type: START_DISCOVERY,
    }
}
export function setDiscoverySteps(steps){
    return {
        type: SET_DISCOVERY_STEPS,
        steps
    }
}

function openDiscovery(){
    return {
        type: OPEN_DISCOVERY,
    }
}

export function closeDiscovery(){
    return {
        type: CLOSE_DISCOVERY,
    }
}


let discoveryResolve;
export function handleOpenDiscovery(){
    
    return async dispatch => {
        dispatch(openDiscovery())
        dispatch(handleLoadDiscovery())
        
        return new Promise(r => discoveryResolve = r)
        
    }
}

export function handleLoadDiscovery(){
    return async dispatch => {
        const steps = await customFilter("discovery")
    dispatch(setDiscoverySteps(steps))
    }
}
export function handleFinishDiscovery(){

    return async (dispatch, getState) => {
        const { discovery } = getState();
        
        dispatch(handleSetSelects(discovery.filters))

        // await Storage.setItem(storageName, discovery.filters)
        dispatch(closeDiscovery())
        dispatch(setFilters({}))
        if(discoveryResolve) discoveryResolve(true)
    }

}