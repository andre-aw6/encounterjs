import React from "react";
import styled from "styled-components/native";
import { Space, Bottom } from "../../components/Space";
import { H1, H4, H3 } from "../../components/Typography";
import { Image, Linking } from "react-native";
import { Button } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  startOnboarding,
  handleLoginOnboard,
} from "../../store/actions/onboarding";
import { API_URI } from "../../graphql/client";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { handleCancelUpdate } from "../../store/actions/app";

const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-left: ${(props) => props.theme.space.space3};
  padding-right: ${(props) => props.theme.space.space3};
  padding-top: ${(props) =>
    Platform.OS == "ios"
      ? Constants.statusBarHeight + "px"
      : props.theme.space.space2};
`;

const TextLine = styled.View`
  width: 100%;
  flex-flow: row;
  margin-bottom: ${(props) => props.theme.space.space2};
`;

const TextItemList = styled.View`
  width: 20px;
  align-items: flex-start;
  justify-content: center;
`;

const TextItemListIcon = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.primaryDarkColor};
`;

const TextContent = styled.Text`
  flex: 1;
  flex-flow: row;
`;

const ImageContent = styled.View`
  flex: 1;
  min-height: 88px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const PaddingTop = styled.View`
  height: ${(props) =>
    Platform.OS == "ios"
      ? Constants.statusBarHeight + "px"
      : props.theme.space.space2};
  width: 100%;
`;

const Content = styled.View`
  flex: 1;
`;

const Footer = styled.View``;

const ButtonsRow = styled.View`
  flex-flow: row;
  justify-content: flex-end;
`;

export default function UpdateScreen() {
  const { update } = useSelector((state) => state.app);
  if (!update) return null;

  console.log("Update info:", update);

  const { title, texts, btnCancel, btnText, img, link } = update;
  const dispatch = useDispatch();
  const onNext = () => {
    Linking.canOpenURL(link)
      .then((supported) => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.log("Cannot open URL");
        }
      })
      .catch((error) => console.log("Error opening URL:", error));
  };
  const onCancel = () => {
    dispatch(handleCancelUpdate());
  };
  return (
    <MainContainer>
      <Content>
        <Space n={3} />
        <H1>{title}</H1>
        <Space n={3} />
        {texts.map((text, i) => (
          <TextLine key={i}>
            <TextContent>
              {text
                .split("*")
                .map((text, index) =>
                  index % 2 == 0 ? (
                    <H4 key={index}>{text}</H4>
                  ) : (
                    <H3 key={index}>{text}</H3>
                  )
                )}
            </TextContent>
          </TextLine>
        ))}

        <Space n={4} />
        <ImageContent>
          <Image
            resizeMode={"contain"}
            style={{ height: "100%", width: "75%" }}
            source={{ uri: img }}
          />
        </ImageContent>
      </Content>
      <Footer>
        <Space n={4} />

        <ButtonsRow>
          <Button width={"100%"} type="CallToAction-Light" onPress={onNext}>
            {btnText}
          </Button>
        </ButtonsRow>

        {btnCancel && (
          <>
            <Space n={2} />
            <ButtonsRow>
              <Button
                width={"100%"}
                onPress={onCancel}
                type="CallToAction-Outline"
              >
                {btnCancel}
              </Button>
            </ButtonsRow>
          </>
        )}
      </Footer>
      <Bottom />
    </MainContainer>
  );
}