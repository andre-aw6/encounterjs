import React from "react";
import styled from "styled-components/native";

export const H1 = styled.Text`
  font-family: Nunito-Bold;
  font-size: ${(props) => props.theme.sizes.h1};
  color: ${(props) => {
    if (!props.type) return props.theme.colors.darkColor;
    return props.theme.colors[props.type];
  }};
`;

export const H2 = styled.Text`
  font-family: ${(props) => (props.noBold ? "Nunito" : "Nunito-Bold")};
  font-size: ${(props) => props.theme.sizes.h2};
  color: ${(props) => {
    if (!props.type) return props.theme.colors.darkColor;
    return props.theme.colors[props.type];
  }};
  ${(props) => (props.center ? "text-align: center;" : "")};
`;

export const H3 = styled.Text`
  font-family: Nunito-Bold;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => {
    if (!props.type) return props.theme.colors.darkColor;
    return props.theme.colors[props.type];
  }};
  ${(props) => (props.flex ? "flex: 1;" : "")};
  ${(props) => (props.center ? "text-align: center;" : "text-align: left;")};
`;

export const H4 = styled.Text`
    ${(props) => (props.flex ? "flex: 1;" : "")};
    font-family: Nunito;
    ${(props) => (props.center ? "text-align: center;" : "")};
    font-size: ${(props) => props.theme.sizes.h4};
    color: ${(props) => {
      if (!props.type) return props.theme.colors.darkColor;
      return props.theme.colors[props.type];
    }};
`;

export const Subtitle1 = styled.Text`
    font-family: Nunito;
    font-size: ${(props) => props.theme.sizes.subtitle1};
    color: ${(props) => {
      if (props.color) return props.color;
      if (!props.type) return props.theme.colors.darkColor;
      return props.theme.colors[props.type];
    }};
    ${(props) => (props.center ? "text-align: center;" : "")};
    text-decoration: ${(props) => (props.underline ? "underline" : "none")};
    text-decoration-color: ${(props) =>
      props.color ? props.color : props.theme.colors.darkColor};
`;

export const Subtitle2 = styled.Text`
    font-family:  ${(props) => (props.bold ? "Nunito-Bold" : "Nunito")};
    font-size: ${(props) => props.theme.sizes.subtitle2};
    color: ${(props) => {
      if (props.color) return props.color;
      if (!props.type) return props.theme.colors.darkColor;
      return props.theme.colors[props.type];
    }};
    ${(props) => (props.flex ? "flex: 1;" : "")};    
    text-decoration: ${(props) => (props.underline ? "underline" : "none")};   
    text-decoration-color: ${(props) => {
      if (props.color) return props.color;
      if (!props.type) return props.theme.colors.darkColor;
      return props.theme.colors[props.type];
    }};
    ${(props) => (props.center ? "text-align: center;" : "")};
    ${(props) => (props.width ? "width: " + props.width : "")};
    ${(props) => (props.right ? "text-align: right;" : "")} ;
`;

export const Subtitle3 = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.subtitle3};
  color: ${(props) => {
    if (!props.type) return props.theme.colors.darkColor;
    return props.theme.colors[props.type];
  }};
  ${(props) => (props.center ? "text-align: center;" : "")};
`;

export const Button1Text = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.button1};
  color: ${(props) => props.theme.colors.darkColor};
`;

export const Button2Text = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.button2};
  color: ${(props) => props.theme.colors.darkColor};
`;

export const Button3Text = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.button3};
  color: ${(props) => props.theme.colors.darkColor};
`;

export const Button4Text = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.button4};
  color: ${(props) => props.theme.colors.darkColor};
`;
