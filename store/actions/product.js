import { getProduct, evaluateProduct } from "../../graphql";
import { openPopupModal, closePopupModal } from "./info";
import { handleShowNotification } from "./notification";
import { arrayToObj } from "../../utils/helpers";
export const SET_PRODUCTS = "SET_PROCDUCTS";
export const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT";
export const SET_EVALUATIONS_PRODUCTS = "SET_EVALUATIONS_PRODUCTS";

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    products,
  };
}

export function setEvaluationsProducts(evaluationsProducts) {
  return {
    type: SET_EVALUATIONS_PRODUCTS,
    evaluationsProducts,
  };
}

function setCurrentProduct(currentProductKey) {
  return {
    type: SET_CURRENT_PRODUCT,
    currentProductKey,
  };
}

export function handleSetCurrentProduct(key) {
  return async (dispatch) => {
    dispatch(setCurrentProduct(key));
    const product = await getProduct(key);

    dispatch(
      setProducts({
        [key]: {
          ...product,
          isLoad: true,
        },
      })
    );
  };
}

export function handleOpenEvaluationProduct(keys) {
  return (dispatch, getState) => {
    const { user } = getState();
    const { isLogged = false } = user;

    if (!isLogged) return dispatch(openPopupModal("LOGIN_POPUP"));

    const keysArr = Array.isArray(keys) ? keys : [keys];
    dispatch(setEvaluationsProducts(keysArr));
    dispatch(openPopupModal("EVALUATE"));
  };
}

export function handleEvaluationProduct(evaluations) {
  return async (dispatch) => {
    dispatch(closePopupModal());

    const result = await Promise.all(
      Object.keys(evaluations).map((key) =>
        evaluateProduct(key, evaluations[key]).then((result) => result.product)
      )
    );

    dispatch(
      setProducts(
        arrayToObj(
          result.map((p) => ({
            ...p,
            isLoad: true,
          }))
        )
      )
    );

    dispatch(handleShowNotification("Avaliação salva!"));
  };
}
