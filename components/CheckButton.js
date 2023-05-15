import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';

export const Radio = styled.TouchableOpacity`
    margin-top: ${props => props.theme.space.space1};
    margin-right: ${props => props.theme.space.space1};
    padding: 6px 12px;
    flex-flow: row;
    align-items:center;
    justify-content: center;
    border-radius: ${props => props.isCircle ? '100px' : props.theme.borderRadius.tag};	
    border: 1.5px solid ${props => props.isSelected ? props.theme.colors.primaryColor : props.theme.colors.secondColor};
    background-color:   ${props => props.isSelected ? props.theme.colors.primaryLightColor : 'transparent'};
`;
//color={props.isSelected ? props.theme.colors.textSelectedColor : props.theme.colors.textColor }

const CloseButton = styled.TouchableOpacity`
    background-color: ${props => props.theme.colors.secondLightColor};
    height: 16px;
    width: 16px;
    border-radius: 16px;
    justify-content: center;
    align-items:center;
    margin-left: ${props => props.theme.space.space1};
`;

export const Text = styled.Text`
font-size: 14px;
font-family:  ${props => props.isSelected ? 'Nunito' : 'Nunito'};
color: ${props => props.isSelected ? props.theme.colors.primaryDarkColor : props.theme.colors.darkColor};
`;



export const CheckButton = (props) => (<Radio {...props} onPress={() => props.onPress && props.onPress()}>
    <Text {...props} >{props.children}</Text>
</Radio>)