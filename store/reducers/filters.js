import { SET_FILTERS, SET_SELECTS_DEFAULT, SET_SELECTS, SET_RECENTS_FILTERING_TEXT, SET_CLEAR_SELECTS_FOR_TYPE, SET_CHIP_FILTERS, SET_NUMBER_OF_FILTERS, SET_SELECT_FILTER, SET_SELECT_FILTER_TOGGLE, SET_CLEAR_SELECTS, SET_FILTERING_TEXT, SET_FILTERING_RESULTS, SET_FILTERING_RESULTS_LOADING, SET_FILTERING_TUTORIAL } from "../actions/filters";


export default function filters(state = {}, action) {
    // if(action.type == SET_FILTERS) 
    switch (action.type) {
        case SET_FILTERING_TUTORIAL:
            return{
                ...state,
                tutorial: action.show
            }
        case SET_SELECTS_DEFAULT:
            return {
                 ...state,
                 selects: action.defaultSelectsFilter,
                 defaultSelectsFilter: action.defaultSelectsFilter
            }
        case SET_FILTERS:
            return {
                ...state,
                filters: [
                    ...action.filters
                ]
            }
        case SET_SELECT_FILTER_TOGGLE:
            return {
                ...state,
                selects: {
                    ...state.selects,
                    [action.filterType]: !state.selects[action.filterType] ? [action.value] : (
                        state.selects[action.filterType].includes(action.value) ?
                            state.selects[action.filterType].filter(c => c !== action.value) :
                            state.selects[action.filterType].concat([action.value])
                    )
                }
            }
        case SET_FILTERING_RESULTS:
            return {
                ...state,
                results: action.results,
                isFiltered: action.isFiltered,
                isLoading: false
            }
        case SET_FILTERING_RESULTS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SET_SELECT_FILTER:
            return {
                ...state,
                selects: {
                    ...state.selects,
                    [action.filterType]: [action.value]
                }
            }
        case SET_CLEAR_SELECTS:
            return {
                ...state,
                selects: {
                    ...state.defaultSelectsFilter
                },
                text: ''
            }
        case SET_CLEAR_SELECTS_FOR_TYPE:
            return {
                ...state,
                selects: {
                    ...state.selects,
                    [action.filterType]: []
                },
                text: ''
            }
        case SET_SELECTS:
            return {
                ...state,
                selects: {
                    ...state.defaultSelectsFilter,
                    ...action.selects,
                }
            }

        case SET_FILTERING_TEXT:
            return {
                ...state,
                text: action.text
            }
        case SET_RECENTS_FILTERING_TEXT:
            return {
                ...state,
                recentTexts: action.texts
            }

        case SET_NUMBER_OF_FILTERS:
            return {
                ...state,
                numberOfFilters: action.numberOfFilters
            }
        case SET_CHIP_FILTERS:
            return {
                ...state,
                chips: action.chips
            }
        default:
            return state
    }
}