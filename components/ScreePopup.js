import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { ScrollView, KeyboardAvoidingView, View, Platform } from 'react-native';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { H3, Subtitle1 } from './Typography';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Constants from 'expo-constants';

const SafeSpace = styled.View`
    height: ${getBottomSpace() + 'px'};
    width: 100%;
`;

const Container = styled.View`
    background-color: ${props => props.theme.colors.lightColor};
    flex: 1;
    height: 100%;
    width: 100%;
    padding-top: ${props => Platform.OS === "ios" ? props.theme.space.space4 : 0};
    padding-bottom: ${getBottomSpace()}px;
`;

const Header = styled.View`
    background-color: ${props => props.theme.colors.lightColor};
    margin-top:  ${props => props.noPadding ? 0 : props.theme.space.space2};
    margin-left: ${props => props.theme.space.space2};
    margin-right: ${props => props.theme.space.space2};
    height: 42px;   
    position: relative;
    justify-content: center;
    align-items: center;
    border-color: ${props => props.withBorder ? props.theme.colors.secondColor : 'transparent'};
    border-bottom-width: 1px;
`;

const CloseButton = styled.TouchableOpacity`
    position: absolute;
    top:0;
    left: -8px;
    background-color: ${props => props.theme.colors.lightColor};
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items:center;
`;

const ToolItem = styled.TouchableOpacity`
    position: absolute;
    top:0;
    right:0;
    background-color: ${props => props.theme.colors.lightColor};
    height: 40px;
    justify-content: center;
    align-items:center;
`;


const ScreenPopUp = (props) => {
    const navigate = useNavigation();
    const goBack = () => {        
        navigate.goBack();
        return props.onBack && props.onBack();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
            }}>

            <Container>
                {
                    !props.hideHeader && <Header noPadding={!props.title} {...props}>
                        <CloseButton onPress={() => goBack()}>
                            <Ionicons name="ios-arrow-round-back" color={props.theme.colors.darkColor} size={32} />
                        </CloseButton>
                        {
                            props.title && <H3>{props.title}</H3>
                        }
                        {
                            props.tooltext && <ToolItem onPress={() => props.onToolPress && props.onToolPress()}><Subtitle1 color={props.theme.colors.primaryDarkColor}>{props.tooltext}</Subtitle1></ToolItem>
                        }
                    </Header>
                }
                <View flex={1}>
                    {props.noScroll ? props.children : (
                        <ScrollView style={{ flex: 1, minHeight: '80%', minWidth: '100%', height: '0%' }}>
                            {props.children}
                        </ScrollView>)
                    }
                </View>
                    {
                        props.footer && props.footer()
                    }
            </Container>
        </KeyboardAvoidingView>
    )
}

export default withTheme(ScreenPopUp);