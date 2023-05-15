import React from "react";
import styled, { withTheme } from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

// padding: 13px;
const Button_ = styled.TouchableOpacity`
  justify-content: center;
  padding-left: ${(props) => props.paddingSides};
  padding-right: ${(props) => props.paddingSides};
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.button};
  border: 1.5px solid ${(props) => props.borderColor};
  background-color: ${(props) =>
    props.isOutline ? "transparent" : props.background};
  opacity: ${(props) => (props.disabled ? ".5" : 1)};
`;

export const Text = styled.Text`
  font-size: ${(props) => props.fontSize};
  font-family: Nunito;
  color: ${(props) =>
    props.isOutline ? props.textColorIsOutline : props.textColor};
`;

function getConfigs(theme, type) {
  if (type == "CallToAction")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.darkColor,
      borderColor: theme.colors.darkColor,
      width: "100%",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.h2,
    };
  if (type == "CallToAction-Orange")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.warming,
      borderColor: theme.colors.warming,
      width: "100%",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.h2,
    };
  if (type == "CallToAction-Small")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.darkColor,
      borderColor: theme.colors.darkColor,
      width: "auto",
      height: theme.sizes.btnSmall,
      paddingSides: theme.space.space1,
      fontSize: theme.sizes.subtitle2,
    };
  if (type == "CallToAction-Orange-Small")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.warming,
      borderColor: theme.colors.warming,
      width: "auto",
      height: theme.sizes.btnSmall,
      paddingSides: theme.space.space1,
      fontSize: theme.sizes.subtitle2,
    };
  if (type == "CallToAction-Light-Small2")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.primaryDarkColor,
      borderColor: theme.colors.primaryDarkColor,
      width: "100%",
      height: theme.sizes.btnSmall,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };
  if (type == "CallToAction-Light-Small")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.primaryDarkColor,
      borderColor: theme.colors.primaryDarkColor,
      width: "100%",
      height: theme.sizes.btn,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };
  if (type == "CallToAction-Light")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.primaryDarkColor,
      borderColor: theme.colors.primaryDarkColor,
      width: "100%",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.h2,
    };

  if (type == "CallToAction-Outline")
    return {
      // isOutline: true,
      textColorIsOutline: theme.colors.secondDarkColor,
      textColor: theme.colors.secondDarkColor,
      background: theme.colors.lightColor,
      borderColor: theme.colors.secondColor,
      width: "auto",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };
  if (type == "CallToAction-Outline-Flex")
    return {
      isOutline: true,
      textColorIsOutline: theme.colors.secondDarkColor,
      textColor: theme.colors.secondDarkColor,
      background: theme.colors.secondColor,
      borderColor: theme.colors.secondColor,
      width: "100%",
      height: theme.sizes.btn,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };

  if (type == "ComplementButton")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.complementColor,
      borderColor: theme.colors.complementColor,
      height: theme.space.space4,
      paddingSides: theme.space.space1,
      fontSize: theme.sizes.subtitle2,
    };

  if (type == "CallToAction-Primary-Color")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.primaryDarkColor,
      borderColor: theme.colors.primaryDarkColor,

      height: theme.space.space4,
      paddingSides: theme.space.space1,
      height: theme.sizes.btn,
      fontSize: theme.sizes.subtitle1,
    };

  if (type == "ComplementButton-Medium")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.complementColor,
      borderColor: theme.colors.complementColor,
      height: theme.space.space4,
      paddingSides: theme.space.space1,
      height: theme.sizes.btn,
      fontSize: theme.sizes.subtitle1,
    };

  if (type == "ComplementButton-Big")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.complementColor,
      borderColor: theme.colors.complementColor,
      width: "auto",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };

  if (type == "ComplementButton-Orange-Big")
    return {
      textColorIsOutline: theme.colors.lightColor,
      textColor: theme.colors.lightColor,
      background: theme.colors.warming,
      borderColor: theme.colors.warming,
      width: "auto",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };
  if (type == "ComplementButton-Outline")
    return {
      isOutline: true,
      textColorIsOutline: theme.colors.complementColor,
      textColor: theme.colors.complementColor,
      background: theme.colors.complementColor,
      borderColor: theme.colors.complementColor,
      width: "auto",
      height: theme.sizes.btnBig,
      paddingSides: theme.space.space3,
      fontSize: theme.sizes.subtitle1,
    };
}

export const Button = withTheme((props) => {
  return (
    <Button_
      {...getConfigs(props.theme, props.type)}
      {...props}
      onPress={() => !props.disabled && props.onPress && props.onPress()}
    >
      <Text
        isOutline={props.isOutline}
        {...getConfigs(props.theme, props.type)}
      >
        {props.children}
      </Text>
    </Button_>
  );
});

const SocialButton_ = styled.TouchableOpacity`
  height: 48px;
  border-radius: 24px;
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  justify-content: center;
  flex-flow: row;
  align-items: center;
  background: ${(props) => props.backgroundColor};
  opacity: ${(props) => (props.disabled ? ".5" : 1)};
`;
const SocialButtonText = styled.Text`
  font-family: Nunito;
  font-size: 16px;
  color: ${(props) => props.theme.colors.lightColor};
`;

export const SocialButton = (props) => (
  <SocialButton_ {...props}>
    <FontAwesome
      name={props.icon}
      size={16}
      color="white"
      style={{ marginRight: 6 }}
    />
    <SocialButtonText>{props.children}</SocialButtonText>
  </SocialButton_>
);
