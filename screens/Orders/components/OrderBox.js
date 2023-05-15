import React from "react";
import InformationBox from "../../../components/InformationBox";
import styled, { withTheme } from "styled-components/native";
import { Box } from "../../../components/Box";
import { H3, Subtitle2, H4 } from "../../../components/Typography";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { currencyFormat } from "../../../utils/helpers";
import {
  handleSelectOrder,
  handleOpenOrderHelp,
} from "../../../store/actions/orders";
import NotLoggedBox from "../../User/components/NotLoggedBox";
import { openInfoModal, openPopupModal } from "../../../store/actions/info";
import { translation } from "../../../texts";
import config from "../../../config";
import RenewCartInfo from "../../Cart/components/RenewCartInfo";
import { renewOrder } from "../../../store/actions/cart";

const Line = styled.View`
  flex: 1;
  flex-flow: ${(props) => props.flexFlow || "row"};
  justify-content: flex-start;
  width: 100%;
`;

const Price = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const Hr = styled.View`
  background: ${(prop) => prop.theme.colors.secondLightColor};
  height: 1px;
  width: 100%;
  flex: 1;
`;

export default withTheme((props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { order } = props;
  const canRenew = order.canRenew;

  const openOrderDetails = (key) => {
    // dispatch here
    dispatch(handleSelectOrder(key));
    navigation.navigate("Billing");
  };

  const help = () => {
    dispatch(handleOpenOrderHelp(order.key));
  };

  const renew = () => {
    dispatch(renewOrder(order.key, order.products, order.rentDays));
  };

  return (
    <React.Fragment>
      <Box>
        <Line>
          <H3>{order.status}</H3>
        </Line>

        <Space n={1} />

        <Line flexFlow="column">
          {config.rentTimeBox && (
            <React.Fragment>
              <Subtitle2 color={props.theme.colors.secondDarkColor}>
                Tempo de {translation("orders.order").toLowerCase()}:{" "}
                {order.rentDays} dias
              </Subtitle2>
              <Space n={0} />
            </React.Fragment>
          )}

          <Subtitle2 color={props.theme.colors.secondDarkColor}>
            {translation("orders.order")} #{order.key.toUpperCase()}
          </Subtitle2>
        </Line>

        <Space n={0} />
        <Hr />
        {/**/}
        <Space n={1} />
        {order.products.map((product, index) => (
          <React.Fragment key={index}>
            <Line flexFlow="column">
              <H4>{product.name}</H4>
            </Line>
            <Space n={1} />
          </React.Fragment>
        ))}

        <Hr />

        <Space n={2} />
        <Line>
          {canRenew ? (
            <Button
              type="CallToAction-Light-Small2"
              flex
              onPress={() => renew()}
            >
              Renovar
            </Button>
          ) : (
            <Button
              type="CallToAction-Outline-Flex"
              flex
              onPress={() => help()}
            >
              Ajuda
            </Button>
          )}

          <SpaceHorizontal n={2} />
          <Price>
            <H3>{currencyFormat(order.total)}</H3>
          </Price>
        </Line>
        <Space n={2} />
        <Line>
          <Button
            type="CallToAction-Outline-Flex"
            flex
            onPress={() => openOrderDetails(order.key)}
          >
            Detalhes
          </Button>
          {canRenew && (
            <>
              <SpaceHorizontal n={2} />
              <Button
                type="CallToAction-Outline-Flex"
                flex
                onPress={() => help()}
              >
                Ajuda
              </Button>
            </>
          )}
        </Line>
      </Box>
    </React.Fragment>
  );
});
