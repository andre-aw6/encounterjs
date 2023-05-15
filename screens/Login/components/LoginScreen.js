import React, { useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Animatable from 'react-native-animatable';
import { H2, Subtitle2, H3 } from '../../../components/Typography';
import CustomInput from '../../../components/Input';
import { SocialButton } from '../../../components/Button';
import styled from 'styled-components/native';
import { Space } from '../../../components/Space';
import { handleEmailAlreadyExists, loginFB, loginGoogle, handleSocialLogin, loginApple } from '../../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { View, Platform } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import config from '../../../config';

const Container = styled.KeyboardAvoidingView`
padding: ${props => props.theme.space.space3};
padding-top: ${props => props.theme.space.space4};
width: 100%;
`;

const FlexContent = styled.View`
    flex: 1;
`;

const SafeSpace = styled.View`
    height: ${getBottomSpace()}px;
    width: 1px;
`;

export default (props) => {
    // state = {
    //     email : '',
    //     isLoading: false
    // }
    const { login = {} } = useSelector(state => state.user)

    const [email, setEmail] = useState(login.email || '')
    const [isValidEmail, setIsValidEmail] = useState(login.email || '')
    const isLoading = login.loading
    const errorMessage = login.errorMessage
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const onEmailChange = (email) => {
        setIsValidEmail(validateEmail(email.toLowerCase()))
        setEmail(email.toLowerCase())
    }

    const sendEmail = () => {
        dispatch(handleEmailAlreadyExists(email))
    }

    const showApple = Platform.OS == 'ios';

    return (<Container onLayout={(e) => props.onLayout(e)}>
        <View >
            <H2 center>Escolha como deseja continuar!</H2>
            <Space n={4} />
            {
                (errorMessage) && <Animatable.View animation="shake">

                    <H3 center type='danger'>
                        {errorMessage}
                    </H3>
                    <Space n={1} />
                </Animatable.View>
            }


            {
                config.login.password && <React.Fragment>
                    <Subtitle2 type='secondDarkColor'>E-mail</Subtitle2>
                    <Space n={1} />
                    <CustomInput value={email}
                        withButton
                        disabled={isLoading}
                        disabledButton={isLoading || !isValidEmail}
                        onChangeText={email => onEmailChange(email)}
                        onPress={() => sendEmail()}
                        placeholder="Seu e-mail de cadastro" />
                    <Space n={5} />
                    <Space n={1} />
                </React.Fragment>
            }

        </View>
        <View>
            {
                (
                    (config.login.facebook || config.login.google) &&
                    config.login.password
                ) && <React.Fragment>
                    <Subtitle2 center type='secondDarkColor'>-ou entre com-</Subtitle2>
                    <Space n={2} />
                </React.Fragment>
            }

            {
                showApple && <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={24}
                style={{ width: '100%', height: 48, opacity: isLoading ? .5 : 1 }}
                onPress={() => !isLoading && dispatch(loginApple())}
            />
            }
            
            {
                (!config.login.password && showApple && (config.login.google  || config.login.facebook)) && <React.Fragment>
                    <Space n={2} />
                    <Subtitle2 center type='secondDarkColor'>ou</Subtitle2>
                    <Space n={2} />
                </React.Fragment>
            }

            {
                config.login.facebook && <React.Fragment>
                     <Space n={1} />
                    <SocialButton icon="facebook" onPress={() => dispatch(loginFB())} disabled={isLoading} backgroundColor={"#3b5998"}> Entrar com Facebook </SocialButton>
                </React.Fragment>
            }
            {
                (!config.login.password && config.login.facebook && config.login.google && !showApple) && <React.Fragment>
                    <Space n={2} />
                    <Subtitle2 center type='secondDarkColor'>ou</Subtitle2>
                    <Space n={2} />
                </React.Fragment>
            }

            {
                config.login.google && <React.Fragment>
                    <Space n={1} />
                    <SocialButton icon="google" onPress={() => dispatch(loginGoogle())} disabled={isLoading} backgroundColor={"#2b83fc"}> Entrar com Google </SocialButton>

                </React.Fragment>
            }

            <SafeSpace />
        </View>
    </Container>)
}