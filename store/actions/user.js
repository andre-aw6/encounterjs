import * as Facebook from "expo-facebook";
import { openPopupModal } from "./info";
import {
  emailExists,
  createAuth,
  sendErros,
  registerAccessLog,
  UserInfo,
  confirmCode,
  Me,
  login as loginApi,
  editBasicInfo,
  toggleFavorite,
  uploadDocument,
  forgotPassword,
  resetPassword,
  confirmCodeResetPassword,
  UserNotifications,
  rememberMe,
  SetUserNotificationViewed,
  respondQuestion,
} from "../../graphql";
import * as Device from "expo-device";
import * as ImageManipulator from "expo-image-manipulator";
import storage from "../../utils/storage";
import * as Crypto from "expo-crypto";
import { setProducts } from "./product";
import * as Google from "expo-google-app-auth";
import { handleShowNotification } from "./notification";
import { arrayToObj } from "../../utils/helpers";
import { handleLogoutCart, handleLoginCart } from "./cart";
import { setAdresses } from "./address";
import { API_URI } from "../../graphql/client";
import config from "../../config";
import * as AppleAuthentication from "expo-apple-authentication";
import { Linking } from "react-native";

export const SHOW_LOGIN_POPUP = "SHOW_LOGIN_POPUP";
export const SET_LOGOUT_USER = "SET_LOGOUT_USER";
export const SET_NEED_COMPLETE_INFOS = "SET_NEED_COMPLETE_INFOS";
export const SET_LOGIN_USER = "SET_LOGIN_USER";
export const SET_IS_CODE_SENT = "SET_IS_CODE_SENT";
export const SET_IS_CHANGE_PASSWORD = "SET_IS_CHANGE_PASSWORD";
export const SET_EMAIL_LOGIN_PROCESS = "SET_EMAIL_LOGIN_PROCESS";
export const SET_LOGIN_LOADING = "SET_LOGIN_LOADING";
export const SET_ERROR_LOGIN_PROCESS_MESSAGE =
  "SET_ERROR_LOGIN_PROCESS_MESSAGE";
export const SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS =
  "SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS";

export const SET_AUTO_COMPLETE_REGISTER = "SET_AUTO_COMPLETE_REGISTER";
//FAVORITES
export const SET_USER_INFO = "SET_USER_INFO";
export const SET_USER_FAVORITES = "SET_USER_FAVORITES";
export const ADD_USER_FAVORITE = "ADD_USER_FAVORITE";
export const REMOVE_USER_FAVORITE = "REMOVE_USER_FAVORITE";

//LOCATION AND ADDRESS
// PENDENCES
export const SET_PENDENCES = "SET_PENDENCES";

// NOTIFICATIONS
export const SET_USER_NOTIFICATION = "SET_USER_NOTIFICATION";

// REMEMBER PRODUCTS
export const SET_USER_REMEMBER_PRODUCTS = "SET_USER_REMEMBER_PRODUCTS";
export const ADD_USER_REMEMBER_PRODUCTS = "ADD_USER_REMEMBER_PRODUCTS";
export const REMOVE_USER_REMEMBER_PRODUCTS = "REMOVE_USER_REMEMBER_PRODUCTS";

const platform = Device.modelName;
const os = Device.osName;

async function getUniqueDeviceId() {
  const deviceId = await storage.getItem("deviceId");
  if (deviceId) return deviceId.deviceId;
  const deviceIdNew = ("" + Math.random()).replace("0.", "");
  await storage.setItem("deviceId", { deviceId: deviceIdNew });
  return deviceIdNew;
}

export function hideLoginPopup() {
  return showLoginPopup(false);
}
export function openLoginPopup() {
  return showLoginPopup(true);
}

function showLoginPopup(show) {
  return {
    type: SHOW_LOGIN_POPUP,
    show,
  };
}

function setAutocompleteRegister(name, lastname) {
  return {
    type: SET_AUTO_COMPLETE_REGISTER,
    name,
    lastname,
  };
}

function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    userInfo,
  };
}

function setFavorites(favorites) {
  return {
    type: SET_USER_FAVORITES,
    favorites,
  };
}

function addUserFavorite(favorite) {
  return {
    type: ADD_USER_FAVORITE,
    favorite,
  };
}

function removeUserFavorite(favorite) {
  return {
    type: REMOVE_USER_FAVORITE,
    favorite,
  };
}

