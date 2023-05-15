import React from 'react';
import { H4, Subtitle2 } from './Typography';
import styled, { withTheme } from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';
import { Space, SpaceHorizontal } from './Space';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import Icons from './Icons';

const Container = styled.TouchableOpacity`
    flex-flow: row;
    align-items:center;
    padding-top: ${props => props.theme.space.space2};
    padding-bottom: ${props => props.theme.space.space2};
    border-color: ${props => props.hideBorder ? 'transparent' : props.theme.colors.secondLightColor};
    border-bottom-width: 1.5px;
`;

const Info = styled.View`
    flex: 1;
`;

const InfoIcon = styled.View`
    min-width: 40px;
    margin-right:  ${props => props.theme.space.space2};
    padding-left: ${props => props.theme.space.space0};
`;

export default withTheme((props) => {

    if (props.isLoading)
       return (
       <Placeholder Animation={Fade} >
        <Container>
            <InfoIcon>
                 <PlaceholderMedia size={32} />
            </InfoIcon>
            <Info>
                
                <PlaceholderLine noMargin height={24} /> 
                {
                   !props.oneLine && <React.Fragment>
                        <Space n={0} />
                        <PlaceholderLine noMargin height={20} /> 
                    </React.Fragment>
                }
                

            </Info>
            <SpaceHorizontal n={1} />
            <PlaceholderMedia size={16} />
        </Container>
        </Placeholder>)

    return (<Container {...props} onPress={() => props.onPress && props.onPress()}>

        {
            props.children ? props.children : (<React.Fragment>
                {
                    props.icon && <InfoIcon>
                        <Icons name={props.icon} color={props.theme.colors.darkColor} size={props.theme.sizes.icons} />
                    </InfoIcon>
                }


                <Info>
            { {}.toString.call(props.title) === '[object Function]' ? props.title() :<H4>{props.title}</H4> }
                    {
                        props.description && (
                            <React.Fragment>
                                <Space n={0} />
                                <Subtitle2 type={"secondDarkColor"}>{props.description}</Subtitle2>
                            </React.Fragment>
                        )
                    }

                </Info>
            </React.Fragment>)
        }

        {
            !props.hideArrow && <EvilIcons name="chevron-right" color={props.theme.colors.darkColor} size={props.theme.sizes.icons} />
        }
    </Container>)
})