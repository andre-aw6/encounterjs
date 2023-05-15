import client from "./client";
import {
  getShelvesQuery,
  getProductQuery,
  ProductsQuery,
  bannersQuery,
} from "./queries/shelves";
import {
  EmailIsRegisteryQuery,
  forgotMutation,
  uploadDocumentMutation,
  getAddressByLatLongQuery,
  CreateAuthMutation,
  ConfirmCodeMutation,
  MeQuery,
  LoginMutation,
  EditBasicInfoMutation,
  ToggleFavoriteMutation,
  UserInfoQuery,
  addAddressMutation,
  editAddressMutation,
  getAddressBySearcQuery,
  removeAddressMutation,
  confirmCodeResetPasswordMutation,
  resetPasswordMutation,
  UserNotificationsQuery,
  rememberMeMutation,
  SetNotificationViewedMutation,
  respondQuestionMutation,
} from "./queries/user";
import { getFiltersQuery, getFilterQuery } from "./queries/filter";
import { aboutQuery, updateVersionQuery } from "./queries/app";
import {
  deliveryOptionsQuery,
  deliveryTaxesQuery,
  createOrderMutation,
  ordersQuery,
  getLastPaymentIdQuery,
  renewOrderMudation,
} from "./queries/cart";
import {
  paymentMethodsQuery,
  createPaymentMethodMutation,
  removePaymentMethodMutation,
} from "./queries/payment";
import { evaluateProductMutation, customFilterQuery } from "./queries/product";
import { gql } from "apollo-boost";
import { cuponsQuery, applyCuponMutation } from "./queries/cupons";
import {
  quickSearchsQuery,
  anserwQuestionMutation,
} from "./queries/quickSearchs";
export function getFilters() {
  return client
    .query({
      query: getFiltersQuery,
    })
    .then((resp) => resp.data.getFilters);
}
export function getFilter(key) {
  return client
    .query({
      query: getFilterQuery,
      variables: { key },
    })
    .then((resp) => resp.data.getFilter);
}

export async function getShelves(filter) {
  // await new Promise(r => setTimeout(r, 3000))
  return client
    .query({
      query: getShelvesQuery,
      variables: { ...filter },
    })
    .then((resp) => resp.data.shelves)
    .catch(console.log);
}
export async function getBanners() {
  return client
    .query({
      query: bannersQuery,
    })
    .then((resp) => resp.data.banners);
}
export async function getProduct(id) {
  const result = await client
    .query({
      query: getProductQuery,
      variables: { id },
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data.product.product;
    })
    .catch(console.log);

  // await new Promise(r => setTimeout(r, 1000))

  return result;
}

export async function emailExists(email) {
  const result = await client
    .query({
      query: EmailIsRegisteryQuery,
      variables: { email },
    })
    .then((resp) => {
      return resp.data.emailIsRegistery;
    });

  // await new Promise(r => setTimeout(r, 1000))

  return result;
}

export function login(type, email, password, platform, os, notificationToken) {
  return client
    .mutate({
      mutation: LoginMutation,
      variables: { type, email, password, platform, os, notificationToken },
    })
    .then((resp) => {
      return resp.data.login;
    });
}

export function resetPassword(
  email,
  newPassword,
  token,
  platform,
  os,
  notificationToken
) {
  return client
    .mutate({
      mutation: resetPasswordMutation,
      variables: { email, newPassword, token, platform, os, notificationToken },
    })
    .then((resp) => {
      return resp.data.resetPassword;
    });
}

export function confirmCodeResetPassword(code, email) {
  return client
    .mutate({
      mutation: confirmCodeResetPasswordMutation,
      variables: { email, code },
    })
    .then((resp) => {
      return resp.data.confirmCodeResetPassword;
    });
}

export function createAuth(
  type,
  email,
  password,
  platform,
  os,
  notificationToken
) {
  return client
    .mutate({
      mutation: CreateAuthMutation,
      variables: { type, email, password, platform, os, notificationToken },
    })
    .then((resp) => {
      return resp.data.createAuth;
    });
}
export function sendErros(errors) {
  console.log("a", errors);
  return client
    .mutate({
      mutation: gql`
        mutation($errors: String!) {
          logErrors(errors: $errors)
        }
      `,
      variables: { errors },
    })
    .then((resp) => {
      return resp.data.logErrors;
    });
}

