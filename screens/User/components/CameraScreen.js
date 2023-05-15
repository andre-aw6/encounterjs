import React from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";
import { Camera } from "expo-camera";
import { useState } from "react";
import styled from "styled-components/native";
import { Button } from "../../../components/Button";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SpaceHorizontal } from "../../../components/Space";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
    padding: ${(props) => props.theme.space.space2};
`;

const Line = styled.View`
  width: 100%;
  flex-flow: row;
`;

export default (props) => {
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState();
  const [photo, setPhoto] = useState();

  const takeFoto = async () => {
    let photo = await camera.takePictureAsync();
    setPhoto(photo);
  };

  if (photo)
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={photo}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: [{ rotateY: "180deg" }],
          }}
        />
        <Screen>
          <Line>
            <Button
              flex
              onPress={() => setPhoto(null)}
              type="CallToAction-Outline"
            >
              Não curti
            </Button>
            <SpaceHorizontal n={2} />
            <Button
              onPress={() => props.confirmFoto && props.confirmFoto(photo)}
              flex
              type="CallToAction-Light"
            >
              Ficou top
            </Button>
          </Line>
        </Screen>
      </View>
    );

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}
    >
      <Camera style={{ flex: 1 }} type={type} ref={(ref) => setCamera(ref)}>
        <SafeAreaView flex={1}>
          <Screen>
            <Line>
              <Button
                onPress={() => takeFoto()}
                width="100%"
                type="CallToAction-Light"
              >
                Tirar foto
              </Button>
            </Line>
          </Screen>
        </SafeAreaView>
      </Camera>
    </TouchableWithoutFeedback>
  );
};
