import React, { Component } from "react";
import styled, { withTheme } from "styled-components/native";
import {
  TouchableWithoutFeedback,
  Dimensions,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
// Keyboard.
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import LoginFlow from "./components/LoginFlow";
import { hideLoginPopup } from "../../store/actions/user";
import { Animated } from "react-native";

const Container = styled.KeyboardAvoidingView`
  background: ${(props) => props.theme.colors.lightColor};
  border-top-right-radius: 48px;
  border-top-left-radius: 48px;
`;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

class Login extends Component {
  state = {
    currentStep: 0,
    show: false,
    showAll: false,
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    if (this.props.user.loginPopup) this.open(!!this.props.user.loginPopup);
    // this.setState({ show: true })
  }

  open(show) {
    Animated.timing(this.state.opacity, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    clearInterval(this.timeout);
    this.setState({ show });
    if (!show)
      this.timeout = setTimeout(() => this.setState({ showAll: show }), 300);
    else this.setState({ showAll: show });
  }

  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (this.state.show !== !!prevProps.user.loginPopup)
      this.open(!!this.props.user.loginPopup);
    // this.setState({ show: !!prevProps.user.loginPopup })
    return true;
  }

  render() {
    const { showAll, show } = this.state;
    const { dispatch } = this.props;
    // if(!this.state.topAnimation)
    // return null
    if (!showAll) return null;

    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: this.state.opacity,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,.6)",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <Animatable.View
            duration={250}
            animation={show ? "fadeInUp" : "fadeOutDown"}
            style={{ flex: 1 }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                dispatch(hideLoginPopup());
                Keyboard.dismiss();
              }}
              style={{ flex: 1 }}
            >
              <View style={{ flex: 1 }}></View>
            </TouchableWithoutFeedback>
            <View>
              <Container behavior={"padding"}>
                <LoginFlow />
              </Container>
            </View>
          </Animatable.View>
        </KeyboardAvoidingView>
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withTheme(connect(mapStateToProps)(Login));
