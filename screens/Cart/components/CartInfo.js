import React, { Component } from "react";
import { Subtitle2, H3, H4 } from "../../../components/Typography";
import styled, { withTheme } from "styled-components/native";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { View, Dimensions } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useSelector, useDispatch, connect } from "react-redux";
import { currencyFormat } from "../../../utils/helpers";
import {
  handleRemoveProductConfirmModal,
  handleCheckOut,
} from "../../../store/actions/cart";
import { openLoginPopup } from "../../../store/actions/user";
import { Modalize } from "react-native-modalize";

import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box } from "../../../components/Box";
import Constants from "expo-constants";
import Delivery from "./Delivery";
import {
  handleSetCartChoseAddress,
  handleSetCartChosePayment,
} from "../../../store/actions/shared";
import Payment from "./Payment";
import { translation } from "../../../texts";
import config from "../../../config";
import { handleOpenCart } from "../../../store/actions/cart";

const Line = styled.View`
  flex: 1;
  flex-flow: row;
  align-items: center;
`;

const Title = styled.View`
  flex: 1;
  padding-right: 8px;
`;

const Remove = styled.TouchableOpacity`
    margin-right: ${(props) => props.theme.space.space1};
    justify-content:center;
    width: 24px;
    height: 24px;
`;
const LineProducts = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${(props) => props.theme.sizes.h1};
`;

const CupomContent = styled.View`
    margin: 4px;
    padding: ${(props) => props.theme.space.space2};
    padding-top: ${(props) => props.theme.space.space1};
    padding-bottom: ${(props) => props.theme.space.space1};
    background: ${(props) => props.theme.colors.lightColor};
    border-radius: ${(props) => props.theme.borderRadius.button};
    shadow-color: ${(props) => props.theme.shadow.shadowColor};
    shadow-offset: ${(props) => props.theme.shadow.shadowOffset.width} ${(
  props
) => props.theme.shadow.shadowOffset.width} ;
    shadow-opacity: ${(props) => props.theme.shadow.shadowOpacity};
    shadow-radius: ${(props) => props.theme.shadow.shadowRadius}px;
    elevation: ${(props) => props.theme.shadow.elevation};
`;

const Hr = styled.View`
  background: ${(props) => props.theme.colors.secondLightColor};
  height: 1.5px;
  width: 100%;
