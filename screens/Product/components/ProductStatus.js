
import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import config from '../../../config';

const ProductEnable = styled.View`
    flex-flow: row;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
`;

const Content = styled.View`
    flex: 1;
    flex-flow: row;
    align-items: center;
`;

const Timer = styled.TouchableOpacity`
    width: ${props => props.theme.space.space3};
    justify-content: center;
    align-items: center;
    height: ${props => props.theme.space.space3};
    background-color: ${props => !props.hasAlert ? 'transparent' : props.theme.colors.complementColor};
    border-radius: ${props => props.theme.space.space3};
    border: .5px solid ${props => props.theme.colors.complementColor};
`;

const ProductEnableText = styled.Text`
max-width: 100%;
font-size: 12px;
font-family: Nunito;
color: ${props => props.theme.colors.secondDarkColor};
`;

const Space = styled.View`
width: ${props => props.theme.space.space0};
height: 1px;
`;

const ProductEnableBall = styled.View`
width: ${props => props.theme.space.space1};
height: ${props => props.theme.space.space1};
border-radius:  ${props => props.theme.space.space1};
background: ${props => props.available ? props.theme.colors.success : props.theme.colors.danger};
`;

export default withTheme(({ available, rememberMe, hasAlert, theme, onPress, company }) => <ProductEnable>
    {
        (config.showCompanyOnAvailable && company) ? <Content>
            <ProductEnableText>{company}</ProductEnableText>
        </Content> :
            <Content>
                <ProductEnableBall available={available} />
                <Space />
                <ProductEnableText>{available ? 'Disponível' : 'Insdisponível'}</ProductEnableText>
            </Content>
    }

    {
        rememberMe && <Timer hasAlert={hasAlert} onPress={() => onPress && onPress()}>
            {
                !hasAlert ? <Ionicons name="ios-notifications-outline" color={theme.colors.complementColor} size={16} /> :
                    <Ionicons name="ios-notifications-outline" color={theme.colors.lightColor} size={16} />
            }

        </Timer>
    }


</ProductEnable>)