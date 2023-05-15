import { SET_SELECT_FILTER_TOGGLE_ONBOARDING, SET_ONBOARDING_STEPS, SET_FILTERS_ONBOARDING, OPEN_ONBOARD, CLOSE_ONBOARD, SET_SELECT_QUESTION_TOGGLE_ONBOARDING, RESTART_ONBOARDING } from "../actions/onboarding"

export default function onboarding(state = { filters: {}, questions: {} }, action) {
  
    switch (action.type) {
        case SET_ONBOARDING_STEPS:
            return {
                ...state,
                steps: action.steps
            }
        case SET_SELECT_QUESTION_TOGGLE_ONBOARDING:
            return {
                ...state,
                questions: {
                    ...state.questions,
                    [action.questionType]: !state.questions[action.questionType] ? 
                                            action.value : 
                                            (state.questions[action.questionType] == action.value ?
                                                undefined :
                                                action.value
                    )
                }
            }
            case SET_SELECT_FILTER_TOGGLE_ONBOARDING:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.filterType]: !state.filters[action.filterType] ? [action.value] : (
                        state.filters[action.filterType].find(value => JSON.stringify(value) == JSON.stringify(action.value))  ?
                            state.filters[action.filterType].filter(value => JSON.stringify(value) !== JSON.stringify(action.value)) :
                            state.filters[action.filterType].concat([action.value])
                    )
                }
            }
        case OPEN_ONBOARD:
            return {
                ...state,
                open: true
            }
        case CLOSE_ONBOARD:
            return {
                ...state,
                open: false
            }
        case RESTART_ONBOARDING:
            return {
                ...state,
                restart: action.restart 
            }
            
        case SET_FILTERS_ONBOARDING:
            return  {
                ...state,
                filters: {
                    ...action.filters,
                }
            }   
        default:
            return state
    }
}