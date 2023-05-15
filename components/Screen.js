import React from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import CartMarker from "../screens/Cart/components/CartMarker";
import { useSelector } from "react-redux";

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  height: 100%;
  width: 100%;
`;

export default (props) => {
  const cart = useSelector((state) => state.cart);
  const hasCart = cart.products.length !== 0 && !cart.renew;
  return (
    <Container>
      {props.noScroll ? (
        props.children
      ) : (
        <ScrollView style={{ flex: 1, background: "blue" }}>
          {props.children}
        </ScrollView>
      )}
      {hasCart && <CartMarker />}
    </Container>
  );
};
