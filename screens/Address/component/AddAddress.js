import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import styled, { withTheme } from 'styled-components/native';
import { Subtitle2, H3 } from '../../../components/Typography';
import { Space, SpaceHorizontal, Bottom } from '../../../components/Space';
import Input from '../../../components/Input';
import { Button } from '../../../components/Button';
import { connect } from 'react-redux';
import ScreenPopup from '../../../components/ScreenPopup';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { handleAddOrEditAddress, handleRemoveAddress, handleRemoveAddressConfirmModal } from '../../../store/actions/address';
import { View } from 'react-native-animatable';
import Icons from '../../../components/Icons';

const Content = styled.ScrollView`
    flex: 1;
    padding: ${props => props.theme.space.space2};
`;

const ContainerInputs = styled.View`
    flex:1;
`;

const Line = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
    width: 100%;
`;

const LineButtons = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
    width: 100%;
    margin-top: ${props => props.theme.space.space3};
`;

const LineAddress = styled.View`
    flex-flow: row;
    align-items: center;
`;

const Column = styled.View`
    flex-flow: column;
    flex: 1; 
`;


class AddAddress extends Component {

    state = {
        cep: '',
        number: '',
        complement: '',
        reference: '',
        name: '',
        isEdit: false
    }


    componentDidMount() {

        if (this.props.currentLocation.cep)
            this.setState({ cep: this.props.currentLocation.cep })

        if (this.props.currentLocation.key) {
            const { name, complement, number, reference, cep } = this.props.currentLocation

            this.setState({ name, complement, number, reference, cep, isEdit: true }, () => {
                this.initialState = JSON.stringify(this.state)
                this.forceUpdate()
            })

        }

    }


    enableButton = () => {

        const { number } = this.state;
        return number.length > 0 &&
            JSON.stringify(this.state) != this.initialState

    }

    formatCep = (value) => {
        var numberPattern = /\d+/g;
        var valueToFormat = value.length !== 0 ? value.match(numberPattern).join('').substring(0, 11) : value
        // console.log(valueToFormat.slice)
        if (valueToFormat.length >= 6)
            this.setState({ cep: valueToFormat.substring(0, 5) + "-" + valueToFormat.substring(5) })
        else
            this.setState({ cep: valueToFormat })
    }

    delete = () => {
        this.props.dispatch(handleRemoveAddressConfirmModal())
            .then(r => r && this.props.navigation.goBack())

    }

    saveInfo = () => {

        Keyboard.dismiss()

        const { name, complement, number, reference, cep } = this.state

        this.props.dispatch(handleAddOrEditAddress(number, complement, reference, name, cep))
            .then(result => {
                if (result)
                    this.props.navigation.navigate("Address")

                if (this.props.choseAddressMode)
                    this.props.navigation.goBack()

            })

    }


    render() {


        // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        return (<ScreenPopup noScroll withBorder title={"Endereços"}>

            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior={Platform.OS == "ios" ? "padding": undefined} enabled keyboardVerticalOffset={100}>

                <Content contentContainerStyle={{ flexGrow: 1, }}>

                    <ContainerInputs>
                        <LineAddress>

                            <Icons name="location-pin" color={this.props.theme.colors.darkColor} size={24} />
                            <SpaceHorizontal n={2} />
                            <Column>
                                <H3>{this.props.currentLocation.street}</H3>
                                <Subtitle2>{this.props.currentLocation.neighborhood} - {this.props.currentLocation.city}/{this.props.currentLocation.state}</Subtitle2>
                            </Column>
                        </LineAddress>
                        <Space n={4} />

                        <Line>
                            <ContainerInputs>
                                <Subtitle2>CEP*</Subtitle2>
                                <Space n={1} />
                                <Input
                                    field
                                    placeholder="CEP"
                                    disabled={this.state.isEdit}
                                    keyboardType="number-pad"
                                    maxLength={9}
                                    value={this.state.cep}
                                    onChangeText={(value) => this.formatCep(value)} />

                            </ContainerInputs>
                            <SpaceHorizontal n={2} />

                            <ContainerInputs>
                                <Subtitle2>Número*</Subtitle2>
                                <Space n={1} />
                                <Input field placeholder="Insira o número" value={this.state.number} onChangeText={(value) => this.setState({ number: value })} />

                            </ContainerInputs>

                        </Line>
                        <Space n={2} />
                        <Subtitle2>Complemento</Subtitle2>
                        <Space n={1} />
                        <Input field placeholder="Apto/Bloco/Casa" value={this.state.complement} onChangeText={(value) => this.setState({ complement: value })} />
                        <Space n={2} />
                        <Line>
                            <ContainerInputs>
                                <Subtitle2>Ponto de referência</Subtitle2>
                                <Space n={1} />
                                <Input field placeholder="Ponto de referência" value={this.state.reference} onChangeText={(value) => this.setState({ reference: value })} />

                            </ContainerInputs>
                        </Line>
                        <Space n={2} />

                        <Line>
                            <ContainerInputs>
                                <Subtitle2>Nomear como</Subtitle2>
                                <Space n={1} />
                                <Input field placeholder="Ex: casa, trabalho" value={this.state.name} onChangeText={(value) => this.setState({ name: value })} />
                                <Space n={2} />
                            </ContainerInputs>
                            <SpaceHorizontal n={2} />
                            <ContainerInputs />


                        </Line>
                    </ContainerInputs>

                    {
                        this.state.isEdit ? <LineButtons>
                            <View flex={1}>
                                <Button onPress={() => this.delete()} type="CallToAction-Outline-Flex" >Excluir</Button>
                            </View>
                            <SpaceHorizontal n={2} />
                            <View flex={1}>
                                <Button disabled={!this.enableButton()} onPress={() => this.saveInfo()} type="CallToAction-Light-Small">Salvar</Button>
                            </View>
                        </LineButtons> : <Button disabled={!this.enableButton()} onPress={() => this.saveInfo()} type="CallToAction-Light-Small">Salvar</Button>
                    }
                    <Bottom/>
                </Content>
            </KeyboardAvoidingView>
        </ScreenPopup>)
    }

}

function mapStateToProps(state) {
    return {
        currentLocation: state.address.currentLocation,
        choseAddressMode: !!state.address.choseAddressMode
    }
}

export default withTheme(connect(mapStateToProps)(AddAddress))