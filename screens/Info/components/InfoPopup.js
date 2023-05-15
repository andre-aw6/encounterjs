import React from 'react';
import styled from 'styled-components/native';
import { Space } from '../../../components/Space';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { H3, H4 } from '../../../components/Typography';
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

    const {  popup = { } } = useSelector(state => state.info)
    
    const { title = "", text = "" } = popup.data  ? popup.data : {}
    
    return (
        <Container>
            <H3 center>{title}</H3>
            <Space n={0} />
            <H4 center noBold>{text}</H4>
            <Space n={2} />
            <Line>
                <Button onPress={() =>dispatch(closePopupModal())} type="ComplementButton-Big" width={'auto'}>Ok</Button>
            </Line>

        </Container>
    )
}