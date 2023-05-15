import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  width: ${(props) => props.size * 16}px;
  height: ${(props) => props.size * 16}px;
  border-radius: ${(props) => props.size * 2}px;
  position: relative;
  margin-right: ${(props) => props.theme.space.space0};
  border: 0.5px solid ${(props) => props.theme.colors.warming};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.warming : "transparent"};
`;

const Pointer = styled.View`
  position: absolute;
  height: ${(props) => props.size * 4}px;
  width: ${(props) => props.size * 4}px;
  ${(props) => (props.top ? "top: " + props.top : "")};
  ${(props) => (props.left ? "left: " + props.left : "")};
  ${(props) => (props.right ? "right: " + props.right : "")};
  ${(props) => (props.bottom ? "bottom: " + props.bottom : "")};
  border-radius: ${(props) => props.size * 4}px;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.lightColor
      : props.theme.colors.warming};
`;

const topLeft = (size) => ({ top: `${size * 2}px`, left: `${size * 2}px` });
const topRight = (size) => ({ top: `${size * 2}px`, right: `${size * 2}px` });
const bottomLeft = (size) => ({
  bottom: `${size * 2}px`,
  left: `${size * 2}px`,
});
const bottomRight = (size) => ({
  bottom: `${size * 2}px`,
  right: `${size * 2}px`,
});
const middle = (size) => ({
  top: `${size * 6 - 0.5}px`,
  left: `${size * 6 - 0.5}px`,
});

const dices = [
  [middle],
  [topLeft, bottomRight],
  [topLeft, middle, bottomRight],
  [topLeft, topRight, bottomLeft, bottomRight],
  [topLeft, topRight, bottomLeft, bottomRight, middle],
];
export default (props) => (
  <Container
    {...props}
    onPress={() => props.onPress && props.onPress(props.number)}
  >
    {dices[props.number - 1].map((n, index) => (
      <Pointer key={index} {...props} {...n(props.size)} />
    ))}
  </Container>
);
