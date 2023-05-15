import React, { useState } from 'react';
import styled from 'styled-components/native';
import Dice from '../../../components/Dice';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { Button } from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { Subtitle2 } from '../../../components/Typography';
import { openLoginPopup } from '../../../store/actions/user';
import { closePopupModal } from '../../../store/actions/info';

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
    const dispatch = useDispatch()
    const [evalutaion, setEvalutaion] = useState();

    return (
        <Container>
            <Subtitle2>Você precisa estar logado para essa ação!</Subtitle2>
            <Space n={2} />
            <Line>
                <Button onPress={() =>{
                    dispatch(closePopupModal())
                    dispatch(openLoginPopup())
                } } type="CallToAction-Outline" width={'100%'}>Entrar ou cadastrar</Button>
            </Line>

        </Container>
    )
}