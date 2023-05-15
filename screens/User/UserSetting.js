import React from 'react';
import MenuOption from '../../components/MenuOption';
import styled , { withTheme } from 'styled-components/native';
import ScreePopup from '../../components/ScreePopup';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Subtitle1 } from '../../components/Typography';
import { SpaceHorizontal } from '../../components/Space';
import { useSelector, useDispatch } from 'react-redux';
import { Linking as ExpoLink } from 'expo';
import * as Application from 'expo-application';
import * as IntentLauncher from 'expo-intent-launcher';
import { handleLogout } from '../../store/actions/user';
import config from '../../config';
import storage from '../../utils/storage';
import Icons from '../../components/Icons';


const Container = styled.View`
    padding: ${props => props.theme.space.space2};
    padding-top: ${props => props.theme.space.space1};
`;

const Logout = styled.TouchableOpacity`
    flex-flow: row;
    margin-top: ${props => props.theme.space.space3};
    align-items:center;
`;


export default withTheme( (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { policy = "", terms = "" } = useSelector(state => state.app.terms);
    const { isLogged = false } = useSelector(state => state.user);    
    const open_settings = () => {
        Linking.openSettings();
        if (Platform.OS === 'ios') {
            ExpoLink.openURL(`app-settings:`);
        } else {
        const bundleIdentifier = Application.applicationId;
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS, {
            data: `package:${bundleIdentifier}`,
        });
        }
    }

    const menuItems = [
        {title: "Notificações", description: "Entre nas Configurações do seu dispositivo para ativar ou desativar.", onPress : () => open_settings() },
        {title: "Termos e Condições", description: "Você será direcionado para uma página web.", onPress :  () => Linking.openURL(terms) },
        {title: "Política de Privacidade", description: "Você será direcionado para uma página web.", onPress : () => Linking.openURL(policy) },
       
    ]
    

    return (<ScreePopup withBorder title="Configurações">
        <Container>
            {
                menuItems.map((item, index) =>  <MenuOption key={index} {...item} />)
            }
            {
                config.cleanStorage && <Logout onPress={() => storage.clear() }>
                    <Icons name="logout" color={props.theme.colors.darkColor} size={16} />
                    <SpaceHorizontal n={1} />
                    <Subtitle1>Limpar</Subtitle1>
                </Logout>
            }
            {
                isLogged && <Logout onPress={() => dispatch(handleLogout(true))}>
                    <Icons name="logout" color={props.theme.colors.darkColor} size={16} />
                    <SpaceHorizontal n={1} />
                    <Subtitle1>Sair</Subtitle1>
                </Logout>
            }
        </Container>
    </ScreePopup>
    )
})