function setLoginUser(user) {
  return {
    type: SET_LOGIN_USER,
    user,
  };
}

function setNeedCompleteInfos(needCompleteInfos) {
  return {
    type: SET_NEED_COMPLETE_INFOS,
    needCompleteInfos,
  };
}

function setIsCodeSent(isCodeSent, isForgot) {
  return {
    type: SET_IS_CODE_SENT,
    isCodeSent,
    isForgot: !!isForgot,
  };
}

function setIsChangePassword(changePassword, code) {
  return {
    type: SET_IS_CHANGE_PASSWORD,
    changePassword,
    code,
  };
}

function setLoginLoading(loading) {
  return {
    type: SET_LOGIN_LOADING,
    loading,
  };
}

function setEmailLoginProcess(email, isLogin) {
  return {
    type: SET_EMAIL_LOGIN_PROCESS,
    email,
    isRegister: !isLogin,
    isLogin: isLogin,
  };
}

function setErroLoginProcessMessage(errorMessage) {
  return {
    type: SET_ERROR_LOGIN_PROCESS_MESSAGE,
    errorMessage,
  };
}

function setPendences(pendences) {
  return {
    type: SET_PENDENCES,
    pendences,
  };
}

function setUserNotification(notifications) {
  return {
    type: SET_USER_NOTIFICATION,
    notifications,
  };
}

function setUserRememberProducts(rememberProductKeys) {
  return {
    type: SET_USER_REMEMBER_PRODUCTS,
    rememberProductKeys,
  };
}

function addUserRememberProducts(key) {
  return {
    type: ADD_USER_REMEMBER_PRODUCTS,
    key,
  };
}

function removeUserRememberProducts(key) {
  return {
    type: REMOVE_USER_REMEMBER_PRODUCTS,
    key,
  };
}

export function hadleBackToLogin() {
  return {
    type: SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS,
  };
}

export function loginApple() {
  return async (dispatch) => {
    try {
      dispatch(setLoginLoading(true));
      const csrf = Math.random().toString(36).substring(2, 15);
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],

        state: csrf,
        nonce: hashedNonce,
      });

      const { fullName } = result;
      const { familyName, givenName } = fullName || {};
      if (givenName) dispatch(setAutocompleteRegister(givenName, familyName));
      dispatch(handleSocialLogin("apple", result.identityToken));
    } catch (e) {
      sendErros(JSON.stringify(e));
      dispatch(setLoginLoading(false));
      if (e.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }
  };
}

export function loginGoogle() {
  return async (dispatch) => {
    try {
      dispatch(setLoginLoading(true));

      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId:
          "589752160792-hb0jvq3kpdcspggblrpn54eppm2ludsb.apps.googleusercontent.com",
        androidClientId:
          "589752160792-4pnmc92bjvj44pritjg281i9d7gr8517.apps.googleusercontent.com",
        iosStandaloneAppClientId: config.login.googleSignIn.ios,
        androidStandaloneAppClientId: config.login.googleSignIn.android,
      });
      if (type == "success") {
        dispatch(handleSocialLogin("google", accessToken));
      } else {
        dispatch(setLoginLoading(false));
      }
    } catch (e) {
      dispatch(setLoginLoading(false));
    }
  };
}

export function loginFB() {
  return async (dispatch) => {
    dispatch(setLoginLoading(true));

    try {
      await Facebook.initializeAsync(config.facebookAppId);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        dispatch(handleSocialLogin("facebook", token));
      } else {
        dispatch(setLoginLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoginLoading(false));
    }
  };
}

