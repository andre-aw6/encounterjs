import React, { useEffect } from 'react';
import ScreePopup from "../../components/ScreePopup";
import styled, { withTheme } from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import NotLoggedBox from '../User/components/NotLoggedBox';
import { handleCloseCartChoseAddress, handleCloseSetCartChosePayment } from '../../store/actions/shared';
import MenuOption from '../../components/MenuOption';
import { Button } from '../../components/Button';
import { H3, H4 } from '../../components/Typography';
import HideInfo from '../../components/HideInfo';
import { handleLoadPaymentMethods, handleSetCurrentPayment } from '../../store/actions/payments';
import { Space } from '../../components/Space';
import { useNavigation } from '@react-navigation/native';
import { handleSelectPaymentMethod } from '../../store/actions/cart';

const Container = styled.View`
    padding: ${props => props.theme.space.space2};
    min-height:100%;
`;

const Line = styled.View`
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
`;

export default withTheme(() => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { isLogged = false } = useSelector(state => state.user)
    const { paymentMethods, choseMode = false } = useSelector(state => state.payments)
    const isLoading = !paymentMethods

    const onBack = () => {
        if(choseMode) dispatch(handleCloseSetCartChosePayment())
        // navigation.goBack()
    }

    useEffect(() => {
        dispatch(handleLoadPaymentMethods())
    }, [])

    const goTo = (key) => {

        if(choseMode){
            dispatch(handleSelectPaymentMethod(key))
            dispatch(handleCloseSetCartChosePayment())
            navigation.goBack()
        } else {
            dispatch(handleSetCurrentPayment(key))
            navigation.navigate('CreatePayment')
        }
    }

    const openCreate = () => {
        
        dispatch(handleSetCurrentPayment(undefined))
        navigation.navigate('CreatePayment')
    }
    const isLoggedContent = () => <Container>
        {
            isLoading ?
                [1, 2, 3].map(i => <MenuOption key={i} isLoading oneLine />) :
                paymentMethods.map((payment, index) => <MenuOption hideArrow={choseMode} key={payment.key} onPress={() => goTo(payment.key)} icon="credit-card" title={() => <Line><HideInfo n={4} /><H4> {payment.card_number}</H4></Line>} />)
        }

        <Space n={3} />
        {
            !isLoading && <Button type="CallToAction-Outline-Flex" onPress={() => openCreate()}>Adicionar novo cartão de crédito</Button>
        }

    </Container>

    const isNotLoggedContent = () => <Container>
        <NotLoggedBox title='Você não possui cartões cadastrados.' />
    </Container>

    return <ScreePopup onBack={() => onBack()} title={"Formas de pagamento"} withBorder>
        {(isLogged) ? isLoggedContent() : isNotLoggedContent()}
    </ScreePopup>
})