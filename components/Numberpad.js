import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Ionicons } from '@expo/vector-icons';

const NumberPad = styled.View``;

const Number = styled.TouchableOpacity`
    margin-bottom: ${props => props.isLast ? getBottomSpace() : 0}px;
    height: 80px;
    flex: 1;
    align-items:center;
    justify-content: center;
    border: .5px ${props => props.theme.colors.primaryColor};
    background: ${props => props.theme.colors.primaryLightColor} ;
    opacity: ${props => props.disabled ? '.5' : '1'};
`;

const NumberText = styled.Text`    
    color: ${props => props.theme.colors.primaryDarkColor};
    font-family: Nunito;
    font-size: 24px;
`;

const Line = styled.View`
    flex-flow:row;
    width: 100%;
`;

export default withTheme((props) => {

    return (<NumberPad>
        <Line>
            <Number disabled={props.disabled} onPress={() => props.onPress(1)}><NumberText>1</NumberText></Number>
            <Number disabled={props.disabled} onPress={() => props.onPress(2)}><NumberText>2</NumberText></Number>
            <Number disabled={props.disabled} onPress={() => props.onPress(3)}><NumberText>3</NumberText></Number>
        </Line>
        <Line>
            <Number disabled={props.disabled} onPress={() => props.onPress(4)}><NumberText>4</NumberText></Number>
            <Number disabled={props.disabled} onPress={() => props.onPress(5)}><NumberText>5</NumberText></Number>
            <Number disabled={props.disabled} onPress={() => props.onPress(6)}><NumberText>6</NumberText></Number>
        </Line>
        <Line>
            <Number disabled={props.disabled} onPress={() => props.onPress(7)}><NumberText>7</NumberText></Number>
            <Number disabled={props.disabled} onPress={() => props.onPress(8)}><NumberText>8</NumberText></Number>
            <Number disabled={props.disabled} onPress={() => props.onPress(9)}><NumberText>9</NumberText></Number>
        </Line>
        <Line>
            <Number disabled={props.disabled} isLast onPress={() => props.onPress('')}><NumberText></NumberText></Number>
            <Number disabled={props.disabled} isLast onPress={() => props.onPress(0)}><NumberText>0</NumberText></Number>
            <Number disabled={props.disabled} isLast onPress={() => props.onCleanPress()}><NumberText><Ionicons name={'ios-arrow-back'} color={props.theme.colors.primaryDarkColor} size={24} /></NumberText></Number>
        </Line>
    </NumberPad>)
})