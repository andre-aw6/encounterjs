import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, ActivityIndicator } from 'react-native';
import MapView from 'expo';
import * as Location from 'expo-location';
import styled, { withTheme } from 'styled-components/native';
import { Button } from '../../components/Button';
import { Space } from '../../components/Space';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Subtitle2 } from '../../components/Typography';
import { Ionicons } from '@expo/vector-icons';
import { handleSearchLocation } from '../../store/actions/address';
import { connect } from 'react-redux';

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const Header = styled.View`
  position: absolute;
  top: ${props => props.theme.space.space4};
  left: 0;
  z-index: 99;
  width: 100%;
  padding: ${props => props.theme.space.space2};
`;

const Footer = styled.View`
  position: absolute;
  bottom: ${getBottomSpace() + 'px'};
  left: 0;
  z-index: 99;
  width: 100%;
  padding: ${props => props.theme.space.space2};
`;

const CloseButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items:center;
`;

const Address = styled.View`
  background: ${props => props.theme.colors.lightColor};
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.button};
  padding: ${props => props.theme.space.space2};
  shadow-color: ${props => props.theme.shadow.shadowColor};
  shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
  shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
  shadow-radius: ${props => props.theme.shadow.shadowRadius}px;
  elevation: ${props => props.theme.shadow.elevation};
  opacity: ${props => props.disabled ? '.8' : '1'};
`;

const MarkerMiddle = styled.View`
  width: 32px;
  height: 32px;
  position:absolute;
  top: ${Dimensions.get('window').height / 2 - 16}px;
  left: ${Dimensions.get('window').width / 2 - 16}px;
  z-index: 99;
  align-items:center;
  justify-content:center;
`;

function CurrentLocation(props) {
  const [moving, setMoving] = useState(false);
  const [started, setStarted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    Location.requestPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
  
      Location.getCurrentPositionAsync({}).then(currentLocation => {
        mapRef.current.animateCamera({ center: currentLocation.coords, pitch: 10, altitude: 800, zoom: 17 }, 500)
        requestStreetName(currentLocation.coords)
        setStarted(true);
        setMoving(false);
      });
    });
  }, [requestStreetName]); // Add requestStreetName to the dependency array

  const onPressMap = (e) => {
    if (mapRef.current && e.nativeEvent.coordinate) {
      setMoving(true);
      mapRef.current.animateCamera({ center: e.nativeEvent.coordinate, pitch: 10, altitude: 800 }, 500)
    }
  }

  const requestStreetName = ({ latitude, longitude }) => {
    props.dispatch(handleSearchLocation(latitude, longitude))
  }

  const onRegionChange = () => {
    setMoving(true);
  }

  const onRegionChangeComplete = (e) => {
    if (started) {
      setMoving(false);
      requestStreetName(e);
    }
  }

  const streetName = props.currentLocation &&
    props.currentLocation.street ?
    (props.currentLocation.formatted_address || props.currentLocation.street) : undefined;
  const markerTop = Dimensions.get('window').height / 2 - 16;

  return (
    <Container>
      <Header>
        <CloseButton onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" color={props.theme.colors.darkColor} size={32} />
        </CloseButton>
      </Header>

      <Footer>
        <Address disabled={!streetName}>
          <Subtitle2>{!streetName ? 'Carregando...' : streetName}</Subtitle2>
        </Address>
        <Space n={2} />
        <Button onPress={() => console.log('Button pressed')}>Confirmar Endereço</ Button> <Image source={require('../../assets/img/map-pin.png')} style={{ height: 32, width: 32 }} />
            <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialRegion={{
        latitude: -22.906847,
        longitude: -47.059766,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      followsUserLocation={false}
      onRegionChange={onRegionChange}
      onRegionChangeComplete={onRegionChangeComplete}
      onPress={onPressMap}
    />

    {moving && <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', top: markerTop }} />}
  </Footer>
</Container>
); }

const mapStateToProps = state => ({ currentLocation: state.address.currentLocation });

export default connect(mapStateToProps)(withTheme(CurrentLocation));