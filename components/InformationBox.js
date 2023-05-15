import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { H3, H4, Subtitle2 } from './Typography';
import { Button } from './Button';
import { Image } from 'react-native';
import { Box } from './Box';
import { Space, SpaceHorizontal } from './Space';

const ImageContent = styled.View`
flex: 1;
min-height: 88px;
width: 100%;
align-items: center;

`;

export default withTheme((props) => {
    return <Box>
        <Space n={1} />
         {
            props.img && (
                <React.Fragment>
                    <ImageContent>
                        <Image resizeMode={"contain"} style={{ height: '100%' }} source={props.img} />
                    </ImageContent>
                    <Space n={2} />
                </React.Fragment>
            )
        }


        <H3 center type={props.titleType}>{props.title}</H3>
        {
            props.subtitle && (<React.Fragment>
                <Space n={1} />
                <H4 center>{props.subtitle}</H4>
            </React.Fragment>)
        }

        {
            props.description && (<React.Fragment>
                <Space n={1} />
                <Subtitle2 center type="secondDarkColor">{props.description}</Subtitle2>
            </React.Fragment>)
        }

        {
            props.buttonText && (<React.Fragment>
                <Space n={2} />
                <Button width={props.buttonWidth} onPress={() => props.onPressButton && props.onPressButton() } type={'CallToAction-Outline'}>{props.buttonText}</Button>
            </React.Fragment>)
        } 

        <Space n={1} />
        
    </Box>
})