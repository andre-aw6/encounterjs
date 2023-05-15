// import { getShelves } from "../../utils/api"
import { handleInitBanner, handleLoadShelves } from "./shelves";
import {
  handleLoadOnboarding,
  setSelectFilterToggleOnboarding,
} from "./onboarding";
import { handleLoadFilters, handleLoadAndOpenFilter } from "./filters";
import { handleUserData, handleSetNotificationViewed } from "./user";
import { setChoseAddressMode } from "./address";
import {
  cartSetDeliveryTypeOpened,
  cartSetDelivery,
  handleLoadDeliveryMethods,
} from "./cart";
import { setChosePaymentMethodsMode } from "./payments";
import { handleLoadAppConfig, handleLoadNeedUpdateApp } from "./app";
import { handleShowNotification, handleHideNotification } from "./notification";
import { handleSetCurrentProduct } from "./product";
import { Linking } from "react-native";
import {
  setSelectFilterToggleDiscovery,
  handleLoadDiscovery,
} from "./discovery";
import { handleSetQuickSearchs } from "./quickSearch";
import { sendErros } from "../../graphql";
export function handleInitHome() {
  return async (dispatch) => {
    await Promise.all([
      dispatch(handleLoadShelves()),
      dispatch(handleInitBanner()),
    ]);
  };
}

export function handleInitApp() {
  return async (dispatch) => {
    // setTimeout(
    //     () => dispatch(handleShowNotification('Informações alteradas com sucesso!', 'success', 30000))
    // , 4000
    // )

    try {
      await Promise.all([
        ,
        dispatch(handleLoadNeedUpdateApp()),
        dispatch(handleLoadAppConfig()),
        dispatch(handleLoadOnboarding()),
        dispatch(handleLoadFilters()),
      ]);

      dispatch(handleUserData()).then((_) => dispatch(handleSetQuickSearchs()));
      dispatch(handleLoadDeliveryMethods());
      dispatch(handleLoadDiscovery());
    } catch (error) {
      console.log(error);
      sendErros(JSON.stringify(error));
    }
  };
}

export function handleSetCartChoseAddress(type, deliveryTypeMode) {
  return (dispatch) => {
    dispatch(cartSetDeliveryTypeOpened(type, deliveryTypeMode));
    dispatch(setChoseAddressMode(true));
  };
}

export function handleCloseCartChoseAddress() {
  return (dispatch) => {
    dispatch(cartSetDeliveryTypeOpened(undefined));
    dispatch(setChoseAddressMode(false));
  };
}

export function handleSetCartChosePayment() {
  return (dispatch) => {
    dispatch(setChosePaymentMethodsMode(true));
  };
}

export function handleCloseSetCartChosePayment() {
  return (dispatch) => {
    dispatch(setChosePaymentMethodsMode(false));
  };
}

let redirectFunction;
export function registerRedirectComponent(callback) {
  redirectFunction = callback;
}

function redirect(screen) {
  if (redirectFunction) redirectFunction(screen);
}

export function handleProcessActions(action) {
  return async (dispatch) => {
    if (!action) return;
    const type = action.split("#|#")[0];

    if (type == "product") {
      dispatch(handleSetCurrentProduct(action.split("#|#")[1]));
      redirect("ProductDetails");
    }

    if (type == "order") {
      // dispatch(handleSetCurrentProduct(action.split("#|#")[1]))
      // redirect("Billing")
    }

    if (type == "filter") {
      await dispatch(handleLoadAndOpenFilter(action.split("#|#")[1]));
      redirect("Busca");
    }

    if (type == "external_link") {
      Linking.openURL(action.split("#|#")[1]).catch(() =>
        dispatch(
          handleShowNotification("Erro ao abrir link externo.", "danger")
        )
      );
    }
  };
}

export function handleOpenNotification(key, action) {
  return async (dispatch, getState) => {
    dispatch(handleSetNotificationViewed(key));
    dispatch(handleProcessActions(action));
  };
}

export function handleSelectFilterToggle(type, e) {
  return (dispatch, getState) => {
    const { discovery } = getState();
    const { open = false } = discovery;

    if (!open) dispatch(setSelectFilterToggleOnboarding(type, e));
    else dispatch(setSelectFilterToggleDiscovery(type, e));
  };
}
