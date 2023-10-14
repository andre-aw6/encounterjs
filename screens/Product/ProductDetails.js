import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import ProductStatus from "./components/ProductStatus";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../components/Button";
import { Badge } from "../../components/Badge";
import Dice from "../../components/Dice";
import Carrossel from "../../components/Carrossel";
import { useSelector, useDispatch } from "react-redux";
import ScreePopup from "../../components/ScreePopup";
import VideoPlayerScreen from "./components/VideoPlayer";
import { Image, Dimensions, ScrollView } from "react-native";

import {
  handleAddProduct,
  handleLoadDeliveryMethods,
  handleRemoveProduct,
} from "../../store/actions/cart";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { H2, Subtitle3 } from "../../components/Typography";
import { Space } from "../../components/Space";
import {
  handleToggleLike,
  handleRememberProduct,
} from "../../store/actions/user";
import { useNavigation } from "@react-navigation/native";
import { handleOpenEvaluationProduct } from "../../store/actions/product";
import config from "../../config";
import Icons from "../../components/Icons";

const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  padding-top: 0;
  width: 100%;
  min-height: 100%;
`;
const Tags = styled.View`
  width: 100%;
  flex-flow: row;
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.space.space1};
`;

const Line = styled.View`
  flex-flow: row;
  width: 100%;
  height: auto;
`;

const MainLine = styled.View`
  flex: 1;
`;

const ToolBar = styled.View`
    flex-flow: row;
    margin-top: ${(props) => props.theme.space.space2}
    margin-bottom: ${(props) => props.theme.space.space2};
    
    align-items: center;;
    justify-content: flex-start;
    position: relative;
`;

const Dices = styled.View`
    flex-flow: row;
    align-items: center;
    flex: 1
    margin-right: ${(props) => props.theme.space.space3}
`;

const DicesNumber = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.colors.secondDarkColor};
  margin-left: ${(props) => props.theme.space.space0};
`;
const Icon = styled.TouchableOpacity`
    padding-right: ${(props) => props.theme.space.space1}
    align-items:center;
    justify-content: center;
`;
const Price = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.darkColor};
  text-align: right;
  font-family: Nunito-Bold;
`;

const VideoPlayer = styled.TouchableOpacity`
  flex-flow: row;
  margin-top: ${(props) => props.theme.space.space2};
  align-items: center;
  height: 24px;
`;
const VideoPlayerText = styled.Text`
  font-size: 12px;
  font-family: Nunito;
  margin-left: ${(props) => props.theme.space.space1};
  color: ${(props) => props.theme.colors.secondDarkColor};
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.colors.secondDarkColor};
`;

const Description = styled.View`
  margin-top: ${(props) => props.theme.space.space2};
  font-family: Nunito;
`;

const CarrosselContainer = styled.View`
  height: ${(props) =>
    Math.floor(
      Dimensions.get("window").height * props.theme.elements.productDetailsImage
    )}px;
  ${(props) =>
    props.isPlaceholder &&
    `
    align-items: center;
    justify-content: center;`}
`;

const Header = styled.View`
  padding: ${(props) => props.theme.space.space2};
