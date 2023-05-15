import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { H3, Subtitle2, H4 } from '../../../components/Typography';
import CustomInput from '../../../components/Input';
import { SocialButton, Button } from '../../../components/Button';
import styled, { withTheme } from 'styled-components/native';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { Ionicons } from '@expo/vector-icons';
import { handleEmailAlreadyExists, hadleBackToLogin, handleSendPassword, handleSendConfirmCode, handleHideErrorCode } from '../../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { View, Dimensions, Animated } from 'react-native';
import Numberpad from '../../../components/Numberpad';


const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');


const Container = styled.View`
    padding-top: ${props => props.theme.space.space2};
    padding-bottom: 0px;
    width: 100%;
    align-items: center;
`;

const Content = styled.View`
    padding: ${props => props.theme.space.space3};
    padding-bottom: 0px;
    width: 100%;
    align-items: center;
`;

const Line = styled.View`
    flex-flow:row;
    width: 100%;
`;

const CodeNumberLine = styled.View`
    flex-flow:row;
    width: 100%;
    align-items:center;
    justify-content: center;
`;

const CodeNumber = styled.View`
    background: ${props => props.theme.colors.primaryLightColor};
    border: 1.5px ${props => props.theme.colors.primaryColor};
    border-radius: ${props => props.theme.borderRadius.button};
    height: 56px;
    width: 56px;
    align-items:center;
    justify-content: center;
    opacity: ${props => props.disabled ? '.5' : '1'}   
`;

const BackButton = styled.TouchableOpacity`
    width: 40px;;
    align-items:flex-start;
    justify-content:flex-end;
`;

const SafeSpace = styled.View`
    height: ${getBottomSpace()}px;
    width: 1px;
`;

export default withTheme((props) => {
    const { login = {} } = useSelector(state => state.user);
    const isLoading = login.loading;
    const errorMessage = login.errorMessage;
    const { email } = login;
    const dispatch = useDispatch();

    const [code, setCode] = useState('');

    const codeSize = [1, 2, 3, 4, 5];

    const addNumber = (n) => {
        if(isLoading) return;

        if(code.length == codeSize.length - 1){
            dispatch(handleSendConfirmCode(code + '' + n));
        }

        if(code.length >= codeSize.length)
            setCode(''+ n);
        else
            setCode(code + '' + n);

        dispatch(handleHideErrorCode());        
    }

    const cleanCode = () => {
        dispatch(handleHideErrorCode());
        setCode(code.slice(0, code.length-1));
    }

    const getNumber = (n) => {
        const index = n - 1;
        if(index < code.length) return code[index]
        return ''
    }
    
    

    return (<Container {...props}>
        <Content>
            <Line>
                <BackButton onPress={() => dispatch(hadleBackToLogin())}>
                    <Ionicons name="ios-arrow-round-back" color={props.theme.colors.darkColor} size={32} />
                </BackButton>
            </Line>
            <View style={{ width: '100%' }}>
                <Space n={1} />
                <H4 center>
                    Digite o código de 5 dígitos que enviamos
                para <H3>{email}</H3>
                </H4>
               
                {
                    (errorMessage) && <Animatable.View animation="shake">
                        <Space n={1} />

                        <H3 center type='danger'>
                            {errorMessage}
                        </H3>
                    </Animatable.View>
                }
                <Space n={3} />


                <Space n={1} />


            </View>

            <CodeNumberLine>
                {
                    codeSize.map(item => (
                        <React.Fragment key={item}>
                            <SpaceHorizontal n={0} />
                            <CodeNumber disabled={isLoading}><H3>{getNumber(item)}</H3></CodeNumber>
                            <SpaceHorizontal n={0} />
                        </React.Fragment>
                    ))
                }

            </CodeNumberLine>

            <Space n={3} />
            {/* <Button
                // disabled={minLengthPassword > password.length}
                type="CallToAction-Light">Continuar</Button> */}

        </Content>
        <Space n={3} />
        <Numberpad disabled={isLoading} onPress={(n) => addNumber(n)} onCleanPress={() => cleanCode() } />
        {/* <Subtitle2 center type='secondDarkColor'>-ou entre com-</Subtitle2>

        
        <Space n={2} />
        <SocialButton backgroundColor={"#3b5998"}> Entrar com Facebook </SocialButton>
        <Space n={1} />
        <SocialButton backgroundColor={"#2b83fc"}> Entrar com Google </SocialButton> */}

    </Container>)
})