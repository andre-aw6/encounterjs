import React from "react";
import styled, { withTheme } from "styled-components/native";

import Circle from "../../../components/Circle";
import { Entypo, AntDesign, EvilIcons } from "@expo/vector-icons";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Image, View, Dimensions } from "react-native";
import { H3, Subtitle2, H4 } from "../../../components/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { handleSetCartChoseAddress } from "../../../store/actions/shared";
import {
  handleSelectModeAddress,
  handleSelectAddressDefault,
} from "../../../store/actions/cart";

const Hr = styled.View`
  background: ${(props) => props.theme.colors.secondLightColor};
  height: 1.5px; ;
`;

const Line = styled.View`
  flex-flow: row;
  align-items: center;
`;

const AddressItem = styled.TouchableOpacity`
  flex-flow: row;
  width: 100%;
  margin-top: ${(props) => props.theme.space.space3};
`;

const AddressSelect = styled.View`
  padding-top: 2px;
`;

const Address = styled.View`
  flex: 1;
`;

const ImageContent = styled.View`
  height: 32px;
  width: 32px;
`;
// const Arrow = styled.TouchableOpacity`
//     height: 100%:
//     width: 32px;
//     backgroundColor: red;
// `
const Arrow = styled.TouchableOpacity`
  height: 100%;
  width: 32px;
`;

export default withTheme((props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { adresses = {} } = useSelector((state) => state.address);

  const { delivery = {} } = cart;
  const { type } = props;
  const title = type == "take" ? "Entrega" : "Devolução";
  const selected = delivery[type].selected || {};
  const deliveryOptions = delivery[type].deliveryOptions || [];
  const currentAddress =
    selected && selected.key ? adresses[selected.key] : undefined;

  const chooseAddress = (mode) => {
    dispatch(handleSetCartChoseAddress(type, mode));
    navigation.navigate("Address");
  };

  const chooseType = (mode, needAddAddress) => {
    if ((selected && selected.key) || !needAddAddress) {
      dispatch(handleSelectModeAddress(type, mode));
    } else {
      const other = type == "take" ? "leave" : "take";
      if (
        !(selected && selected.key) &&
        delivery[other].selected &&
        delivery[other].selected.key
      ) {
        dispatch(handleSelectAddressDefault(type, mode));
      } else {
        dispatch(handleSetCartChoseAddress(type, mode));
        navigation.navigate("Address");
      }
    }
  };

  const formatAddress = (text) => {
    if (!text) return <Subtitle2>{text}</Subtitle2>;

    const textSplited = text.split("-");

    if (textSplited.length <= 1) return <Subtitle2>{text}</Subtitle2>;

    return (
      <Subtitle2>
        <Subtitle2 bold>{textSplited[0]}</Subtitle2>
        {textSplited.slice(1).join("-")}
      </Subtitle2>
    );
  };

  return (
    <React.Fragment>
      <Space n={2} />
      <Line>
        <ImageContent>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../../assets/img/map.png")}
          />
        </ImageContent>
        <SpaceHorizontal n={1} />
        <H3 type="secondDarkColor">{title}</H3>
      </Line>

      {deliveryOptions.map((delivery, key) => (
        <AddressItem
          key={key}
          onPress={() => chooseType(delivery.type, delivery.needAddAddress)}
        >
          <AddressSelect>
            <Circle isSelected={selected.type == delivery.type} />
          </AddressSelect>
          <Address>
            <Line>
              <Subtitle2
                bold={selected.type == delivery.type}
                flex
                type={
                  selected.type == delivery.type
                    ? "primaryDarkColor"
                    : "darkColor"
                }
              >
                {delivery.name}
              </Subtitle2>

              {delivery.needAddAddress && selected && !selected.key && (
                <Subtitle2 bold>Adicionar endereço</Subtitle2>
              )}
            </Line>
            <Space n={1} />

            <Line>
              <Subtitle2 type="secondDarkColor">
                {delivery.description}
              </Subtitle2>
            </Line>

            {delivery.needAddAddress &&
              selected.type == delivery.type &&
              currentAddress && (
                <View>
                  <Space n={1} />
                  {formatAddress(currentAddress.addressFormated)}
                </View>
              )}
          </Address>
          {delivery.needAddAddress && (
            <Arrow onPress={() => chooseAddress(delivery.type)}>
              <EvilIcons
                name="chevron-right"
                color={props.theme.colors.darkColor}
                size={32}
              />
            </Arrow>
          )}
        </AddressItem>
      ))}

      <Space n={2} />
      <Hr />
    </React.Fragment>
  );
});
