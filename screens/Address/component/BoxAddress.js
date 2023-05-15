import React, { Component } from 'react'
import styled, { withTheme } from 'styled-components/native'
import { Subtitle2, Subtitle1 } from '../../../components/Typography'
import { Space, SpaceHorizontal } from '../../../components/Space'
import { EvilIcons } from '@expo/vector-icons';
import { useSelector, connect } from 'react-redux';
import { View } from 'react-native';
import { Box } from '../../../components/Box';

const AddressBox = styled.TouchableOpacity`
    margin-left: ${props => props.theme.space.space2};
    margin-right: ${props => props.theme.space.space2};
    background-color: ${props => props.theme.colors.lightColor};
    ${props => !props.noPadding ?  'padding:'+ props.theme.space.space2 : ''};
    border-radius: ${props => props.theme.borderRadius.button};
    shadow-color: ${props => props.theme.shadow.shadowColor};
    shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
    shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
    shadow-radius: ${props => props.theme.shadow.shadowRadius}px;
    elevation: ${props => props.theme.shadow.elevation};
    margin-bottom: ${props => props.theme.space.space2};
    align-items: center;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-flow: row;
`;

const AddressBoxInfo = styled.View`
    flex: 1;
    align-items: flex-start;
`;

class BoxAddress extends Component {

    // shouldComponentUpdate(prev){
    //     console.log(prev.address)
    //     this.forceUpdate()
    //     return true
    // }
    render() {
        const { address, addressKey, onPress, choseAddressMode, theme } = this.props
        
        if (!address) return null
        return (
            <React.Fragment>
                <AddressBox onPress={() => onPress(addressKey)}>

                    <AddressBoxInfo>
                        <Subtitle1>{address.nameFormated}</Subtitle1>
                        <Space n={0} />
                        <Subtitle2 type="secondDarkColor">{address.addressFormated}</Subtitle2>
                        <Subtitle2 type="secondDarkColor">{address.complement}</Subtitle2>
                    </AddressBoxInfo>
                    <SpaceHorizontal n={2} />
                    {
                        !choseAddressMode && <EvilIcons name="chevron-right" color={theme.colors.darkColor} size={theme.sizes.icons} />
                    }
                </AddressBox>
            </React.Fragment>
        )
    }

}


function mapStateToProps({ address }, { addressKey }){
    return {
        address: address.adresses[addressKey]
    }
}

export default withTheme(connect(mapStateToProps)(BoxAddress))