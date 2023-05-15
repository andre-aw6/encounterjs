import React, { useEffect } from 'react';
import InformationBox from '../../../components/InformationBox';
import styled from 'styled-components/native';
import OrderBox from './OrderBox';
import { openLoginPopup } from '../../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoadOrders } from '../../../store/actions/orders';
import { useNavigation } from '@react-navigation/native';
import { translation } from '../../../texts';

const Container = styled.View`
    flex: 1;
`;

const noResultTitle = (type) => {

    if (type == 'History') return 'oldOrders'
    return 'currentOrders'
}

export default (props) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleLoadOrders())
    }, [])
    
    const navigation = useNavigation();
    const { isLogged = false } = useSelector(state => state.user)
    const { orders = {} } = useSelector(state => state.orders)


    
    const ordersList = Object.keys(orders)
        .map(key => orders[key])
        .filter(order => ( props.type == "History" && !order.current )
                         || (props.type != "History" && order.current ))

    // return null;
    if (ordersList.length == 0)
        return <InformationBox
            img={require('../../../assets/img/open-box.png')}
            title={translation("orders." + noResultTitle(props.type) )}
            buttonText={translation("orders.buttonText")}
            onPressButton={() => navigation.navigate('Início')}
        />
    
    return (
        <Container>
            {
                ordersList.map(order => <OrderBox order={order} key={order.key} />)
            }
        </Container>

    )
}