import React from 'react';
import styled from 'styled-components/native';

const Progress = styled.View`
    width: 100%;
    border-radius: 4px;
    height: 4px;
    background: ${props => props.theme.colors.secondColor};
`;

const Bar = styled.View`
    width: ${props => props.percent ? (props.percent + '%'): '0%'};
    border-radius: 4px;
    height: 4px;
    background: ${props => props.theme.colors.complementColor};
`;

export default (props) => {
    return (<Progress>
            <Bar {...props}/>
    </Progress>
    )
}