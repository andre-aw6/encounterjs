import React from 'react';
import MenuOption from '../../components/MenuOption';
import styled, { withTheme } from 'styled-components/native';
import ScreePopup from '../../components/ScreePopup';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Subtitle1 } from '../../components/Typography';
import { SpaceHorizontal, Space } from '../../components/Space';
import { useSelector, useDispatch } from 'react-redux';
import { logout, handleLogout } from '../../store/actions/user';
import InformationBox from '../../components/InformationBox';
import { handleReopenOnboarding } from '../../store/actions/onboarding';
import config from '../../config';

const Container = styled.View`
    padding: ${props => props.theme.space.space2};
    padding-top: ${props => props.theme.space.space1};
`;

const Logout = styled.TouchableOpacity`
    flex-flow: row;
    margin-top: ${props => props.theme.space.space3};
    align-items:center;
`;

export default withTheme((props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isLogged = false, pendences = [] } = useSelector(state => state.user);
    const hasPendences = pendences.length > 0;
    const menuItems = [
        { title: "Dados Pessoais", description: "Edite suas informações pessoais de cadastro", onPress: () => navigation.navigate('EditProfile') },
    ]

    if(config.myPreferences)
        menuItems.push({ title: "Minhas preferências", description: "Edite suas preferências para melhorares recomendações.", onPress: () =>  { dispatch(handleReopenOnboarding()); navigation.navigate('Home') }})

    return (<ScreePopup withBorder title="Editar Perfil">
        <Container>
            {
                hasPendences && <React.Fragment>
                <Space n={1} />
                    <InformationBox
                        titleType="danger"
                        title='Você possui documentos pendentes!'
                        description={`Complete seu cadastro para 
começar a alugar.`}
                        buttonText='Completar cadastro'
                        onPressButton={() => navigation.navigate('SelfUpload') }
                    />

                    <Space n={3} />
                </React.Fragment>
            }

            {
                menuItems.map((item, index) => <MenuOption key={index} {...item} />)
            }

        </Container>
    </ScreePopup>
    )
})