`;

const Cupom = ({ cupom }) => {
  return (
    <React.Fragment>
      <Space n={2} />
      <H3 type="secondDarkColor">Cupom de desconto</H3>
      <Space n={2} />
      <CupomContent>
        {cupom ? <H4>{cupom.title}</H4> : <H4>Sem cupom disponível</H4>}
      </CupomContent>

      <Space n={2} />
      <Hr />
    </React.Fragment>
  );
};

class _Products extends Component {
  render() {
    const { products, sizes, theme, renew } = this.props;
    const { dispatch } = this.props;
    const removeProduct = (key) => {
      dispatch(handleRemoveProductConfirmModal(key));
      // navigation.navigate('ProductDetails')
    };

    const size = (key) => {
      if (sizes[key]) return <H3>{sizes[key]} - </H3>;
      return "";
    };

    return (
      <View>
        {!renew && <Space n={2} />}
        <H3 type="secondDarkColor">
          {renew ? "Renovação de aluguel" : translation("orders.products")}
        </H3>
        <Space n={2} />
        {products.map((product, index) => (
          <React.Fragment key={product.key}>
            <LineProducts>
              {!renew && (
                <Remove onPress={() => removeProduct(product.key)}>
                  <AntDesign
                    color={theme.colors.danger}
                    name="closecircleo"
                    size={24}
                  />
                </Remove>
              )}

              <Title>
                <H4 numberOfLines={1}>
                  {size(product.key)}
                  {product.name}
                </H4>
              </Title>
              <H4>
                {product.priceValueFormated
                  ? product.priceValueFormated
                  : currencyFormat(product.priceValue)}
              </H4>
            </LineProducts>
            <Space n={0} />
          </React.Fragment>
        ))}

        {products.length == 0 && (
          <Subtitle2 type="secondColor">Carrinho vazio</Subtitle2>
        )}

        <Space n={2} />
        <Hr />
      </View>
    );
  }
}

function mapStateToProps2({ cart, products }) {
  const { sizes = {} } = cart;

  return {
    products: (cart.products || []).map((key) => products.products[key]),
    sizes,
  };
}

const Products = withTheme(connect(mapStateToProps2)(_Products));

const Billing = ({ renew, subtotal, deliveryTaxes, total, cupom }) => {
  return (
    <View>
      <Space n={2} />

      {!renew && (
        <>
          <Line>
            <Title>
              <H4 type="secondDarkColor">Subtotal</H4>
            </Title>
            <H4>{currencyFormat(subtotal)}</H4>
          </Line>

          <Space n={1} />
          <Line>
            <Title>
              <H4 type="secondDarkColor">Taxa de entrega</H4>
            </Title>
            <H4 type="secondDarkColor">
              {deliveryTaxes == undefined
                ? "a calcular"
                : currencyFormat(deliveryTaxes)}
            </H4>
          </Line>

          <Space n={1} />

          <Line>
            <Title>
              <H4 type="secondDarkColor">Cupom de desconto</H4>
            </Title>
            <H4 type="primaryDarkColor">
              {cupom && cupom.discount ? currencyFormat(cupom.discount) : "-"}
            </H4>
          </Line>

          <Space n={1} />
        </>
      )}

      <Line>
        <Title>
          <H3>Total</H3>
        </Title>
        <H3>{total != undefined ? currencyFormat(total) : "-"}</H3>
      </Line>

      <Space n={2} />
      <Hr />
    </View>
  );
};

const Disclaimer = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const keepBuying = () => {
    dispatch(handleOpenCart(false));
    navigation.navigate("Início");
  };
  return (
    <React.Fragment>
      <View style={{ margin: 4 }}>
        <Box>
          <Line>
            <H3 flex type="secondDarkColor">
              {translation("cart.rentTimeBox.title")}
            </H3>
            {props.time && (
              <H3>
                {translation("cart.rentTimeBox.time", { time: props.time })}
              </H3>
            )}
          </Line>

          <Space n={2} />

          {props.products.length <= 1 && (
            <React.Fragment>
              <Line>
                <H4 flex type="secondDarkColor">
                  {translation("cart.rentTimeBox.description")}
                </H4>
              </Line>
              <Space n={2} />
            </React.Fragment>
          )}

          <Button type="CallToAction-Outline-Flex" onPress={() => keepBuying()}>
            {translation("cart.rentTimeBox.button")}
          </Button>
        </Box>
      </View>

      <Hr />
    </React.Fragment>
  );
};

const DisclaimerRenew = (props) => {
  return (
    <React.Fragment>
      <View>
        <Box>
          <Line>
            <H3 flex type="secondDarkColor">
              Tempo de renovação do aluguel
            </H3>
            {props.time && <H3>+{props.time} dias</H3>}
          </Line>
        </Box>
      </View>

      <Hr />
      <Space n={2} />
    </React.Fragment>
  );
};

const CartInfo = () => {
  const cart = useSelector((state) => state.cart);
  const navigation = useNavigation();
  const { isLogged = false, pendences = [] } = useSelector(
    (state) => state.user
  );
  const {
    renew,
    products = [],
    subtotal = 0,
    delivery = {},
    sizes = {},
    deliveryTaxes = undefined,
    total = undefined,
    cupom = undefined,
    time = undefined,
    isLoading = false,
    payment = undefined,
  } = cart;
  const hasLeave = !!(delivery["leave"] && delivery["leave"].deliveryOptions);
  const dispatch = useDispatch();

  let button = {
    action: () =>
      dispatch(handleCheckOut()).then((r) => {
        if (r) navigation.navigate("Billing");
      }),
    text: translation("orders.orderAction"),
  };

  if (!isLogged) {
    button = {
      action: () => dispatch(openLoginPopup()),
      text: "Entrar ou cadastrar",
    };
  } else {
    if (renew) {
      button = {
        action: () =>
          dispatch(handleCheckOut()).then((r) => {
            if (r) navigation.navigate("Billing");
          }),
        text: "Renovar",
      };
      if (!payment)
        button = {
          action: () => {
            dispatch(handleSetCartChosePayment());
            navigation.navigate("Payments");
          },
          text: "Adicionar cartão",
        };
    } else {
      if (pendences.length > 0) {
        button = {
          action: () => navigation.navigate("SelfUpload"),
          text: "Terminar cadastro",
        };
      } else if (
        !delivery ||
        !delivery["take"].selected ||
        !delivery["take"].selected.type
      ) {
        button = {
          action: () => {
            const deliveryOptions = delivery["take"].deliveryOptions || [];
            dispatch(
              handleSetCartChoseAddress("take", deliveryOptions[0].type)
            );
            navigation.navigate("Address");
          },
          text: "Adicionar endereço de entrega ",
        };
      } else if (
        (!delivery ||
          !delivery["leave"].selected ||
          !delivery["leave"].selected.type) &&
        hasLeave
      ) {
        button = {
          action: () => {
            const deliveryOptions = delivery["leave"].deliveryOptions || [];
            dispatch(
              handleSetCartChoseAddress("leave", deliveryOptions[0].type)
            );
            navigation.navigate("Address");
          },
          text: "Adicionar endereço de devolução",
        };
      } else if (!payment)
        button = {
          action: () => {
            dispatch(handleSetCartChosePayment());
            navigation.navigate("Payments");
          },
          text: "Adicionar cartão",
        };
    }
  }

  return (
    <View style={{ minHeight: "100%", paddingBottom: 16 }}>
      <Content style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renew && <DisclaimerRenew time={time} />}
        {!renew && (
          <>
            {isLogged && config.rentTimeBox && (
              <Disclaimer products={products} time={time} />
            )}
            {isLogged && <Delivery type="take" />}

            {isLogged && hasLeave && <Delivery type="leave" />}

            {isLogged && <Cupom cupom={cupom} />}
          </>
        )}

        <Products renew={renew} />

        <Billing renew={renew} {...{ subtotal, deliveryTaxes, total, cupom }} />

        {isLogged && <Payment />}

        {!isLogged && config.rentTimeBox && (
          <React.Fragment>
            <Space n={2} />
            <Disclaimer products={products} time={time} />
          </React.Fragment>
        )}

        {!isLogged && <Space n={5} />}
      </Content>

      {!isLogged && (
        <React.Fragment>
          <Subtitle2 type={"secondDarkColor"} center>
            {translation("cart.notLogged")}
          </Subtitle2>
          <Space n={3} />
        </React.Fragment>
      )}
      <Line>
        {renew && (
          <>
            <Button
              type="CallToAction-Outline"
              disabled={isLoading}
              onPress={() => dispatch(handleOpenCart(false))}
            >
              Cancelar
            </Button>
            <SpaceHorizontal n={2} />
          </>
        )}
        <Button
          flex
          type="CallToAction-Light"
          disabled={isLoading}
          onPress={button.action}
        >
          {button.text}
        </Button>
      </Line>

      <SafeSpace />
    </View>
  );
};

//
const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  padding-top: 0;
  background: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Header = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space.space2};
  background-color: ${(props) => props.theme.colors.lightColor};
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
  width: 100%;
`;

