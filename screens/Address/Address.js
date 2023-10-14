import React, { useEffect } from 'react';
import ScreenPopup from "../../components/ScreenPopup";
import SearchBar from "../../components/SearchBar";
import styled, { withTheme } from 'styled-components/native';
import CurrentLocation from './CurrentLocation'
import MenuOption from '../../components/MenuOption';
import { useNavigation } from '@react-navigation/native';
import { Space, SpaceHorizontal } from '../../components/Space';
import { useSelector, useDispatch } from 'react-redux';
import NotLoggedBox from '../User/components/NotLoggedBox';
import { subscribe } from 'graphql';
import { Subtitle2, Subtitle1 } from '../../components/Typography';
import { handleSetCurrentLocation, handleSearchLocationByTerm } from '../../store/actions/address';
import { ScrollView } from 'react-native';
import { handleCloseCartChoseAddress } from '../../store/actions/shared';
import { handleSelectAddress } from '../../store/actions/cart';
import BoxAddress from './component/BoxAddress';
import { Box } from '../../components/Box';

const Container = styled.View`
    flex: 1;
    height:100%;
    padding-top: ${props => props.theme.space.space2};
`;

const MainContent = styled.View``;

const Content = styled.View`
    padding-left: ${props => props.theme.space.space2};
    padding-right: ${props => props.theme.space.space2};
`;

const AddressNumber = styled.View`
    flex-flow: row;
    align-items: flex-end;
    justify-content: flex-end;
`;

const ScrollViewAddress = styled.ScrollView``;

export default withTheme((props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isLogged = false} = useSelector(state => state.user);
    const { choseAddressMode = false,adresses = {},  searchLocations = {} } = useSelector(state => state.address);
    const isSearch = !!(searchLocations.term && searchLocations.term != "");
    const locations = searchLocations.loading ? [1, 2, 3, 4, 5] : (searchLocations.locations || []);
    const isLoading = searchLocations.loading;
    const addressKeys = Object.keys(adresses)
                 .filter(key =>  adresses[key].active);
    
    useEffect(() => {
        return () => dispatch(handleCloseCartChoseAddress());
    }, [dispatch])


    const openOrSelectAddress = React.useCallback((key) => {
        if (choseAddressMode) {
            dispatch(handleSelectAddress(key));
            navigation.goBack();
        } else {
            dispatch(handleSetCurrentLocation(key));
            navigation.navigate("AddNewAddress");
        }
    }, [dispatch, choseAddressMode, navigation, handleSelectAddress]);

    const locationClick = React.useCallback((location) => {
        dispatch(handleSetCurrentLocation(undefined, location));
        dispatch(handleSearchLocationByTerm(''));
        navigation.navigate('AddNewAddress');
    }, [dispatch, navigation]);

    const isLoggedContent = () => <Container>
        <Content>
            <SearchBar type="Location" />
            <Space n={3} />
        </Content>
        {
            isSearch && (<Content>
                {locations.map((location, index) => <MenuOption
                    onPress={() => locationClick(location)}
                    hideBorder
                    key={index}
                    icon="location-pin"
                    isLoading={isLoading}
                    title={location.street}
                    description={`${location.city}/${location.state}`}
                />)
                }
            </Content>)
        }
        {
            (!isLoading &&
                locations.length == 0 &&
                isSearch) && <Content><Subtitle2>Nenhum endereço encontrado</Subtitle2></Content>
        }
        {
            !isSearch && <React.Fragment>
                <Content>
                    <MenuOption
                        onPress={() => navigation.navigate('CurrentLocation')}
                        hideBorder
                        icon="location-pin"
                        title="Usar minha localização atual" />

                </Content>
                <ScrollViewAddress flex={1} showsVerticalScrollIndicator={false}>
        {/* <Subtitle2>{JSON.stringify( Object.keys(adresses))}</Subtitle2> */}
                    <Space n={1} />
                    {
                            addressKeys
                            .map(item => (
                                    <React.Fragment key={item}>
                                        <BoxAddress choseAddressMode={choseAddressMode} key={item} addressKey={item} onPress={() => openOrSelectAddress(item)}/>
                                    </React.Fragment>
                            ))
                    }
                </ScrollViewAddress>
                <Content>
                    <Space n={1} />
                    <AddressNumber>
                        <Subtitle2 type="secondColor">{addressKeys.length}/5 Endereços</Subtitle2>
                    </AddressNumber>
                </Content>
            </React.Fragment>
        }
    </Container>

    const isNotLoggedContent = () => <Container>
        <NotLoggedBox title='Você não possui endereços cadastrados.' />
        </Container>

    return <ScreenPopup  title={"Endereço"} withBorder >
        {(isLogged) ? isLoggedContent() : <MainContent>{isNotLoggedContent()}</MainContent> }
</ScreenPopup>
})
