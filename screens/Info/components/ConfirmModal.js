import React, { useState } from "react";
import styled from "styled-components/native";
import Dice from "../../../components/Dice";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { H4, H3 } from "../../../components/Typography";
import { openLoginPopup } from "../../../store/actions/user";
import { closePopupModal } from "../../../store/actions/info";
import { Linking } from "react-native";
import { handleRemoveCurrentPayment } from "../../../store/actions/payments";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Line = styled.View`
  flex-flow: row;
  align-items: flex-start;
  justify-content: center;
`;

const Btn = styled.View`
  flex: 1 1 0px;
`;

export default () => {
  const dispatch = useDispatch();

  const { popup = {} } = useSelector((state) => state.info);
  const {
    callBack = () => {},
    title = undefined,
    description = undefined,
    cancelBtn = undefined,
    confirmBtn = undefined,
  } = popup.data ? popup.data : {};

  const remove = () => {
    callBack(true);
    dispatch(closePopupModal());
  };

  const cancel = () => {
    dispatch(closePopupModal());
    callBack(false);
  };

  return (
    <Container>
      {title && <H3 center>{title}</H3>}
      <Space n={1} />
      {description && (
        <H4 noBold center>
          {description}
        </H4>
      )}

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
    </Container>
  );
};
