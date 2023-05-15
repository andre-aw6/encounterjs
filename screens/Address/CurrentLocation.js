import React, { useState, useEffect, Component } from 'react';
import { Platform, Text, View, Dimensions, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import styled, { withTheme } from 'styled-components/native';
import { Button } from '../../components/Button';
import { Space } from '../../components/Space';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Subtitle2 } from '../../components/Typography';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { handleSearchLocation } from '../../store/actions/address';
import { connect } from 'react-redux';
// import {  } from '@react-navigation/native';

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const Header = styled.View`
    position: absolute;
    top: ${props => props.theme.space.space4};
    left: 0;
    zIndex: 99;
    width: 100%;
    padding: ${props => props.theme.space.space2};
`;

const Footer = styled.View`
    position: absolute;
    bottom: ${getBottomSpace() + 'px'};
    left: 0;
    zIndex: 99;
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
    zIndex: 99;
    align-items:center;
    justify-content:center;
`;


class CurrentLocation extends Component {
    state = {
        moving: false,
        started: false
    }
    
    async componentDidMount() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        
        this.map.animateCamera({ center: currentLocation.coords, pitch: 10, altitude: 800, zoom: 17 }, 500)
        
        this.requestStreeName(currentLocation.coords)
        
        this.setState({
            started: true,
            moving: false
        })
    }


    onPressMap = (e) => {
        if (this.map && e.nativeEvent.coordinate) {
            this.setState({ moving: true })
            this.map.animateCamera({ center: e.nativeEvent.coordinate, pitch: 10, altitude: 800 }, 500)
        }
    }

    requestStreeName = ({ latitude, longitude}) => {

        this.props.dispatch(handleSearchLocation(latitude, longitude))
        
    }

    onRegionChange = (e) => {
        this.setState({ moving: true })
    }

    onRegionChangeComplete = (e) => {

        if(this.state.started)
        {
            this.setState({ moving: false })
            this.requestStreeName(e)
        }
        // this.map.animateCamera({ center: e, pitch: 10, }, 500)
    }


    render() {
        const { moving } = this.state
        const streetName = this.props.currentLocation && 
                            this.props.currentLocation.street ?
                            (this.props.currentLocation.formatted_address || this.props.currentLocation.street) :
                            undefined
        const markerTop = Dimensions.get('window').height / 2 - 16
        // nagivation.goBack()

        return (<Container >

            <Header>
                <CloseButton onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" color={this.props.theme.colors.darkColor} size={32} />
                </CloseButton>
            </Header>

            <Footer>
                <Address disabled={!streetName}>
                    <Subtitle2> {!streetName ? 'Carregando...' : streetName} </Subtitle2>
                </Address>
                <Space n={2} />
                <Button onPress={() => this.props.navigation.navigate("AddNewAddress")} disabled={!streetName} type="CallToAction-Light">Confirmar</Button>
            </Footer>

            <MarkerMiddle style={{ top: moving ? markerTop - 8 : markerTop }}>
                <Image resizeMode={"contain"} style={{ height: '100%', opacity: moving ? .5 : 1 }} source={require('../../assets/img/map-pin.png')} />
            </MarkerMiddle>

            <MapView
                onPress={e => this.onPressMap(e)}
                onRegionChangeComplete={e => this.onRegionChangeComplete(e)}
                onRegionChange={e => this.onRegionChange(e)}
                pitchEnabled={false}
                ref={ref => {
                    this.map = ref;
                }}
                loadingEnabled
                style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, }}
            >

            </MapView>
        </Container>)

    }

}

function mapStateToProps({ address }){
    return {
        currentLocation: address.currentLocation
    }

}

export default withTheme(connect(mapStateToProps)(CurrentLocation))