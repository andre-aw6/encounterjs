import React, { useState } from 'react';
import styled from 'styled-components/native';
import LoginScreen from './LoginScreen';
import { useSelector } from 'react-redux';
import { LoginRegisterSteps } from '../../../store/actions/user';
import PasswordScreen from './PasswordScreen';
import CodeSentScreen from './CodeSentScreen';

const Container = styled.View`
    padding: ${props => props.theme.space.space3};
    width: 100%;
`;

export default () => {
    const [minHeight, setHeight] = useState(undefined);
    const { login = {} } = useSelector(state => state.user);

    if ((login.isLogin || login.isRegister || login.changePassword) && !login.isCodeSent)
        return <PasswordScreen minHeight={minHeight} />

    if ((login.isLogin || login.isRegister) && login.isCodeSent)
        return <CodeSentScreen minHeight={minHeight} />

    return (<LoginScreen onLayout={(event) => setHeight(event.nativeEvent.layout.height)} />)
}