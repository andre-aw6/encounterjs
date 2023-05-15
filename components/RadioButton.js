import React from 'react';
import styled from 'styled-components/native';
import Circle from './Circle';

export const Radio = styled.TouchableOpacity`
    flex-flow: row;
    margin-top: ${props => props.theme.space.space1};
    padding: 0px 12px;
    align-items: center;
    margin-right: ${props => props.isLast ? '0px' : (props.isFlex ? props.theme.space.space2 : props.theme.space.space1)};
    height: 40px;
    border-radius: ${props => props.theme.borderRadius.button};	
    border: 1.5px solid ${props => props.isSelected ?  props.theme.colors.primaryColor :  props.theme.colors.secondColor};
    background-color:   ${props => props.isSelected ?  props.theme.colors.primaryLightColor :  'transparent'};
`;
//color={props.isSelected ? props.theme.colors.textSelectedColor : props.theme.colors.textColor }

export const Text = styled.Text`
font-size: 14px;
font-family:  ${props => props.isSelected ? 'Nunito-Bold' : 'Nunito'};
color: ${props => props.isSelected ? props.theme.colors.primaryDarkColor : props.theme.colors.darkColor };
`;

export const RadioButton = (props) => <Radio {...props} onPress={() => props.onPress && props.onPress() }>
    <Circle  {...props} />
    <Text {...props} >{props.children}</Text> 
    </Radio>