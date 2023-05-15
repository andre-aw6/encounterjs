import React from 'react';
import styled from 'styled-components/native';

export const Badge_ = styled.View`
    margin-top: ${props => props.theme.space.space0};
    margin-right: ${props => props.theme.space.space0};
	padding:  ${props => props.theme.space.space0}  ${props => props.theme.space.space1};
    border-radius: ${props => props.isCircle ? '100px' : props.theme.borderRadius.tag};	
    border: 1.5px solid ${props => props.isSelected ?  props.theme.colors.primaryColor :  props.theme.colors.secondColor};
    background-color:   ${props => props.isSelected ?  props.theme.colors.primaryLightColor :  'transparent'};
`;

export const Text = styled.Text`
    font-size:  ${props => props.theme.sizes.subtitle3};
    font-family: Nunito;
    color: ${props => props.theme.colors.primaryDarkColor};
`;

export const Badge = (props) => <Badge_ {...props}>
    <Text {...props} >{props.children}</Text> 
    </Badge_>