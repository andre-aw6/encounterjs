import React, { useState } from "react";
import styled from "styled-components/native";
import Dice from "../../../components/Dice";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { H4, H3 } from "../../../components/Typography";
import { openLoginPopup } from "../../../store/actions/user";
import { closePopupModal } from "../../../store/actions/info";
import { Linking, KeyboardAvoidingView, Keyboard } from "react-native";
import { handleRemoveCurrentPayment } from "../../../store/actions/payments";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TextInput = styled.TextInput`
  height:40px;
  width: 100%;
  border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
  background: ${(props) => props.theme.colors.primaryLightColor};
  padding-left: ${(props) => props.theme.space.space2};
  padding-right: ${(props) => props.theme.space.space2};
  border-radius: ${(props) => props.theme.borderRadius.button};
  font-size: ${(props) => props.theme.space.space2};
 `;

const Line = styled.View`
  flex-flow: row;
  align-items: flex-start;
  justify-content: center;
`;

const Btn = styled.View`
  flex: 1;
`;

export default () => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const { popup = {} } = useSelector((state) => state.info);
  const {
    callBack = () => {},
    title = undefined,
    description = undefined,
    cancelBtn = undefined,
    confirmBtn = undefined,
  } = popup.data ? popup.data : {};

  const remove = () => {
    callBack(text);
    dispatch(closePopupModal());
  };

  const cancel = () => {
    dispatch(closePopupModal());
    callBack(false);
  };

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      {/* <KeyboardAvoidingView behavior="padding"> */}
      {title && <H3 center>{title}</H3>}
      <Space n={1} />
      {description && (
        <H4 noBold center>
          {description}
        </H4>
      )}

      <Space n={1} />

      <View style={{ width: "100%" }}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <Space n={2} />
      <Line>
        <Btn>
          <Button onPress={cancel} type="CallToAction-Outline" width={"auto"}>
            {cancelBtn ? cancelBtn : "Cancelar"}
          </Button>
        </Btn>
        <SpaceHorizontal n={4} />
        <Btn>
          <Button onPress={remove} type="ComplementButton-Big" width={"auto"}>
            {confirmBtn ? confirmBtn : "Sim, excluir"}
          </Button>
        </Btn>
      </Line>
      {/* </KeyboardAvoidingView> */}
    </Container>
  );
};
