import {
  CART_ADD_PRODUCT,
  CART_CLEAR,
  CART_IS_LOADING,
  CART_LOGOUT,
  CART_SET_SUBTOTAL_AND_TOTAL,
  CART_REMOVE_PRODUCT,
  CART_SET_DELIVERY,
  CART_SET_DELIVERY_TYPE_OPENED,
  CART_SET_DELIVERY_OPTIONS,
  CART_SET_DELIVERY_TAXES,
  CART_SET_PAYMENT_METHODS,
  CART_SET_CUPOM,
  CART_SET_RENEW,
} from "../actions/cart";

const delivery = {
  take: {
    deliveryOptions: [],
  },
  leave: {
    deliveryOptions: [],
  },
};

const defaultCart = {
  products: [], //key, price, name

  deliveryTypeOpened: undefined,
  delivery,
  // tempo de aluguem
  time: undefined,
  payment: undefined,

  deliveryTaxes: undefined,

  cupom: undefined, //cumpom vinculado

  subtotal: undefined,
  total: false,
};

export default function cart(state = defaultCart, action) {
  switch (action.type) {
    case CART_CLEAR:
      return {
        ...defaultCart,
      };
    case CART_SET_DELIVERY_OPTIONS:
      return {
        ...state,
        delivery: {
          ...state.delivery,
          [action.deliveryType]: {
            ...state.delivery[action.deliveryType],
            deliveryOptions: action.options,
          },
        },
      };
    case CART_SET_RENEW:
      return {
        ...state,
        renew: true,
        renewOrderId: action.renewOrderId,
      };
    case CART_ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.key],
        sizes: {
          ...state.sizes,
          [action.key]: action.size,
        },
      };
    case CART_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case CART_REMOVE_PRODUCT:
      return {
        ...state,
        products: [...state.products.filter((p) => p !== action.productKey)],
      };
    case CART_SET_SUBTOTAL_AND_TOTAL:
      return {
        ...state,
        subtotal: action.subtotal,
        total: action.total,
        time: action.time,
      };
    case CART_SET_CUPOM:
      return {
        ...state,
        cupom: action.cupom,
      };
    case CART_SET_DELIVERY_TAXES:
      return {
        ...state,
        deliveryTaxes: action.value,
      };
    case CART_SET_PAYMENT_METHODS:
      return {
        ...state,
        payment: action.key,
      };
    case CART_LOGOUT:
      return {
        ...state,
        time: undefined,
        payment: undefined,
        deliveryTaxes: undefined,
        cupom: undefined,
        subtotal: undefined,
        total: false,
        delivery,
      };

    case CART_SET_DELIVERY:
      return {
        ...state,
        // products: [...state.products],
        delivery: {
          ...state.delivery,
          [action.deliveryType]: {
            ...state.delivery[action.deliveryType],
            selected: {
              key: action.value,
              type: action.deliveryTypeMode,
            },
          },
        },
      };
    case CART_SET_DELIVERY_TYPE_OPENED:
      return {
        ...state,
        deliveryTypeOpened: action.deliveryType,
        deliveryTypeMode: action.deliveryTypeMode,
      };
    default:
      return state;
  }
}
