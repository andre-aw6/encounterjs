import { openCart, openPopupModal } from "./info";
import { modelId } from "expo-device";
import {
  deliveryOptions,
  deliveryTaxes,
  createOrder,
  applyCupon,
  getLastPaymentId,
  renewOrderM,
} from "../../graphql";
import { addOrderAndSelect } from "./orders";
import { handleShowNotification } from "./notification";
import { translation } from "../../texts";
import { Alert } from "react-native";
import config from "../../config";
import { isLoading } from "expo-font";
import { setProducts } from "./product";

export const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
export const CART_SET_RENEW = "CART_SET_RENEW";
export const CART_REMOVE_PRODUCT = "CART_REMOVE_PRODUCT";
export const CART_SET_SUBTOTAL_AND_TOTAL = "CART_SET_SUBTOTAL_AND_TOTAL";
export const CART_LOGOUT = "CART_LOGOUT";
export const CART_SET_DELIVERY_TYPE_OPENED = "CART_SET_DELIVERY_TYPE_OPENED";
export const CART_SET_DELIVERY = "CART_SET_DELIVERY";
export const CART_SET_DELIVERY_OPTIONS = "CART_SET_DELIVERY_OPTIONS";
export const CART_SET_DELIVERY_TAXES = "CART_SET_DELIVERY_TAXES";
export const CART_SET_PAYMENT_METHODS = "CART_SET_PAYMENT_METHODS";
export const CART_SET_CUPOM = "CART_SET_CUPOM";
export const CART_IS_LOADING = "CART_IS_LOADING";
export const CART_CLEAR = "CART_CLEAR";

function addProduct(key, size) {
  return {
    type: CART_ADD_PRODUCT,
    key,
    size,
  };
}
function setCupom(cupom) {
  return {
    type: CART_SET_CUPOM,
    cupom,
  };
}
function setRenew(renewOrderId) {
  return {
    type: CART_SET_RENEW,
    renewOrderId,
  };
}

function setDeliveryTaxes(value) {
  return {
    type: CART_SET_DELIVERY_TAXES,
    value,
  };
}
function setPaymentMethods(key) {
  return {
    type: CART_SET_PAYMENT_METHODS,
    key,
  };
}
function clear() {
  return {
    type: CART_CLEAR,
  };
}

export function handleClearCart() {
  return (dispatch) => {
    dispatch(clear());
  };
}
function cartSetDeliveryOptions(deliveryType, options) {
  return {
    type: CART_SET_DELIVERY_OPTIONS,
    deliveryType,
    options,
  };
}
function cartIsLoading(isLoading) {
  return {
    type: CART_IS_LOADING,
    isLoading,
  };
}

export function cartSetDelivery(type, mode, value) {
  return {
    type: CART_SET_DELIVERY,
    deliveryType: type,
    deliveryTypeMode: mode,
    value,
  };
}
export function cartSetDeliveryTypeOpened(type, mode) {
  return {
    type: CART_SET_DELIVERY_TYPE_OPENED,
    deliveryType: type,
    deliveryTypeMode: mode,
  };
}

function cartLogout() {
  return {
    type: CART_LOGOUT,
  };
}

function removeProduct(productKey) {
  return {
    type: CART_REMOVE_PRODUCT,
    productKey,
  };
}

function setSubtotalAndTotal(total, subtotal, time) {
  return {
    type: CART_SET_SUBTOTAL_AND_TOTAL,
    total,
    subtotal,
    time,
  };
}

export function handleRemoveProductConfirmModal(productKey) {
  return async (dispatch) => {
    return await new Promise((resolve) => {
      dispatch(
        openPopupModal("CONFIRM_MODAL", {
          callBack: (r) => {
            if (r) {
              dispatch(handleRemoveProduct(productKey));
              dispatch(handleApplyCupon());
            }
            resolve(r);
          },
          // title: 'Exluir endereço',
          confirmBtn: "Sim",
          title: translation("cart.cartRemove"),
        })
      );
    });
  };
}
export function handleRemoveProduct(productKey) {
  return (dispatch, getState) => {
    dispatch(removeProduct(productKey));

    // dispatch(openCart())
    dispatch(calcTotal());
  };
}
export function handleAddProduct(productKey, options) {
  return (dispatch, getState) => {
    const chooseOption = (size) => {
      dispatch(addProduct(productKey, size));
      dispatch(handleOpenCart());

      dispatch(handleApplyCupon());
      dispatch(calcTotal());

      return true;
    };
    // const options = ['P', 'M', 'G']
    if (!config.chooseTagsAndCategories || options.length <= 1)
      return Promise.resolve(chooseOption());
    return new Promise((r) => {
      dispatch(
        openPopupModal("OPTIONS_MODAL", {
          callBack: (option) => {
            if (option) {
              chooseOption(option);
              return r(option);
            }
            r(option);
          },
          options,
          title: "Escolha o tamanho:",
        })
      );

      // Alert.alert(
      //     'Qual tamanho?',
      //     'Estolha o tamanho da sua peça:',
      //     [
      //         ...options.map(text => ({
      //             text,
      //             onPress: () => {  chooseOption(text); r()}
      //         })),
      //         { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel', },
      //     ],
      //     { cancelable: false }
      // );
    });
  };
}