const CloseButton = styled.View`
    position: absolute;
    top:${(props) => props.theme.space.space2};
    left: ${(props) => props.theme.space.space2};
    background-color: ${(props) => props.theme.colors.lightColor};
    height: 100%;
    width: 40px
    justify-content: center;
    align-items:flex-start;
`;

const Content = styled.View`
  width: 100%;
`;

const SafeSpace = styled.View`
  height: ${getBottomSpace()}px;
  width: 100%;
`;

class InfoModal extends Component {
  componentDidMount() {
    if (this.props.show && !this.modalRef.state.isVisible) {
      this.modalRef.open();
    }
  }

  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (prevProps.show && !this.modalRef.state.isVisible) {
      this.modalRef.open();
    }
    if (!prevProps.show && this.modalRef.state.isVisible) {
      this.modalRef.close();
    }
    return true;
  }
  render() {
    const renew = this.props.renew;
    const height =
      Dimensions.get("window").height - (32 + Constants.statusBarHeight);
    const { dispatch, theme } = this.props;
    return (
      <Modalize
        modalStyle={{ backgroundColor: theme.colors.lightColor }}
        onClosed={() => dispatch(handleOpenCart(false))}
        HeaderComponent={() => (
          <Header
            {...this.renderprops}
            onPress={() => dispatch(handleOpenCart(false))}
          >
            <CloseButton>
              <Entypo
                name="chevron-thin-down"
                color={theme.colors.darkColor}
                size={16}
              />
            </CloseButton>
            <H3 center>{translation("cart.cartName")}</H3>
          </Header>
        )}
        ref={(ref) => (this.modalRef = ref)}
        adjustToContentHeight={renew}
        modalHeight={!renew ? height : undefined}
      >
        <Container behavior="padding">
          <Space n={3} />

          <View style={{ height: "auto", width: "100%" }}>
            <CartInfo />
          </View>
        </Container>
        {/* */}
      </Modalize>
    );
  }
}

function mapStateToProps({ info, cart }) {
  return {
    show: !!info.showCart,
    renew: !!(cart && cart.renew),
  };
}

export default withTheme(connect(mapStateToProps)(InfoModal));
