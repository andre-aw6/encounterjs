import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Space, Bottom } from '../../../components/Space';
import { H1, H4, H3, Subtitle2 } from '../../../components/Typography';
import { Image, View } from 'react-native';
import { Button } from '../../../components/Button';
import { RadioButton } from '../../../components/RadioButton';
import { setSelectQuestionToggleOnboarding } from '../../../store/actions/onboarding';
import { useDispatch, useSelector } from 'react-redux';
import { API_URI } from '../../../graphql/client';
import OptionWithImage from '../../../components/OptionWithImage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { handleRespondQuestion } from '../../../store/actions/user';


const Container = styled.View`
    flex: 1;
    width: 100%;
    position:relative;
    padding-left: ${props => props.theme.space.space3};
    padding-right: ${props => props.theme.space.space3};
`;

const Content = styled.ScrollView`
flex-grow: 1;
`;

const PaddingTop = styled.View`
height:  ${props => Platform.OS == "ios" ? Constants.statusBarHeight + 'px' :props.theme.space.space2 };
width: 100%;
`;

const ImageContent = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const Itens = styled.ScrollView`
    flex-grow: 1;
`;

const ButtonSpace = styled.View`
  height: ${props => props.theme.sizes.btnBig};
`;

const ButtonWrap = styled.View`
  background-color: ${props => props.theme.colors.lightColor};
  border-radius: ${props => props.theme.borderRadius.button};
`;

const Footer = styled.View`
    width: 100%;
    position:absolute;
    bottom:0;
    left: ${props => props.theme.space.space3};
`;

const Tags = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
`;

const KnowInfo = styled.TouchableOpacity`
    flex-flow: row;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Line = styled.View`
    flex-flow: row;
`;


export default withTheme((props) => {
  
  const [select, setSelect] = useState()
  const dispatch = useDispatch();

  const next = () => {
    dispatch(handleRespondQuestion(select))
    props.onNext()
  }
  const options = [
      {
          "text": "Mídias sociais da Zeero",
          "image": API_URI + "/midias_zeero.png",
          "value": "1"
        },
        {
          "text": "Mídias sociais de outros",
          "image":  API_URI +"/midias_outras.png",
          "value": "2"
        },
        {
          "text": "Indicação de amigos ou família",
          "image":  API_URI +"/indicacao.png",
          "value": "3"
        },
        {
          "text": "Outra forma",
          "image":  API_URI +"/outro.png",
          "value": "4"
        },
  ]
      
  return (
      <Container>
          <Content showsVerticalScrollIndicator={false}  >
            <PaddingTop />
            <Space n={3} />
            <H1 color="secondDarkColor">Antes de conhecer o app...</H1>
            <Space n={3} />
            <H4 color="secondDarkColor">...só de curiosidade, <H3 color="secondDarkColor">como chegou até aqui?</H3></H4>
            <Space n={3} />
            <Itens>
                {
                  options.map((option, key) => <OptionWithImage
                  key={key}
                  {...option}
                  isActive={select == option.value}
                  onPress={() => setSelect(option.value)}
              />
              )}
            </Itens>    
            <ButtonSpace />  
          
            <Bottom />
          </Content>
          
          <Footer>
              <Space n={2} />
              <ButtonWrap>
                <Button disabled={!select} type="CallToAction-Light" width={"100%"} onPress={next}>Continuar</Button>
              </ButtonWrap>
          <Bottom />
          </Footer>
          
      </Container>)
}

)