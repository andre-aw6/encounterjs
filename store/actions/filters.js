import storage from "../../utils/storage"
import { getProducts, getFilters, getFilter } from "../../graphql"
import { setProducts } from "./product"
import { arrayToObj } from "../../utils/helpers"

export const SET_FILTERS = "SET_FILTERS"
export const SET_SELECTS_DEFAULT = "SET_SELECTS_DEFAULT"
export const SET_SELECT_FILTER_TOGGLE = 'SET_SELECT_FILTER_TOGGLE'
export const SET_CLEAR_SELECTS = 'SET_CLEAR_SELECTS'
export const SET_SELECT_FILTER = 'SET_SELECT_FILTER'
export const SET_NUMBER_OF_FILTERS = 'SET_NUMBER_OF_FILTERS'
export const SET_CHIP_FILTERS = 'SET_CHIP_FILTERS'
export const SET_CLEAR_SELECTS_FOR_TYPE = 'SET_CLEAR_SELECTS_FOR_TYPE'
export const SET_SELECTS = 'SET_SELECTS'
export const SET_FILTERING_TEXT = 'SET_FILTERING_TEXT'
export const SET_RECENTS_FILTERING_TEXT = 'SET_RECENTS_FILTERING_TEXT'
export const SET_FILTERING_RESULTS = 'SET_FILTERING_RESULTS'
export const SET_FILTERING_RESULTS_LOADING = 'SET_FILTERING_RESULTS_LOADING'
export const SET_FILTERING_TUTORIAL = 'SET_FILTERING_TUTORIAL'

// export const defaultSelectsFilter = {
//     order: ['A-Z'],
//     searchGroup: ['Todo acervo']
// }

const myFavorites = 'Meus Favoritos'

function setFilters(filters) {
    return {
        type: SET_FILTERS,
        filters
    }
}
function setSelects(selects) {
    return {
        type: SET_SELECTS,
        selects
    }
}

function setFilteringTutorial(show) {
    return {
        type: SET_FILTERING_TUTORIAL,
        show
    }
}

function setFilteringResult(results, isFiltered) {
    return {
        type: SET_FILTERING_RESULTS,
        results,
        isFiltered
    }
}
function setFilteringResultLoading() {
    return {
        type: SET_FILTERING_RESULTS_LOADING,
    }
}

function setFilteringText(text) {
    return {
        type: SET_FILTERING_TEXT,
        text
    }
}

function setRecentsFilteringTexts(texts) {
    return {
        type: SET_RECENTS_FILTERING_TEXT,
        texts
    }
}

function setSelectFilterToggle(filterType, value) {
    return {
        type: SET_SELECT_FILTER_TOGGLE,
        filterType,
        value
    }
}
function setSelectFilter(filterType, value) {
    return {
        type: SET_SELECT_FILTER,
        filterType,
        value
    }
}

function setNumberOfFilters(numberOfFilters) {
    return {
        type: SET_NUMBER_OF_FILTERS,
        numberOfFilters
    }
}

function setChipFilters(chips) {
    return {
        type: SET_CHIP_FILTERS,
        chips
    }
}

function clearSelects() {
    return {
        type: SET_CLEAR_SELECTS
    }
}

function clearSelectsForType(filterType) {
    return {
        type: SET_CLEAR_SELECTS_FOR_TYPE,
        filterType
    }
}

function setSelectsDefault(defaultSelectsFilter){
    return {
        type: SET_SELECTS_DEFAULT,
        defaultSelectsFilter
    }
}

export function handleClearSelects(type) {
    return (dispatch, getState) => {
        const { filters } = getState()
        const { defaultSelectsFilter = {} } = filters;
        const filter = filters.filters.find(f => f.type == type);

        if (filter && filter.isSingle) {
            dispatch(setSelectFilter(type, defaultSelectsFilter[type][0]))
        } else {
            if (type)
                dispatch(clearSelectsForType(type))
            else
                dispatch(clearSelects())
        }



        dispatch(filterItems(false))
    }
}

export function handleSetSelectFilter(filterType, value, needDebounce = true) {
    return (dispatch, getState) => {
        const { filters } = getState();

        if (filters.filters.find(f => f.type == filterType) && filters.filters.find(f => f.type == filterType).isSingle)
            dispatch(setSelectFilter(filterType, value))
        else
            dispatch(setSelectFilterToggle(filterType, value))

        dispatch(filterItems(needDebounce))
    }
}

function setChips() {
    // setChipFilters
    return (dispatch, getState) => {

        const { filters } = getState();
        const { defaultSelectsFilter = {} } = filters;
        const { text = '' } = filters
        const chips = [
            {
                isRemovable: false,
                text: filters.selects.order[0],
                type: 'order'
            },

            
        ]
        
        if(filters && filters.filters.find(f => f.type == "searchGroup"))
            chips.push({
                isRemovable: filters.selects.searchGroup[0] !== defaultSelectsFilter.searchGroup[0],
                text: filters.selects.searchGroup[0],
                type: 'searchGroup'
            })


        // ${filters.filters.find(f => f.key == key).title}
        Object.keys(filters.selects)
            .filter(key => filters.selects[key].length > 0 && key !== 'order' && key !== 'searchGroup')
            .map(key => ({
                isRemovable: true,
                text: key == 'numberOfPlayer' ? `${filters.selects[key].sort().join(', ')} jogador${(filters.selects[key].length == 1 && filters.selects[key][0] == 1) ? '' : 'es'}` : `${filters.filters.find(f => f.type == key).title} (${filters.selects[key].length})`,
                type: key
            }))
            .forEach(item => chips.push(item))

        dispatch(setChipFilters(chips))


    }
}


