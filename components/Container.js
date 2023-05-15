import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { H2, Subtitle2 } from './Typography';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import Texts from '../texts';

const Box = styled.View`
    background-color: white;
    margin-bottom: ${props => props.theme.space.space2};
    width: 100%;
    padding-top:  ${props => props.theme.space.space2};
    padding-bottom:  ${props => props.theme.space.space2};
    shadow-color: ${props => props.theme.shadow.shadowColor};
    shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
    shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
    shadow-radius: ${props => props.theme.shadow.shadowRadius}px;
    elevation: ${props => props.theme.shadow.elevation};
`;

const Header = styled.View`
    padding-left: ${props => props.theme.space.space2};
    padding-right: ${props => props.theme.space.space2};
    margin-bottom: ${props => props.theme.space.space2};
    position: relative;
`;

const ToolText = styled.TouchableOpacity`
    position: absolute;
    right: ${props => props.theme.space.space2};
    top:0;
`;

export default withTheme((props) => {


    return (<Box>
        <Header>

            {
                props.isLoading ? <Placeholder
                    style={{ flex: 1 }}
                    Animation={Fade}
                >

                    <PlaceholderLine noMargin height={24} />
                </Placeholder> :
                <H2>{props.title}</H2>
            }
            
            {props.subtitle && <Subtitle2>{props.subtitle}</Subtitle2>}


            {props.toolText && <ToolText onPress={() => props.onToolTextPress && props.onToolTextPress()}>
                <Subtitle2 underline type='primaryDarkColor'>{props.toolText}</Subtitle2>
            </ToolText>}
        </Header>
        {props.children}
    </Box>
    )
})