export function handleApplyCupon() {
  return async (dispatch, getState) => {
    dispatch(cartIsLoading(true));
    const { cart, products: productsState } = getState();

    const { products = [] } = cart;
    const subtotal = products
      .map((key) => productsState.products[key])
      .reduce((a, b) => a + b.priceValue, 0);

    const cupon = await applyCupon(subtotal, products);
    dispatch(setCupom(cupon));
    dispatch(calcTotal());
    dispatch(cartIsLoading(false));
  };
}

function calcTotal() {
  return async (dispatch, getState) => {
    const { cart, products: productsState } = getState();

    dispatch(handleLoadDeliveryMethods());

    const { products = [], cupom = {}, deliveryTaxes = 0 } = cart;
    const cupomDiscount = cupom && cupom.discount ? cupom.discount : 0;
    const subtotal = products
      .map((key) => productsState.products[key])
      .reduce((a, b) => a + b.priceValue, 0);
    const total = subtotal - cupomDiscount + deliveryTaxes;
    const time = products.length >= 2 ? 7 : 3;

    dispatch(setSubtotalAndTotal(total, subtotal, time));
  };
}

export function handleLoginCart() {
  return (dispatch) => {
    dispatch(handleApplyCupon());
  };
}

export function handleLogoutCart() {
  return (dispatch) => {
    dispatch(cartLogout());
    dispatch(handleLoadDeliveryMethods());
    dispatch(calcTotal());
  };
}

export function handleSelectAddress(addressKey) {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { deliveryTypeOpened, deliveryTypeMode } = cart;

    dispatch(cartSetDelivery(deliveryTypeOpened, deliveryTypeMode, addressKey));
    dispatch(handleCalcDeliveryTaxes());
  };
}

export function handleSelectAddressDefault(type, mode) {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { delivery = {} } = cart;
    const deliveryOptions = delivery[type].deliveryOptions || [];
    const otherType = type == "leave" ? "take" : "leave";
    const value = delivery[otherType].selected.key;

    dispatch(cartSetDelivery(type, mode, value));
    dispatch(handleCalcDeliveryTaxes());
  };
}

export function handleSelectPaymentMethod(key) {
  return (dispatch, getState) => {
    dispatch(setPaymentMethods(key));
    dispatch(handleCalcDeliveryTaxes());
  };
}

export function handleSelectModeAddress(type, mode) {
  return (dispatch, getState) => {
    const { cart } = getState();
    const { delivery } = cart;

    dispatch(
      cartSetDelivery(
        type,
        mode,
        delivery[type].selected ? delivery[type].selected.key : undefined
      )
    );

    dispatch(handleCalcDeliveryTaxes());
  };
}

export function handleLoadDeliveryMethods() {
  return async (dispatch, getState) => {
    const getOptions = () => {
      const { cart } = getState();
      const { products = [], delivery = {} } = cart || {};
      const { take = {}, leave = {} } = delivery;

      const takeDeliveryMethod =
        take && take.selected ? take.selected.type : undefined;
      const leaveDeliveryMethod =
        leave && leave.selected ? leave.selected.type : undefined;

      return {
        productsLength: products.length,
        takeDeliveryMethod,
        leaveDeliveryMethod,
      };
    };

    const {
      takeDeliveryMethod,
      leaveDeliveryMethod,
      productsLength,
    } = getOptions();

    const { take, leave } = await deliveryOptions(
      productsLength,
      takeDeliveryMethod
    );
    dispatch(cartSetDeliveryOptions("take", take));
    dispatch(cartSetDeliveryOptions("leave", leave));
  };
}