function calcNumberOfFilters() {

    return (dispatch, getState) => {
        const state = getState();

        const n = Object.keys(state.filters.selects)
            .filter(key => key !== 'order' && key !== 'searchGroup')
            .filter(key => state.filters.selects[key].length > 0)
            .length


        dispatch(setNumberOfFilters(n))
    }
}
export function handleLoadFilters() {
    return async (dispatch, getState) => {

        const { filters: filtersState } = getState();

        if (filtersState.filters) return;

        const { filters, selected } = await getFilters();
        const recentTexts = await storage.getItem('RECENT_TEXTS')
        
        const selectedFiltered =  Object.keys(selected)
                                .filter(key => Array.isArray(selected[key]))
                                .map(key => ({
                                    [key]: selected[key]
                                }))
                                .reduce((a,b) => ({
                                    ...a,
                                    ...b
                                }))
            
        dispatch(setSelectsDefault(selectedFiltered))
        dispatch(setFilters(filters))
        
        dispatch(setRecentsFilteringTexts(recentTexts ? recentTexts : []))
    }
}

export function handleLoadAndOpenFilter(key){
    return async dispatch => {
        // dispatch(setFilteringResultLoading())
        const filter = await getFilter(key)
        dispatch(handleSetSelects(filter))
    }
}

export function handleSetSelects(filtersIn) {
    return (dispatch, getState) => {

        const { filters } = getState();

        if(filtersIn.text)
            dispatch(setFilteringText(filtersIn.text))
        else 
        dispatch(setFilteringText(''))
        Object.keys(filtersIn)
            .map(key => {
               if(!filters.filters.find(f => f.type == key) || filtersIn[key] == null )
                    delete filtersIn[key]
            })
            
        dispatch(setSelects(filtersIn))
        dispatch(filterItems(false))
    }
}
export function handleChangeFilteringText(text, debounce = true) {
    return (dispatch, getState) => {
        dispatch(setFilteringText(text))
        dispatch(filterItems(debounce))
    }
}

export function handleSetRecentsFilteringText() {

    return (dispatch, getState) => {
        const { filters } = getState();
        const { recentTexts = [], text } = filters;

        let newRecentTexts = recentTexts.filter(e => e !== text).map(e => e)
        if (!text || text.length == 0) return;


        if (newRecentTexts.length !== 0) {
            const lastText = newRecentTexts[recentTexts.length - 1]

            if (text.includes(lastText)) {
                newRecentTexts[newRecentTexts.length - 1] = text;
            } else {
                newRecentTexts.push(text)
            }
        } else {
            newRecentTexts.push(text)
        }

        if (newRecentTexts.length > 5)
            newRecentTexts.shift()

        dispatch(setRecentsFilteringTexts(newRecentTexts))
        storage.setItem('RECENT_TEXTS', newRecentTexts)
    }



}


let filterId = undefined;
function filterItems(debounce = true) {

    return (dispatch, getState) => {

        const { filters } = getState();
        const { defaultSelectsFilter = {}, text = undefined } = filters;

        const currentId = +new Date()
        filterId = currentId

        dispatch(setChips())
        dispatch(calcNumberOfFilters())

        const hasFilter = Object.keys(filters.selects)
            .filter(key => filters.selects[key].length > 0 && key !== 'order' && (key !== 'searchGroup' || (key == 'searchGroup' && filters.selects[key][0] !== defaultSelectsFilter.searchGroup[0])))
            .length > 0 || (filters.text && filters.text.length > 0)
       
        const search_ = async () => {
            dispatch(setFilteringResultLoading())
                    
            const products = (await getProducts(filters.selects, text)).products
            
            dispatch(setProducts(arrayToObj(products)))
            const result = products.map(p => p.key)
            if (filterId == currentId) {
                dispatch(setFilteringResult(result, true))
            }
        }
            
        if (!hasFilter)
            dispatch(setFilteringResult([1, 2, 4], false))
        else
            !debounce ? search_() :
            setTimeout(async () => {
                if (filterId == currentId) {
                    search_()
                }
            }, 500)
    }
}

export function handleSetMyFavorites() {
    return dispatch => {
        dispatch(handleClearSelects())
        dispatch(handleSetSelectFilter('searchGroup', myFavorites, false))
    }
}

const TUTORIAL_STORAGE = 'TUTORIAL_STORAGE'
export function handleNeedTutorial(){
    return async dispatch => {
        const value = await storage.getItem(TUTORIAL_STORAGE)
        dispatch(setFilteringTutorial(!value))
    }
}
export function handleCloseTutorial(){
    return async dispatch => {
        await storage.setItem(TUTORIAL_STORAGE, { show: false })
        dispatch(setFilteringTutorial(false))
    }
}