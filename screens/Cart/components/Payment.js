import React, { useEffect } from "react";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { H4, Subtitle2, H3 } from "../../../components/Typography";
import styled, { withTheme } from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import HideInfo from "../../../components/HideInfo";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { handleSetCartChosePayment } from "../../../store/actions/shared";
import { handleLoadPaymentMethods } from "../../../store/actions/payments";

const Line = styled.View`
  flex-flow: row;
  align-items: center;
`;

const Title = styled.View`
  flex: 1;
  padding-right: 8px;
`;

const SelectPayment = styled.TouchableOpacity`
  flex-flow: row;
`;

export default withTheme((props) => {
  const { payment = undefined } = useSelector((state) => state.cart);
  const { paymentMethods } = useSelector((state) => state.payments);

  useEffect(() => {
    if (!paymentMethods) dispatch(handleLoadPaymentMethods());
  }, [paymentMethods]);
  const methods = paymentMethods || [];
  const cardNumber = methods.find((p) => p.key == payment)
    ? methods.find((p) => p.key == payment).card_number
    : undefined;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addPayment = () => {
    dispatch(handleSetCartChosePayment());
    navigation.navigate("Payments");
  };

  return (
    <React.Fragment>
      <Space n={2} />
      <H3 type="secondDarkColor">Pagamento</H3>
      <Space n={2} />
      <Line>
        <Title>
          <H4>Pagamento via app</H4>
        </Title>
        {!!cardNumber ? (
          <SelectPayment onPress={() => addPayment()}>
            <EvilIcons
              name="credit-card"
              color={props.theme.colors.darkColor}
              size={24}
            />

            <SpaceHorizontal n={0} />
            <HideInfo n={4} />
            <SpaceHorizontal n={0} />
            <Subtitle2 bold>{cardNumber}</Subtitle2>
          </SelectPayment>
        ) : (
          <SelectPayment onPress={() => addPayment()}>
            <Subtitle2 bold>Adicionar cartão</Subtitle2>
            <EvilIcons
              name="chevron-right"
              color={props.theme.colors.darkColor}
              size={24}
            />
          </SelectPayment>
        )}
      </Line>
    </React.Fragment>
  );
});
