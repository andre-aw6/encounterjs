import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleHideNotification, handleShowNotification } from "../../../store/actions/notification";
import { Animated, TouchableWithoutFeedback, Vibration, Platform } from "react-native";
import styled from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Constants from "expo-constants";
import * as Notifications from 'expo-notifications';
import { handleOpenNotification } from "../../../store/actions/shared";
import { handleLoadOrders } from "../../../store/actions/orders";

const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors[props.type]};
  padding-top: ${Platform.OS === "ios" ? Constants.statusBarHeight : 8}px;
  padding-bottom: ${(props) => props.theme.space.space1};
  border-radius: 8px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`;

const Notification = styled.View`
  min-height: ${(props) => props.theme.sizes.notification};
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Message = styled.Text`
  font-family: Nunito-Bold;
  font-size: ${(props) => props.theme.sizes.subtitle2};
  color: ${(props) =>
    props.type === "success"
      ? props.theme.colors.darkColor
      : props.theme.colors.lightColor};
`;

const AppNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const [bottom] = useState(new Animated.Value(-200));

  useEffect(() => {
    console.log("Notification show state changed:", notification.show);

    if (notification.show) {
      setTimeout(() => Vibration.vibrate(), 400);
    }

    const show = notification.show ? 0 : -200;

    Animated.timing(bottom, {
      toValue: show,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [notification.show]);

  useEffect(() => {
    console.log("Registering notification listener");
    
    Notifications.addListener(handleNotification);

    return () => {
      console.log("Unregistering notification listener");
      Notifications.removeAllListeners();
    };
  }, []);

  const handleNotification = (notification) => {
    console.log("Received notification:", notification);

    if (notification.data.action && notification.data.action.includes("order")) {
      dispatch(handleLoadOrders());
    }

    if (notification.origin === "received") {
      dispatch(
        handleShowNotification({
          text: notification.data.body,
          action: notification.data.action,
          key: notification.data.key,
        })
      );
    }

    if (notification.origin === "selected") {
      openNotification(
        notification.data ? notification.data.key : undefined,
        notification.data ? notification.data.action : undefined
      );
    }
  };

  const hideNotification = () => {
    dispatch(handleHideNotification());
    openNotification(notification.notificationKey, notification.notificationAction);
  };

  const openNotification = (key, action) => {
    if (key) {
      dispatch(handleOpenNotification(key, action));
    } else {
      dispatch(handleHideNotification());
    }
  };

  const type = notification.type || "success";

  return (
    <Animated.View
      style={{
        top: bottom,
        position: "absolute",
        left: 0,
        zIndex: 999,
        width: "100%",
      }}
    >
      <TouchableWithoutFeedback onPress={() => hideNotification()}>
        <Container type={type}>
          <Notification>
            <Message type={type}>{notification.notificationText}</Message>
          </Notification>
        </Container>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default AppNotification;