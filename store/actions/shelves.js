import { getShelves, getBanners } from "../../graphql"
import { setProducts } from "./product"

export const SET_LOADING = 'SET_LOADING'
export const SET_SHELVES = 'SET_SHELVES'
export const SET_BANNERS = 'SET_BANNERS'
export const SET_CURRENT_BANNER = 'SET_CURRENT_BANNER'

export function setShelves(shelves) {
    return {
        type: SET_SHELVES,
        shelves
    }
}

export function setBanners(banners) {
    return {
        type: SET_BANNERS,
        banners
    }
}

export function setIsLoading(loading) {
    return {
        type: SET_LOADING,
        loading
    }
}

export function setCurrentBanner(current) {
    return {
        type: SET_CURRENT_BANNER,
        current
    }
}


export function handleLoadShelves() {

    return async (dispatch, getState) => {
        dispatch(setIsLoading(true))
        
        const { onboarding } = getState();

        
        const shelves = await getShelves(Object.keys(onboarding.filters || {}).map(key => ({ [key] : onboarding.filters[key].flat()})).reduce((a,b) => ( { ...b, ...a } ) ,{}));
        
        const shelvesFormated = shelves.reduce((a, b) => ({
            [b.key]: {
                ...b,
                title: b.title,
                subtitle: (b.subtitle && b.subtitle.length > 0) ? b.subtitle : undefined,
                products: (b.products || []).map(p => p.key),
            }, ...a
        }), {})
        const products = shelves.map(c => c.products || []).flat().reduce((a, b) => ({
            [b.key]: b,
            ...a
        }), {})


        dispatch(setProducts(products))
        dispatch(setShelves(shelvesFormated))

        dispatch(setIsLoading(false))
    }
}

export function handleInitBanner() {

    return async dispatch => {

        const banners = await getBanners()
        
        dispatch(setBanners(banners))
    }
}