`;
const ButtonContent = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.space.space2};
  padding-top: 0;
`;

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userInfo = {}, rememberProductKeys = [] } = useSelector(
    (state) => state.user
  );
  const { products: productsOnCart = {} } = useSelector((state) => state.cart);
  const { favorites = [] } = userInfo;
  const products = useSelector((state) => state.products.products);
  const currentProductKey = useSelector(
    (state) => state.products.currentProductKey
  );
  const product = products[currentProductKey];

  const isFavorite = favorites.includes(currentProductKey);
  const onCart = productsOnCart.find((p) => p == currentProductKey);
  const [currentImage, setCurrentImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const h2Size = +props.theme.sizes.h2.replace("px", "");

  if (!product) return <H2>Carregando...</H2>;
  if (!product.isLoad === false)
    return (
      <ScreePopup noScroll>
        <Container>
          <Placeholder style={{ flex: 1 }} Animation={Fade}>
            <CarrosselContainer isPlaceholder>
              <PlaceholderMedia size={"100%"} />
            </CarrosselContainer>
            <Space n={1} />

            <PlaceholderLine noMargin height={h2Size * 2} />
            <Space n={1} />
            <PlaceholderLine noMargin height={h2Size} />
            <Space n={1} />
            <PlaceholderLine noMargin height={32} />
            <Space n={3} />
            <ScrollView flex={1}>
              <PlaceholderLine height={h2Size} />
              <PlaceholderLine height={h2Size} />
              <PlaceholderLine height={h2Size} />
              <PlaceholderLine height={h2Size} width={20} />
            </ScrollView>
          </Placeholder>
        </Container>
      </ScreePopup>
    );


  const tags_ = [
    product.age,
    ...(config.hideNumberOfPlayers ? [] : [product.numberOfPlayersFormated]),
    product.matchTimeAverageFormated,
    product.complexity,
    product.language,

    ...(product.categories || []),
    ...(product.tags || []),
  ].filter((value) => value && value !== "--");

  const addProduct = () => {
    dispatch(handleLoadDeliveryMethods());
    dispatch(
      handleAddProduct(
        product.key,
        [...product.categories, ...product.tags].filter(
          (value) => value !== "--"
        )
      )
    ).then((option) => option && navigation.goBack());
  };

  const getButton = () => {
    if (!product.available) {
      if (rememberProductKeys.includes(product.key))
        return (
          <Button
            type={"ComplementButton-Big"}
            onPress={() => dispatch(handleRememberProduct(product.key))}
          >
            Cancelar aviso
          </Button>
        );

      return (
        <Button
          type={"ComplementButton-Outline"}
          onPress={() => dispatch(handleRememberProduct(product.key))}
        >
          Me avise quando disponível
        </Button>
      );
    }

    return onCart ? (
      <Button
        type={"ComplementButton-Big"}
        onPress={() => dispatch(handleRemoveProduct(product.key))}
      >
        Remover da sacola
      </Button>
    ) : (
      <Button type={"CallToAction-Light"} onPress={() => addProduct()}>
        {" "}
        <Icons name="handbag" size={16} color="white" />
        {"  "}Adicionar à sacola
      </Button>
    );
  };

  return (
    <ScreePopup noScroll>
      {showVideo && (
        <VideoPlayerScreen
          video={product.video}
          onBackgroundPress={() => setShowVideo(false)}
        />
      )}

      <ScrollView>
        <Container>
          <CarrosselContainer>
            <Carrossel
              stepperDown
              padding={32}
              noMargin
              current={currentImage}
              onCurrentChange={(n) => setCurrentImage(n)}
            >
              {(product.images || [product.mainImage]).map((image, index) => (
                <Image
                  key={index}
                  resizeMode={"contain"}
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: image }}
                />
              ))}
            </Carrossel>
          </CarrosselContainer>
          <Space n={1} />
          <Line>
            {config.favorites && (
              <Icon
                onPress={() => dispatch(handleToggleLike(currentProductKey))}
              >
                <Ionicons
                  name={isFavorite ? "ios-heart" : "ios-heart-empty"}
                  color={props.theme.colors.darkColor}
                  size={18}
                />
              </Icon>
            )}
            <H2>{product.name}</H2>
          </Line>

          <Space n={1} />
          <Line style={{ alignItems: "center" }}>
            <MainLine>
              <ProductStatus available={product.available} />
            </MainLine>
            {product.priceValueFormated && (
              <Price>{product.priceValueFormated}</Price>
            )}
          </Line>
          {config.evaluation && (
            <React.Fragment>
              <Space n={1} />
              <Line>
                <MainLine>
                  <Dices>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Dice
                        size={1}
                        isSelected={product.evaluation >= i}
                        key={i}
                        number={i}
                      />
                    ))}
                    {product.numberOfEvaluation > 0 && (
                      <DicesNumber>
                        {product.numberOfEvaluation}{" "}
                        {product.numberOfEvaluation == 1
                          ? "avaliação"
                          : "avaliações"}
                      </DicesNumber>
                    )}
                  </Dices>
                </MainLine>
                <Button
                  type={"CallToAction-Orange-Small"}
                  onPress={() =>
                    dispatch(handleOpenEvaluationProduct(product.key))
                  }
                >
                  Avaliar
                </Button>
              </Line>
            </React.Fragment>
          )}

          {product.video && (
            <VideoPlayer onPress={() => setShowVideo(true)}>
              <MaterialCommunityIcons
                size={24}
                color={props.theme.colors.darkColor}
                name="play-circle"
              />
              <VideoPlayerText>Vídeo do jogo</VideoPlayerText>
            </VideoPlayer>
          )}

          <Tags>
            {tags_.map((i, index) => (
              <Badge isSelected={true} key={index}>
                {i}
              </Badge>
            ))}
          </Tags>

          <Description>
            {(product.description || "").split("</br>").map((d, i) => (
              <Subtitle3 key={i} type="secondDarkColor">
                {d}
              </Subtitle3>
            ))}
          </Description>
        </Container>
      </ScrollView>
      <ButtonContent>{getButton()}</ButtonContent>
    </ScreePopup>
  );
};

export default withTheme(ProductDetails);
