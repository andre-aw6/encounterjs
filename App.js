import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Platform,
} from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { registerForPushNotificationsAsync } from './utils/expoNotifications';
import "react-native-gesture-handler";
import theme from "./styles/theme";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import MainNavigation from "./navigation/MainTabNavigator";
import Login from "./screens/Login/Login";
import * as Font from "expo-font";
import InfoModal from "./screens/Info/InfoModal";
import Popup from "./screens/Info/Popup";
import { handleInitApp } from "./store/actions/shared";
import AppNotification from "./screens/Notifications/components/AppNotification";
import {
  handleSetExpoPushToken,
} from "./store/actions/user";
import { Image } from "react-native-animatable";
import config from "./config";
import NeedUpdate from "./screens/NeedUpdate/NeedUpdate";
import * as Notifications from "expo-notifications";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.lightColor};
  padding-top: ${(props) =>
    Platform.OS === "ios" ? props.theme.space.space4 : 0};
`;

const LoadView = styled.View`
  background-color: ${(props) => props.theme.colors.primaryDarkColor};
`;

const askNotification = async (dispatch) => {
  console.log("registering for push notifications...");
  const { granted = false } = await Notifications.getPermissionsAsync();
  if (granted) {
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    console.log("setting notification token...");
    dispatch(handleSetExpoPushToken(token));
  } else {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;
      console.log("setting notification token...");
      dispatch(handleSetExpoPushToken(token));
    }
  }
};

const App = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);

  const handleAppInit = async () => {
    console.log("initializing app...");
    await askNotification(dispatch);
    try {
      dispatch(handleInitApp());
      console.log("app initialized!");
      setAlreadyLoaded(true);
    } catch (error) {
      console.log(error);
      setAlreadyLoaded(true);
    }
  };

  useEffect(() => {
    handleAppInit();
  }, []);

  if (appState.update && appState.update.show) {
    console.log("rendering NeedUpdate screen...");
    return (
      <Container>
        <NeedUpdate />
      </Container>
    );
  }

  if (!alreadyLoaded) {
    console.log("loading fonts and assets...");
    return (
      <LoadView>
        <Image
          resizeMode={"contain"}
          style={{ width: "100%", height: "100%" }}
          source={config.splash}
        />
      </LoadView>
    );
  }

  console.log("rendering app...");
  return (
    <>
      <StatusBar
        barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"}
      />
      <MainNavigation />
      <InfoModal />
      <AppNotification />
      <Popup />
      <Login />
    </>
  );
};

const loadFonts = async (setAlreadyLoaded) => {
  console.log("loading fonts...");
  try {
    await Font.loadAsync({
      Nunito: require("./assets/fonts/Nunito-Regular.ttf"),
      "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
    });
    console.log("fonts loaded!");
    setAlreadyLoaded(true);
  } catch (error) {
    console.log(error);
  }
};

const AppProvider = () => {
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);

  useEffect(() => {
    loadFonts(setAlreadyLoaded);
  }, []);

  if (!alreadyLoaded) {
    console.log("waiting for fonts to load...");
    return <View />;
  }

  console.log("rendering app provider...");
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;