export function confirmCode(email, code, platform, os, notificationToken) {
  return client
    .mutate({
      mutation: ConfirmCodeMutation,
      variables: { email, code, platform, os, notificationToken },
    })
    .then((resp) => {
      return resp.data.confirmCode;
    });
}

export function editBasicInfo(
  name,
  lastname,
  preferenceName,
  birthday,
  cellphone,
  terms,
  gender,
  document
) {
  return client
    .mutate({
      mutation: EditBasicInfoMutation,
      variables: {
        name,
        lastname,
        preferenceName,
        birthday,
        cellphone,
        terms,
        gender,
        document,
      },
    })

    .then((resp) => {
      return resp.data.editBasicInfo;
    });
}

export async function Me() {
  return client
    .query({
      query: MeQuery,
    })
    .then((resp) => {
      return resp.data.me;
    }); //.catch(e => console.log('error', e))
}

export async function UserInfo() {
  return client
    .query({
      query: UserInfoQuery,
    })
    .catch((e) => console.log("error", e))
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => console.log("error", e));
}
export async function registerAccessLog(deviceId) {
  return client
    .mutate({
      mutation: gql`
        mutation($deviceId: String!) {
          registerAccessLog(deviceId: $deviceId)
        }
      `,
      variables: { deviceId },
      fetchPolicy: "no-cache",
    })
    .catch((e) => console.log("error", e))
    .then((resp) => {
      return resp.data;
    })
    .catch((e) => console.log("error", e));
}

export async function UserNotifications() {
  return client
    .query({
      query: UserNotificationsQuery,
      fetchPolicy: "no-cache",
    })
    .catch((e) => console.log("error", e))
    .then((resp) => {
      return resp.data.user;
    })
    .catch((e) => console.log("error", e));
}

export async function SetUserNotificationViewed(key) {
  return client
    .mutate({
      mutation: SetNotificationViewedMutation,
      variables: { key },
    })
    .catch((e) => console.log("error", e))
    .then((resp) => {
      return resp.data.setNotificationViewed;
    })
    .catch((e) => console.log("error", e));
}

export function getProducts(filter, text) {
  return client
    .query({
      query: ProductsQuery,
      variables: { ...filter, text },
    })
    .catch((e) => console.log("error", e))
    .then((resp) => {
      return resp.data.products;
    });
}
export function customFilter(type) {
  return client
    .query({
      query: customFilterQuery,
      variables: { type },
    })
    .catch((e) => console.log("error", e))
    .then((resp) => {
      return resp.data.customFilter;
    });
}

export function toggleFavorite(productId) {
  return client
    .mutate({
      mutation: ToggleFavoriteMutation,
      variables: { productId },
    })
    .then((resp) => {
      return resp.data.toggleFavorite;
    }); //.catch(e => console.log('error', e))
}

export function getAddressByLatLong(lat, long) {
  return client
    .query({
      query: getAddressByLatLongQuery,
      variables: { lat, long },
    })
    .then((resp) => {
      return resp.data.getAddressByLatLong;
    });
}

export function getAddressBySearch(search) {
  return client
    .query({
      query: getAddressBySearcQuery,
      variables: { search },
    })
    .then((resp) => {
      return resp.data.getAddressBySearch;
    });
}

export function addAddress(body) {
  return client
    .mutate({
      mutation: addAddressMutation,
      variables: body,
    })
    .then((resp) => {
      return resp.data.addAddress;
    }); //.catch(e => console.log('error', e))
}

export function editAddress(key, body) {
  return client
    .mutate({
      mutation: editAddressMutation,
      variables: { ...body, key },
    })
    .then((resp) => {
      return resp.data.editAddress;
    }); //.catch(e => console.log('error', e))
}

export function removeAddress(key) {
  return client
    .mutate({
      mutation: removeAddressMutation,
      variables: { key },
    })
    .then((resp) => {
      return resp.data.removeAddress;
    });
}

export function uploadDocument(url, type) {
  return client
    .mutate({
      mutation: uploadDocumentMutation,
      variables: { url, type },
    })
    .then((resp) => {
      return resp.data.uploadDocument;
    });
}

export function forgotPassword(email) {
  return client
    .mutate({
      mutation: forgotMutation,
      variables: { email },
    })
    .then((resp) => {
      return resp.data.forgot;
    });
}

