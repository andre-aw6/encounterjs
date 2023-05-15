import { orders } from "../../graphql";
import { arrayToObj } from "../../utils/helpers";
import { openPopupModal } from "./info";
import { translation } from "../../texts";
import { Linking } from "react-native";

export const ORDERS_SET_ORDERS = "ORDERS_SET_ORDERS";
export const ORDERS_SET_ORDER_SELECTED = "ORDERS_SET_ORDER_SELECTED";

function ordersSetOrders(orders) {
  return {
    type: ORDERS_SET_ORDERS,
    orders,
  };
}
function setSelect(key) {
  return {
    type: ORDERS_SET_ORDER_SELECTED,
    key,
  };
}

export function handleLoadOrders() {
  return async (dispatch) => {
    try {
      const orders_ = await orders();

      dispatch(ordersSetOrders(arrayToObj(orders_)));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleSelectOrder(key) {
  return async (dispatch) => {
    dispatch(setSelect(key));
  };
}
export function addOrderAndSelect(order) {
  return async (dispatch) => {
    dispatch(ordersSetOrders({ [order.key]: order }));
    dispatch(handleSelectOrder(order.key));
  };
}
export function handleOpenOrderHelp(key) {
  return (dispatch) => {
    dispatch(
      openPopupModal("WPP_POPUP", {
        text: translation("orders.helpWPP", { key }),
      })
    );
  };
}

export function handleEvaluateExperience() {
  return async (dispatch, getState) => {
    const { app = {} } = getState();
    const { about = {} } = app;
    const { phone } = about;
    return await new Promise((resolve) => {
      dispatch(
        openPopupModal("TEXT_MODAL", {
          callBack: (text) => {
            if (text)
              Linking.openURL(
                "whatsapp://send?phone=" + phone + "&text=" + text
              );
            resolve(text);
          },
          title: "Avalie sua experiência",
          description: "Sua avaliação é muito importante para a gente!",
          confirmBtn: "Avaliar",
        })
      );
    });
  };
}
