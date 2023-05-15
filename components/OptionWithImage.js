import React from 'react';
import styled from 'styled-components/native';
import { H4, H3, Subtitle2 } from './Typography';
import { Image } from 'react-native';
import { SpaceHorizontal } from './Space';

const OptionWithImage = styled.TouchableOpacity`
    padding: ${props => props.theme.space.space2};
    padding-top: ${props => props.theme.space.space2};
    padding-bottom: ${props => props.theme.space.space2};
    border-radius: ${props => props.theme.borderRadius.button};
    border: 1.5px;
    border-color: ${props => props.isActive ? props.theme.colors.primaryColor : props.theme.colors.secondColor};
    margin-bottom: ${props => props.theme.space.space2};
    background: ${props => props.isActive ? props.theme.colors.primaryLightColor : 'transparent'};
    height: 120px;
`;

const Content = styled.View`
    flex: 1;
    height: 100%;
    justify-content: center;
    flex-wrap: wrap;
`;

const Line = styled.View`
    flex-flow: row;
    align-items: flex-start;
`;

const ImageContent = styled.View`
    align-items: flex-start;
    justify-content:  flex-end;
    height: 100%;
    padding-right: ${props => props.theme.space.space2};
    width: 50%;
`;

export default ({isActive, text, image, onPress}) => {
    return (
        <OptionWithImage isActive={isActive} onPress={onPress}>
            <Line>
                <ImageContent>
                    <Image 
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                    }}
                        source={{ uri: image }} />
                </ImageContent>
                <Content>
                    {
                        isActive ? <H3 bold type="primaryDarkColor" style={{ width: '100%' }}>{text}</H3>:
                                   <H4 type="secondDarkColor" style={{ width: '100%' }}>{text}</H4>
                    }
                   
                </Content>
            </Line>
        </OptionWithImage>
    )
}