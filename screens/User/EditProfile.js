import React from 'react';
import EditProfileContent from './EditProfileContent';
import ScreenPopup from '../../components/ScreenPopup';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const date = new Date();
    return (<ScreenPopup title={"Editar perfil"} withBorder noScroll>
        <EditProfileContent isEdit />
    </ScreenPopup>
    )
}