import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';

export const Radio = styled.View`
    margin-top: ${props => props.theme.space.space1};
    margin-right: ${props => props.theme.space.space1};
    flex-flow: row;
    align-items:center;
    justify-content: center;
    border-radius: ${props => props.isCircle ? '100px' : props.theme.borderRadius.tag};	
    border: 1.5px solid ${props => props.theme.colors.primaryColor};
    background-color:   ${props => props.theme.colors.primaryLightColor};
`;
//color={props.isSelected ? props.theme.colors.textSelectedColor : props.theme.colors.textColor }

const CloseButtonArea = styled.TouchableOpacity`
    height: 100%;
    justify-content: center;
    align-items:center;
    padding-right: 6px;
    width: 30px;    
`;

const CloseButton = styled.View`
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
    font-family:  ${props => props.isSelected ? 'Nunito-Bold' : 'Nunito'};
    color: ${props => props.theme.colors.primaryDarkColor};
    margin: ${props => props.onClose ? '6px 0px 6px 12px' : '6px 12px' };
`;


export const Tag = (props) => (<Radio {...props} onPress={() => props.onPress && props.onPress()}>
    <Text {...props} >{props.children}</Text>
    {
        props.onClose && <CloseButtonArea onPress={() => props.onClose()}>
            <CloseButton>
                <EvilIcons name="close" color={'black'} size={12} />
            </CloseButton>
        </CloseButtonArea>
    }
</Radio>)