import {
  SET_PRODUCTS,
  SET_CURRENT_PRODUCT,
  SET_EVALUATIONS_PRODUCTS,
} from "../actions/product";
import { arrayToObj } from "../../utils/helpers";

export default function product(
  state = { products: {}, currentProductKey: undefined },
  action
) {
  switch (action.type) {
    case SET_EVALUATIONS_PRODUCTS:
      return {
        ...state,
        evaluationsProducts: action.evaluationsProducts,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          ...arrayToObj(
            Object.keys(action.products).map((key) => ({
              ...(state.products || {})[key],
              ...action.products[key],
            }))
          ),
        },
      };
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductKey: action.currentProductKey,
      };
    default:
      return state;
  }
}
