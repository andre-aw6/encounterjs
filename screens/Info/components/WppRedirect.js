import React, { useState } from 'react';
import styled from 'styled-components/native';
import Dice from '../../../components/Dice';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Subtitle2, H3 } from '../../../components/Typography';
import { openLoginPopup } from '../../../store/actions/user';
import { closePopupModal } from '../../../store/actions/info';
import { Linking } from 'react-native';

const Container = styled.View`
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const Line = styled.View`
    flex-flow: row;
    align-items: flex-start;
    justify-content: center;    
`;

export default () => {
    const dispatch = useDispatch();
    const {  popup = { } } = useSelector(state => state.info);
    const {  about = { } } = useSelector(state => state.app);
    const { phone = "" } = about;
    
    const { text = "Olá" } = popup.data  ? popup.data : {}
    const openWpp = () =>{
        Linking.openURL('whatsapp://send?phone='+ phone +'&text=' + text)
    }

    return (
        <Container>
            <H3 center>Você será direcionado para o WhatsApp.</H3>
            <Space n={0} />
            <H3 noBold>Deseja continuar?</H3>
            <Space n={2} />
            <Line>
                <Button onPress={() =>{
                    dispatch(closePopupModal())
                } } type="CallToAction-Outline" width={'auto'}>Cancelar</Button>
                <SpaceHorizontal n={4} />
                <Button onPress={() =>{
                    openWpp()
                    // dispatch(closePopupModal())
                } } type="ComplementButton-Big" width={'auto'}>Continuar</Button>
            </Line>

        </Container>
    )
}