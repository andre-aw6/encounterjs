import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import { View, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    width: 100%;
    height: ${Dimensions.get('window').height}px;
    position: absolute;
    z-index: 1;
    top: -${Constants.statusBarHeight + 46}px;
    left: 0;
`;

const Content = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
`;

export default (props) => <Container>
    <Animatable.View duration={500} animation="fadeIn" style={{ flex: 1 }}>
        <Content onPress={() =>  props.onBackgroundPress && props.onBackgroundPress() }>
            <TouchableOpacity style={{
                width: '100%',
                height: '30%'
            }}>
                <WebView
                    style={{ flex: 1 }}
                    javaScriptEnabled={true}
                    source={{ uri: props.video }}
                />
            </TouchableOpacity>
        </Content>
    </Animatable.View>
</Container>