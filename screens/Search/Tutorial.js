import React, { useState } from 'react';
import styled from 'styled-components/native';
import SearchBar from './components/SearchBar';
import Constants from 'expo-constants';
import { Space } from '../../components/Space';
import * as Animatable from 'react-native-animatable';
import { H3, H2 } from '../../components/Typography';
import { View, TouchableWithoutFeedback, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { handleCloseTutorial } from '../../store/actions/filters';
import { translation } from '../../texts';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tutorial = styled.View`
    width: 100%;
    height: 120%;
    position: absolute;
    z-index: 99;
    background: rgba(0, 0, 0, .8);
    padding: ${props => props.theme.space.space2};
`;

const Content = styled.View`
    position: relative;
    width: 100%;
    height: 100%;
`;

const ContentArea = styled.View`
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 99;
`;

const Arrow = styled.View`
    position: absolute;
    right: 8px;
    width: 20%;
    top: -36px;
    height: auto;
    z-index: 99;
    align-items: flex-start;
    justify-content: flex-start;
`;

export default () => {

    const dispatch = useDispatch();
    const [taps, setTaps] = useState(0);

    const close = () => {

        if(taps >= 1)
            dispatch(handleCloseTutorial())
        setTaps(taps + 1)
    }
    return (<Tutorial>
       <SafeAreaView>
       <Content>
            <SearchBar disabled type="Filter" />
            <Space n={3} />
            <Animatable.View duration={500} animation={"fadeInUp"} style={{ flex: 1 }}>

                <Arrow>
                    <Image resizeMode="contain" style={{ width: '100%', height: 80 }} source={require('../../assets/img/undo.png')} />
                </Arrow>
                <H2 type="lightColor">Filtros de busca</H2>
                <Space n={3} />
                <H2 type="lightColor">Dica <H2 noBold type="lightColor">: {translation("tutorial")} </H2> </H2>
                <Space n={0} />
                <H2 type="lightColor" noBold>Use sem moderação :)</H2>
            </Animatable.View>

            <ContentArea>
                <TouchableWithoutFeedback onPress={close} flex={1} style={{ width: '100%', height: '100%' }}>
                    <View flex={1}></View>
                </TouchableWithoutFeedback>
            </ContentArea>
        </Content>
       </SafeAreaView>
    </Tutorial >)
}