export function handleCalcDeliveryTaxes() {
  return async (dispatch, getState) => {
    const { cart = {}, user = {}, address = {} } = getState();
    const { delivery = {} } = cart;
    const { adresses = {} } = address;

    const { take = {}, leave = undefined } = delivery;
    const hasLeave = !!(leave && leave.deliveryOptions);

    if (
      take.selected &&
      take.selected.type &&
      (!hasLeave || (leave.selected && leave.selected.type))
    ) {
      dispatch(cartIsLoading(true));

      const total = await deliveryTaxes(
        take.selected.type,
        hasLeave ? leave.selected.type : undefined,
        adresses[take.selected.key]
          ? adresses[take.selected.key].cep
          : undefined,
        hasLeave && adresses[leave.selected.key]
          ? adresses[leave.selected.key].cep
          : undefined
      );
      dispatch(cartIsLoading(false));
      dispatch(setDeliveryTaxes(total));
    } else {
      dispatch(setDeliveryTaxes(0));
    }
    // deliveryTaxes()
    dispatch(calcTotal());
  };
}

export function handleCheckOut() {
  return async (dispatch, getState) => {
    try {
      dispatch(cartIsLoading(true));

      const { cart } = getState();
      const renew = cart.renew;
      let order = {};
      if (renew) {
        order = await renewOrderM(cart.renewOrderId, cart.payment);
      } else {
        const { delivery, products, total, payment, sizes, cupom } = cart;
        const { take, leave } = delivery;
        const hasLeave = !!(leave && leave.deliveryOptions);
        const cupomKey = cupom ? cupom.key : undefined;
        const productKeys = products;

        const takeDeliveryMethod = take.selected.type;
        const leaveDeliveryMethod = hasLeave ? leave.selected.type : undefined;

        const takeDeliveryAddressKey = take.selected.key;
        const leaveDeliveryAddressKey = hasLeave
          ? leave.selected.key
          : undefined;

        const totalSumCart = total;

        const productsNames = () => {
          if (!config.chooseTagsAndCategories) return [];

          const names = Object.keys(sizes)
            .filter((key) => !!sizes[key])
            .map((key) => ({ key, value: sizes[key] }));

          return names;
        };
        const productsName = productsNames();

        order = await createOrder(
          productKeys,
          payment,
          totalSumCart,
          cupomKey,
          takeDeliveryMethod,
          leaveDeliveryMethod,
          takeDeliveryAddressKey,
          leaveDeliveryAddressKey,
          productsName
        );
      }

      dispatch(cartIsLoading(false));
      if (!order.success) {
        if (order.message)
          dispatch(
            openPopupModal("INFO_POPUP", {
              title: "Ops... 😔",
              text: order.message,
            })
          );
        return false;
      }
      // console.log(JSON.stringify(order.order, null,))
      dispatch(addOrderAndSelect(order.order));
      dispatch(clear());
      dispatch(handleOpenCart(false));
      if (renew) dispatch(handleShowNotification("Renovação realizada."));
      else dispatch(handleShowNotification("Pedido realizado"));
      if (order.order)
        if (order.order.isFirst)
          dispatch(
            openPopupModal("INFO_POPUP", {
              title: translation("orders.firstOrder.title"),
              text: translation("orders.firstOrder.description"),
            })
          );

      return true;
    } catch (error) {
      dispatch(
        handleShowNotification(
          "Ops, ocorreu um erro. Tente novamente mais tarde.",
          "danger"
        )
      );
      console.log(error);
      dispatch(cartIsLoading(false));
    }
  };
}

export function renewOrder(orderId, products, time) {
  return (dispatch) => {
    dispatch(clear());
    dispatch(setProducts(products));
    products.map(({ key }) => dispatch(addProduct(key)));
    const total = products.map((p) => p.priceValue).reduce((a, b) => a + b, 0);

    dispatch(handleOpenCart());
    dispatch(setSubtotalAndTotal(total, total, time));
    dispatch(setRenew(orderId));
  };
}

export function handleOpenCart(show = true) {
  return async (dispatch, getState) => {
    const { cart } = getState();
    if (cart.renew && !show) {
      dispatch(clear());
    }

    if (show) {
      const paymentId = await getLastPaymentId();
      if (paymentId) dispatch(handleSelectPaymentMethod(paymentId));
    }
    dispatch(openCart(show));
  };
}
