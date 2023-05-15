import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Space, Bottom } from '../../components/Space';
import { H1, H4, H3, Subtitle2, Subtitle1 } from '../../components/Typography';
import { Image, View, Platform } from 'react-native';
import { Button } from '../../components/Button';
import { RadioButton } from '../../components/RadioButton';
import { setSelectQuestionToggleOnboarding } from '../../store/actions/onboarding';
import { useDispatch, useSelector } from 'react-redux';
import { API_URI } from '../../graphql/client';
import Constants from 'expo-constants';
import { quickSearchs } from '../../graphql';
import { handleAnswer } from '../../store/actions/quickSearch';


const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${props => props.theme.colors.lightColor};
    padding-left: ${props => props.theme.space.space3};
    padding-right: ${props => props.theme.space.space3};
    padding-top: ${props => Platform.OS == "ios" ? Constants.statusBarHeight + 'px' : props.theme.space.space2};
`;

const Content = styled.View`
flex: 1;
`;

const ImageContent = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`;

const Footer = styled.View`
    width: 100%;
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

const Cancel = styled.TouchableOpacity``;



export default ({ quickSearch }) => {

    const dispatch = useDispatch()

    const answer = (value) => {
        dispatch(handleAnswer(quickSearch.key))
    } 

    const { options = [] } = quickSearch
    return (
        <Container>
            <Content>
                <Space n={3} />
                {/* Queremos te conhecer melhor!
A cada pergunta a seguir, marque quantas respostas quiser. */}
                <H4>{quickSearch.question}</H4>
                <Space n={3} />
                {
                    quickSearch.image && <React.Fragment>
                        <ImageContent>
                            <Image resizeMode={"contain"} style={{ height: '100%', width: '70%' }} source={{ uri: quickSearch.image }} />
                        </ImageContent>
                        <Space n={3} />
                    </React.Fragment>
                }


                <View>
                    {
                        options.map((option, index) => <View key={index}>
                            <Space n={2} />
                            <Button
                                onPress={() => answer(option)}
                                type="CallToAction-Light"
                                width={"100%"}
                            >{option}</Button>
                        </View>
                        )
                    }

                </View>
                {/* tags here */}
                <Space n={4} />

            </Content>
            <Footer>
                <Cancel>
                    <Subtitle1 center underline onPress={() => answer(undefined)} type="secondDarkColor">Prefiro não responder</Subtitle1>
                </Cancel>
            </Footer>
            <Bottom />
        </Container>)
}