export function handleSocialLogin(type, password) {
  return async (dispatch, getState) => {
    try {
      const token = await storage.getItem("NOTIFICATION_TOKEN");
      const notificationToken = token && token.token ? token.token : null;

      let result = await createAuth(
        type,
        "zeero@zeero.tech",
        password,
        platform,
        os,
        notificationToken
      );
      if (!result.success) {
        if (result.action == "CONFIRM_EMAIL") dispatch(setIsCodeSent(true));
      } else {
        await dispatch(handleUserData(result.token));
      }

      dispatch(setLoginLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(handleShowNotification("Ocorreu um erro", "danger"));
      dispatch(setLoginLoading(false));
    }
  };
}

export function handleSendPassword(password) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      const { login = {} } = user;
      dispatch(setLoginLoading(true));

      let result;

      const token = await storage.getItem("NOTIFICATION_TOKEN");
      const notificationToken = token && token.token ? token.token : null;

      if (login.isForgot) {
        result = await resetPassword(
          login.email,
          password,
          login.code,
          platform,
          os,
          notificationToken
        );
      } else if (login.isLogin) {
        result = await loginApi(
          "password",
          login.email,
          password,
          platform,
          os,
          notificationToken
        );
      } else if (login.isRegister) {
        result = await createAuth(
          "password",
          login.email,
          password,
          platform,
          os,
          notificationToken
        );
      }

      dispatch(setLoginLoading(false));

      if (!result.success) {
        if (result.action == "CONFIRM_EMAIL") dispatch(setIsCodeSent(true));
        if (login.isLogin)
          dispatch(setErroLoginProcessMessage("Senha incorretas"));
      } else {
        if (login.isForgot) dispatch(handleShowNotification("Senha alterada"));

        dispatch(handleUserData(result.token));
      }
    } catch (error) {
      console.log(error);
      dispatch(handleShowNotification("Ocorreu um erro", "danger"));
      dispatch(setLoginLoading(false));
    }
  };
}

export function handleSendConfirmCode(code) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { email, isForgot } = user.login;
    dispatch(setLoginLoading(true));

    const token = await storage.getItem("NOTIFICATION_TOKEN");
    const notificationToken = token && token.token ? token.token : null;

    const result = isForgot
      ? await confirmCodeResetPassword(code, email)
      : await confirmCode(email, code, platform, os, notificationToken);

    dispatch(setLoginLoading(false));

    if (!result.success) {
      dispatch(setErroLoginProcessMessage("Codigo incorreto"));
    } else {
      if (isForgot) {
        dispatch(setIsCodeSent(false, true));
        dispatch(setIsChangePassword(true, code));
      } else {
        dispatch(handleUserData(result.token));
      }
    }
  };
}

const USER_TOKEN = "USER_TOKEN";

function logout() {
  return {
    type: SET_LOGOUT_USER,
  };
}

function setLogged(user, action) {
  return (dispatch) => {
    dispatch(setLoginUser(user));
    dispatch(hideLoginPopup());

    if (action == "NEED_COMPLETE_INFOS") dispatch(setNeedCompleteInfos(true));
  };
}

export function handleEditUserInfo(
  name,
  lastname,
  preferenceName,
  birthday,
  cellphone,
  terms,
  gender,
  document
) {
  return async (dispatch, getState) => {
    const result = await editBasicInfo(
      name,
      lastname,
      preferenceName,
      birthday,
      cellphone,
      terms,
      gender,
      document
    );

    const { user } = getState();
    const { pendences = [] } = user;
    dispatch(setNeedCompleteInfos(false));

    if (!terms) dispatch(handleShowNotification("Dados alterados com sucesso"));

    dispatch(handleUserData());
  };
}

export function handleLogout(logoutBtn) {
  return (dispatch) => {
    dispatch(logout());
    dispatch(handleLogoutCart());
    storage.setItem(USER_TOKEN, null);
    if (logoutBtn) dispatch(handleShowNotification("Até logo!"));
  };
}

export function handleHideErrorCode() {
  return (dispatch) => {
    dispatch(setErroLoginProcessMessage(false));
  };
}

async function handleAccessLog() {
  const uniqueId = await getUniqueDeviceId();
  registerAccessLog(uniqueId);
}

export function handleUserData(token = null) {
  return async (dispatch) => {
    try {
      if (token) await storage.setItem(USER_TOKEN, { token });
      handleAccessLog();
      const me = await Me();

      dispatch(setLogged(me.user, me.action));
      dispatch(handleLoginCart());

      const { user, pendences } = await UserInfo();

      dispatch(setPendences(pendences));
      const favorites = user.favorites.map((u) => u.key);
      const rememberProductKeys = user.rememberProductKeys;

      dispatch(setProducts(arrayToObj(user.favorites)));

      dispatch(setUserInfo(user));

      dispatch(setFavorites(favorites));
      dispatch(setAdresses(arrayToObj(user.address)));
      dispatch(setUserRememberProducts(rememberProductKeys));

      const products = arrayToObj(user.favorites);

      dispatch(setProducts(products));
    } catch (error) {
      dispatch(handleLogout());
    }
  };
}

