import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native';

import StringMask from 'string-mask';

// import { TouchableWithoutFeedback } from 'react-native'
const Container = styled.View`
    width: 100%;
    position: relative;
    padding-right: ${props => props.withButton ? '28px' : '0px'};
`;

export const CustomInput = styled.TextInput`
    border: 1.5px solid ${props => props.theme.colors.primaryColor};
    background: ${props => props.theme.colors.primaryLightColor};
    padding-left: ${props => props.theme.space.space2};
    border-radius: ${props => props.theme.borderRadius.button};
    height: ${props => props.field ? '48px' : '56px'};
    font-size: ${props => props.theme.space.space2};
    opacity: ${props => props.disabled ? '.5' : '1'};
`;

const Button = styled.View`
    height: 56px;
    align-items:center;
    justify-content:center;
    width: 56px;
    border-radius: 56px;
    background: ${props => props.theme.colors.primaryDarkColor};
    opacity: ${props => props.disabledButton ? '.5' : '1'};
`;

const ButtonSpace = styled.View`
    height: 56px;
    width: 56px;
    border-radius: 56px;
    background: ${props => props.theme.colors.lightColor};
    position: absolute;
    right: 0;
`;

const TouchRightIcon = styled.TouchableOpacity`
    height: 56px;
    width: 56px;
    border-radius: 56px;
    position: absolute;
    right: 0;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.disabled ? '.5' : '1'};
`;

export default withTheme((props) => {    
    const format = (value) => {
        if(!props.format) return value
        return props.format(value)
        
    }

    return (
        <Container {...props}>
            <CustomInput {...props} onChangeText={e => props.onChangeText && props.onChangeText(format(e))} editable={!props.disabled} />
            {
                props.withButton && <ButtonSpace><TouchableWithoutFeedback disabled={props.disabledButton} onPress={() => props.onPress()}>
                    <Button disabledButton={props.disabledButton}>
                        <Ionicons name="ios-arrow-forward" color="#FAFAFA" size={32} />
                    </Button>
                </TouchableWithoutFeedback></ButtonSpace>
            }
            {
                props.rightIcon && <TouchRightIcon {...props} onPress={() => props.onRightIconPress && props.onRightIconPress()}>
                    <Ionicons name={props.rightIcon} color={props.theme.colors.darkColor} size={32} />
                </TouchRightIcon>
            }
        </Container>
    )
})