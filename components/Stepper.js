import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-flow: row;
    align-items: center;
    justify-content: center;
    width: ${props => props.width ? props.width : '100%'};
`;

const Circle = styled.View`
    flex-flow: row;
    width:  ${props => props.size * 2}px;
    height: ${props => props.size * 2}px;
    margin-left: ${props => props.isFirst ? '0px' : props.size + 'px'};
    border-radius: 8px;
    background: ${props => {
        if(props.customColor) return props.theme.colors[props.customColor]
        return  props.isActive ? props.theme.colors.primaryDarkColor :  props.theme.colors.primaryColor
    }};
`;

function createCircles(n){
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(i);
    }
    return result;
}

export default (props) => {
    const size = props.size ? props.size : 4;

    return <Container {...props}>
    {
        createCircles(props.number).map(c => <Circle customColor={props.customColor} size={size} key={c} isFirst={c == 0} isActive={props.current == c} />)
    }
</Container> 
}