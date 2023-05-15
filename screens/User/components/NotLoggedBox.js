import React from 'react';
import InformationBox from '../../../components/InformationBox';
import { openLoginPopup } from '../../../store/actions/user';
import { useDispatch } from 'react-redux';
import { translation } from '../../../texts';
import config from '../../../config';

export default (props) => {
    const dispatch = useDispatch();
    
    return ( <InformationBox
        img={config.notLoggedImg}
        title={props.title}
        description={translation("notLoggedBox.description")}
        buttonText={translation("notLoggedBox.buttonText")}
        onPressButton={() => dispatch(openLoginPopup())}
    />)
}