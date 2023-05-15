import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";
import { Space } from "../../components/Space";
import { H1, H4, H2, Subtitle2 } from "../../components/Typography";
import { Image } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Constants from "expo-constants";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import CameraScreen from "./components/CameraScreen";
import { useNavigation } from "@react-navigation/native";
import { handleUploadSelfDocument } from "../../store/actions/user";

const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-left: ${(props) => props.theme.space.space3};
  padding-right: ${(props) => props.theme.space.space3};
  padding-top: ${(props) =>
    Platform.OS == "ios"
      ? Constants.statusBarHeight + "px"
      : props.theme.space.space2};
  padding-bottom: ${getBottomSpace() + 24 + "px"};
  background: ${(props) => props.theme.colors.lightColor};
`;

const Line = styled.View`
  width: 100%;
  flex-flow: row;
  align-items: center;
`;

const Icon = styled.View`
    min-height: 20px;
    width: ${(props) => props.theme.space.space2};
    margin-right: ${(props) => props.theme.space.space1};
`;

const ImageContent = styled.View`
  flex: 1;
  min-height: 88px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  padding-bottom: ${(props) => props.theme.space.space2};
`;

const ButtonsRow = styled.View`
  flex-flow: row;
  justify-content: flex-end;
`;

const ScreenOne = (props) => {
  const navigation = useNavigation();

  return (
    <MainContainer>
      <Content>
        <Space n={5} />
        <H2>
          <H2 noBold>
            Para que você consiga efetuar seu primeiro aluguel, precisaremos de
            uma{" "}
          </H2>
          foto sua (selfie) segurando seu RG ou CNH ou RNE.
        </H2>

        <Space n={3} />
        <Line>
          <Icon>
            <Image
              resizeMode={"contain"}
              style={{ width: 20, height: 20 }}
              source={require("../../assets/img/dado.png")}
            />
          </Icon>
          <Subtitle2 type="secondDarkColor">
            Este é um procedimento de segurança que você precisará fazer apenas
            uma vez.
          </Subtitle2>
        </Line>

        <Space n={2} />
        <Line>
          <Icon>
            <Image
              resizeMode={"contain"}
              style={{ width: 20, height: 20 }}
              source={require("../../assets/img/dado.png")}
            />
          </Icon>
          <Subtitle2 type="secondDarkColor">
            Procure um lugar iluminado e não cubra seu rosto com o documento.
          </Subtitle2>
        </Line>

        <Space n={4} />
        <ImageContent>
          <Image
            resizeMode={"contain"}
            style={{ height: "100%", maxWidth: "75%" }}
            source={require("../../assets/img/selfie.png")}
          />
        </ImageContent>
        <Space n={4} />
      </Content>
      <Footer>
        <ButtonsRow>
          <Button
            width="100%"
            disable={props.loading}
            type="CallToAction-Light"
            onPress={() => props.onCameraPress()}
          >
            Abrir câmera
          </Button>
        </ButtonsRow>

        <Space n={2} />
        <ButtonsRow>
          <Button
            width="100%"
            disable={props.loading}
            type="CallToAction-Outline"
            onPress={() => navigation.goBack()}
          >
            Agora não
          </Button>
        </ButtonsRow>
      </Footer>
    </MainContainer>
  );
};

const ScreenTwo = (props) => {
  const navigation = useNavigation();

  return (
    <MainContainer>
      <Content>
        <Space n={3} />
        <H2 noBold>
          Estamos analisando sua foto e em breve você receberá um retorno pelo
          e-mail e aplicativo.
        </H2>
        <Space n={3} />
        <H2 noBold>
          Enquanto isso, <H2>você pode fazer seu pedido de aluguel.</H2>
        </H2>

        <Space n={3} />
        <Line>
          <Icon>
            <Image
              resizeMode={"contain"}
              style={{ width: 20, height: 20 }}
              source={require("../../assets/img/dado.png")}
            />
          </Icon>
          <Content>
            <Subtitle2 type="secondDarkColor">
              Assim que aprovarmos o seu cadastro, seu pedido será logo
              efetuado.
            </Subtitle2>
          </Content>
        </Line>

        <Space n={4} />
        <ImageContent>
          <Image
            resizeMode={"contain"}
            style={{ height: "100%", maxWidth: "60%" }}
            source={require("../../assets/img/selfie-2.png")}
          />
        </ImageContent>
        <Space n={4} />
      </Content>
      <Footer>
        <ButtonsRow>
          <Button
            width="100%"
            disable={props.loading}
            type="CallToAction-Light"
            onPress={() => props.onOkClick()}
          >
            Ok
          </Button>
        </ButtonsRow>
      </Footer>
    </MainContainer>
  );
};
export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [camera, setOpenCamera] = useState();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState();

  const openCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === "granted") setOpenCamera(true);
  };

  const addPhoto = (photo) => {
    setLoading(true);
    setOpenCamera(false);

    dispatch(handleUploadSelfDocument(photo)).then((_) => {
      setOk(true);
    }); //.then(_ => { setLoading(false) })
  };

  const onOkClick = () => navigation.goBack();

  if (ok)
    return (
      <ScreenTwo onOkClick={onOkClick} onCameraPress={() => openCamera()} />
    );

  return (
    <Animatable.View
      animation="fadeIn"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {!camera ? (
        <ScreenOne loading={loading} onCameraPress={() => openCamera()} />
      ) : (
        <CameraScreen confirmFoto={(photo) => addPhoto(photo)} />
      )}
    </Animatable.View>
  );
};
