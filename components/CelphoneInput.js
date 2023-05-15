import React, { useState } from "react";
import styled from "styled-components/native";
import Numberpad from "./Numberpad";

const Content = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  zindex: 999;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.lightColor};
`;

const ContentInput = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.space.space2};
  align-items: center;
  justify-content: center;
`;

const ContainerInputs = styled.ScrollView`
  flex: 1;
`;

const CustomInput = styled.TouchableOpacity`
    border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
    background: ${(props) => props.theme.colors.primaryLightColor};
    padding-left: ${(props) => props.theme.space.space3};
    border-radius: ${(props) => props.theme.borderRadius.button};
    height: 56px;
    width: 100%;
    justify-content: center;
`;

const CustomInputText = styled.Text`
    font-size: ${(props) => props.theme.space.space2};
    opacity: ${(props) => (props.disabled ? ".5" : "1")};
    color: ${(props) => props.theme.colors.secondColor};
`;

export default () => {
  const [typing, setTyping] = useState(false);
  const [content, setContent] = useState("");

  const addText = (t) => {
    setContent(content + t);
  };

  if (!typing)
    return (
      <CustomInput onPress={() => setTyping(true)}>
        <CustomInputText>(xx) xxxxx-xxxx</CustomInputText>
      </CustomInput>
    );

  return (
    <Content flex={1}>
      <ContentInput flex={1}>
        <CustomInput>
          {/* <CustomInputText>{content.length == 0 ? '(ddd) xxxxx-xxxx' : content} </CustomInputText> */}
        </CustomInput>
      </ContentInput>
      <Numberpad onPress={(n) => addText(n)} />
    </Content>
  );
};