export function handleEmailAlreadyExists(email) {
  return async (dispatch) => {
    dispatch(setLoginLoading(true));

    const validateEmail = (email) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      dispatch(setLoginLoading(false));
      return dispatch(setErroLoginProcessMessage("E-mail inválido"));
    }

    const isLogin = await emailExists(email);
    dispatch(setEmailLoginProcess(email, isLogin));
    dispatch(setLoginLoading(false));
  };
}

export function handleToggleLike(productId) {
  return async (dispatch, getState) => {
    const { user } = getState();

    if (!user.isLogged) return dispatch(openPopupModal("LOGIN_POPUP"));

    const { userInfo = {} } = user;
    const { favorites = [] } = userInfo;

    const isAdd = !favorites.includes(productId);

    if (isAdd) {
      dispatch(addUserFavorite(productId));
    } else {
      dispatch(removeUserFavorite(productId));
    }

    try {
      await toggleFavorite(productId);

      if (isAdd)
        dispatch(handleShowNotification("Adicionado aos Meus Favoritos."));
      else dispatch(handleShowNotification("Removido dos Meus Favoritos."));
    } catch (error) {
      if (isAdd) dispatch(removeUserFavorite(productId));
      else dispatch(addUserFavorite(productId));
    }
  };
}

export function handleUploadSelfDocument(image) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { pendences = [] } = user;
    const SELF_WITH_DOCUMENT = "SELF_WITH_DOCUMENT";
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      image.uri,
      [{ resize: { width: 300 } }],
      { compress: 0.7, format: "jpeg" }
    );

    const { filename } = await upload(resizedPhoto.uri);

    const result = await uploadDocument(filename, SELF_WITH_DOCUMENT);

    if (result.success) {
      dispatch(setPendences(pendences.filter((c) => c !== SELF_WITH_DOCUMENT)));
    }
  };
}

export async function upload(uri) {
  let fileType = uri.substring(uri.lastIndexOf(".") + 1);

  let formData = new FormData();

  formData.append("image", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    return await fetch(API_URI + "/upload", options).then((response) =>
      response.json()
    );
  } catch (error) {
    console.log(error);
  }
}

export function handleUploadImage(file) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      const url = process.env.REACT_APP_API + "/upload";
      formData.append("image", file);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {},
        body: formData,
      });

      const { filename } = await response.json();

      return filename;
    } catch (error) {
      return false;
    }
  };
}

export function handleForgotPassword() {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { login = {} } = user;
    dispatch(setLoginLoading(true));

    const result = await forgotPassword(login.email);

    if (result.success) {
      dispatch(setIsCodeSent(true, true));
    } else {
      dispatch(
        handleShowNotification("Ocorreu um erro. Tente novamente.", "danger")
      );
    }
    dispatch(setLoginLoading(false));
  };
}

export function handleSetNotificationToken(token) {
  return (dispatch) => {
    storage.setItem("NOTIFICATION_TOKEN", { token });
  };
}

export function handleLoadNotifications() {
  return async (dispatch, getState) => {
    const { user } = getState();

    const { isLogged = false } = user;
    if (!isLogged) return;

    const { notifications } = await UserNotifications();

    dispatch(setUserNotification(notifications));
  };
}

export function handleSetNotificationViewed(key) {
  return async (dispatch, getState) => {
    const { user } = getState();
    const { isLogged = false } = user;
    if (!isLogged) return;

    const notifications = await SetUserNotificationViewed(key);
    dispatch(setUserNotification(notifications));
  };
}

export function handleRememberProduct(key) {
  return (dispatch, getState) => {
    const { user } = getState();
    const { isLogged = false, rememberProductKeys = [] } = user;

    if (!isLogged) return dispatch(openPopupModal("LOGIN_POPUP"));

    rememberMe(key);
    if (!rememberProductKeys.includes(key)) {
      dispatch(handleShowNotification("Aviso adicionado!"));
      dispatch(addUserRememberProducts(key));
    } else {
      dispatch(handleShowNotification("Aviso removido!"));
      dispatch(removeUserRememberProducts(key));
    }
  };
}

export function handleNotFoundProductSuggestion() {
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
          title: "Não encontrou o que procurava?",
          description: "Conta para a gente o que estava faltando aqui!",
          confirmBtn: "Enviar",
        })
      );
    });
  };
}

export function handleRespondQuestion(value) {
  return async (dispatch) => {
    const deviceID = await getUniqueDeviceId();
    respondQuestion(deviceID, value);
  };
}