export function deliveryOptions(nOfProducts, takeMethod) {
  return client
    .query({
      query: deliveryOptionsQuery,
      variables: {
        nOfProducts,
        takeMethod,
      },
    })
    .then((resp) => {
      return resp.data.deliveryOptions;
    });
}

export function getLastPaymentId() {
  return client
    .query({
      query: getLastPaymentIdQuery,
    })
    .then((resp) => {
      return resp.data.getLastPaymentId;
    });
}

export function deliveryTaxes(takeType, leaveType, takeZipcode, leaveZipcode) {
  return client
    .query({
      query: deliveryTaxesQuery,
      variables: { leaveType, takeType, takeZipcode, leaveZipcode },
    })
    .then((resp) => {
      return resp.data.deliveryTaxes;
    });
}

export function paymentMethods() {
  return client
    .query({
      query: paymentMethodsQuery,
    })
    .then((resp) => {
      return resp.data.paymentMethods;
    });
}

export function createPaymentMethod(
  card_number,
  card_expiration_date,
  card_holder_name,
  card_cvv,
  card_document
) {
  return client
    .mutate({
      mutation: createPaymentMethodMutation,
      variables: {
        card_number,
        card_expiration_date,
        card_holder_name,
        card_cvv,
        card_document,
      },
    })
    .then((resp) => {
      return resp.data.createPaymentMethod;
    });
}
export function removePaymentMethod(key) {
  return client
    .mutate({
      mutation: removePaymentMethodMutation,
      variables: {
        key,
      },
    })
    .then((resp) => {
      return resp.data.removePaymentMethod;
    });
}
export function renewOrderM(key, payment) {
  return client
    .mutate({
      mutation: renewOrderMudation,
      variables: {
        key,
        payment,
      },
    })
    .then((resp) => {
      return resp.data.renewOrderOcurring;
    });
}

export function createOrder(
  productKeys,
  paymentKey,
  totalSumCart,
  cupomKey,
  takeDeliveryMethod,
  leaveDeliveryMethod,
  takeDeliveryAddressKey,
  leaveDeliveryAddressKey,
  productsOptions
) {
  return client
    .mutate({
      mutation: createOrderMutation,
      variables: {
        paymentKey,
        productKeys,
        totalSumCart,
        cupomKey,
        leaveDeliveryMethod,
        takeDeliveryMethod,
        takeDeliveryAddressKey,
        leaveDeliveryAddressKey,
        productsOptions,
      },
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data.createOrder;
    });
}

export function orders() {
  return client
    .query({
      query: ordersQuery,
    })
    .then((resp) => {
      return resp.data.orders;
    });
}

export function rememberMe(key) {
  return client
    .mutate({
      mutation: rememberMeMutation,
      variables: { key },
    })
    .then((resp) => {
      return resp.data.rememberMe;
    });
}
export function respondQuestion(deviceId, value) {
  return client
    .mutate({
      mutation: respondQuestionMutation,
      variables: { deviceId, value },
    })
    .then((resp) => {
      return resp.data.respondQuestionMutation;
    });
}
export function evaluateProduct(key, evaluation) {
  return client
    .mutate({
      mutation: evaluateProductMutation,
      variables: { key, evaluation },
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data.evaluateProduct;
    })
    .catch(console.log);
}

export function about() {
  return client
    .query({
      query: aboutQuery,
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data;
    })
    .catch(console.log);
}

export function updateVersion(currentVersion) {
  return client
    .query({
      query: updateVersionQuery,
      variables: { currentVersion },
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data.updateVersion;
    })
    .catch(console.log);
}

export function cupons() {
  return client
    .query({
      query: cuponsQuery,
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data;
    })
    .catch(console.log);
}

export function applyCupon(productSum, keys) {
  return client
    .mutate({
      mutation: applyCuponMutation,
      variables: { productSum, keys },
      fetchPolicy: "no-cache",
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data.applyCupon;
    })
    .catch(console.log);
}

export function quickSearchs() {
  return client
    .query({
      query: quickSearchsQuery,
      fetchPolicy: "no-cache",
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data ? resp.data.quickSearchs : null;
    })
    .catch(console.log);
}
export function anserwQuestion(key, answer) {
  return client
    .mutate({
      mutation: anserwQuestionMutation,
      fetchPolicy: "no-cache",
      variables: { key, answer },
    })
    .catch(console.log)
    .then((resp) => {
      return resp.data.anserwQuestion;
    })
    .catch(console.log);
}
