export const OPEN_INFO_MODAL = "OPEN_MODAL";
export const CLOSE_INFO_MODAL = "CLOSE_MODAL";
export const OPEN_POPUP_MODAL = "OPEN_POPUP_MODAL";
export const CLOSE_POPUP_MODAL = "CLOSE_POPUP_MODAL";
export const OPEN_CART = "OPEN_CART";

export function openInfoModal(content, title) {
  return {
    type: OPEN_INFO_MODAL,
    content,
    title,
  };
}

export function openCart(show = true) {
  return {
    type: OPEN_CART,
    show,
  };
}

export function closeInfoModal() {
  return {
    type: CLOSE_INFO_MODAL,
  };
}

export function openPopupModal(typeOfModal, data) {
  return {
    type: OPEN_POPUP_MODAL,
    typeOfModal,
    data,
  };
}

export function closePopupModal() {
  return {
    type: CLOSE_POPUP_MODAL,
  };
}
