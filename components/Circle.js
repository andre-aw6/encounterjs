import React from 'react';
import styled from 'styled-components/native';

const Circle = styled.View`
    height: 18px;
    width: 18px;
    border-radius: 18px;
    border: 2px solid ${props => props.isSelected ?  props.theme.colors.primaryDarkColor :  props.theme.colors.secondColor};
    margin-right: ${props => props.theme.space.space1};
    padding: 2px;
`;

const CircleIntern = styled.View`
    height: 100%;
    width:  100%;
    border-radius: 18px;
    background:${props => props.theme.colors.primaryDarkColor};
`;

export default (props) => {

    return (<Circle  {...props}>{props.isSelected && <CircleIntern />}</Circle>)
}