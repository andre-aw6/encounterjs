import React, {  } from 'react'
import styled from 'styled-components/native'
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { closePopupModal } from '../../store/actions/info';
import Evaluate from '../Product/components/Evaluate';
import PopupLogin from './components/PopupLogin';
import WppRedirect from './components/WppRedirect';
import InfoPopup from './components/InfoPopup';
import ConfirmModal from './components/ConfirmModal';
import TextModal from './components/TextModal';
import { KeyboardAvoidingView } from 'react-native';
import OptionsModal from './components/OptionsModal';

const Container = styled.View`
    padding: ${props => props.theme.space.space2};
    background: ${props => props.theme.colors.lightColor};
    width: 100%;
    flex-wrap: wrap;
    border-radius: ${props => props.theme.borderRadius.button};    
    shadow-color: ${props => props.theme.shadow.shadowColor};
    shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
    shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
    shadow-radius: ${props => props.theme.shadow.shadowRadius}px;
`;

function getBody(type){
    
    if(type == 'EVALUATE')
        return <Evaluate />
    if(type == 'WPP_POPUP')
        return <WppRedirect />
    if(type == 'CONFIRM_MODAL')
        return <ConfirmModal />
    if(type == 'TEXT_MODAL')
        return <TextModal />
    if(type == 'OPTIONS_MODAL')
        return <OptionsModal />
    if(type == 'LOGIN_POPUP')
        return <PopupLogin />
    if(type == 'INFO_POPUP')
        return <InfoPopup />
}

export default () => {
    const info = useSelector(state => state.info)
    const dispatch = useDispatch()
    
    const isVisible = info.popup && info.popup.open;
    const type  = info.popup && info.popup.type ? info.popup.type : '';

    return <Modal 
                isVisible={isVisible} 
                animationIn="fadeIn"
                animationOut="fadeOut"
                onBackdropPress={() => dispatch(closePopupModal())}>
                <KeyboardAvoidingView behavior="padding" >
        <Container>
            {
                getBody(type)
            }
        </Container>
            </KeyboardAvoidingView>
    </Modal>
}