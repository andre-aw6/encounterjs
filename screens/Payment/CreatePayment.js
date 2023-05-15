import React, { Component } from 'react';
import ScreenPopup from "../../components/ScreenPopup";
import styled, { withTheme } from 'styled-components/native';
import { connect } from 'react-redux';
import { Button } from '../../components/Button';
import { Subtitle2 } from '../../components/Typography';
import { Space, SpaceHorizontal, Bottom } from '../../components/Space';
import Input from '../../components/Input';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { handleCreateOrEditPayment, handleRemoveCurrentPayment, handleSetCurrentPayment, handleRemoveCurrentPaymentConfirmModal } from '../../store/actions/payments';
import HideInfo from '../../components/HideInfo';

const Container = styled.View`
    flex: 1;
    height: 100%
`;
const Content = styled.ScrollView`    
    height: 100%;
    flex-direction: column;
    padding: ${props => props.theme.space.space2};
`;

const ContentInput = styled.View`
    flex-grow: 1;
`;

const ContentButton = styled.View`
    margin-top: ${props => props.theme.space.space3};
`;

const Line = styled.View`
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
`;

const FlexItem = styled.View`
    flex: 1;
`;

const CustomInput = styled.View`
    border: 1.5px solid ${props => props.theme.colors.primaryColor};
    background: ${props => props.theme.colors.primaryLightColor};
    padding-left: ${props => props.theme.space.space2};
    border-radius: ${props => props.theme.borderRadius.button};
    height: 48px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    flex-flow: row;
    opacity: .5;
`;

const CustomInputText = styled.Text`
    font-size: ${props => props.theme.sizes.h3};
    opacity: ${props => props.disabled ? '.5' : '1'};
    color: ${props => props.theme.colors.darkColor};
`;





function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
        } else {
            last.push(array[i]);
        }
    }
    return chunked_arr;
}

class CreatePayment extends Component {

    state = {
        card_number: '',
        card_expiration_date: '',
        card_holder_name: '',
        card_cvv: '',
        card_document: '',
        isEdit: false
    }

    onBack = () => {
        this.props.dispatch(handleSetCurrentPayment(undefined))
    }

    componentDidMount() {


        if (this.props.currentPayment) {
            const { card_number, card_expiration_date, card_holder_name, card_cvv, card_document } = this.props.currentPayment

            this.setState({ card_number, card_expiration_date, card_holder_name, card_cvv, card_document, isEdit: true }, () => {
                this.initialState = JSON.stringify(this.state)
                this.forceUpdate()
            })

        }

    }


    enableButton = () => {

        return this.state.card_number.length == 19
            && this.state.card_expiration_date.length == 5
            && this.state.card_cvv.length == 3
            && this.state.card_holder_name.length > 3
            && (this.state.card_document.length == 14 || this.state.card_document.length == 18)
            && (!this.state.isEdit || JSON.stringify(this.state) != this.initialState)
    }

    submit = () => {
        Keyboard.dismiss()
        const { card_number, card_expiration_date, card_holder_name, card_cvv, card_document } = this.state
        this.props.dispatch(handleCreateOrEditPayment(card_number, card_expiration_date, card_holder_name, card_cvv, card_document))
            .then(r => {
                if (r) {
                    this.props.navigation.navigate('Payments')

                    if (this.props.choseMode)
                        this.props.navigation.goBack()
                }
            })
    }

    delete = () => {
        this.props.dispatch(handleRemoveCurrentPaymentConfirmModal())
            .then(result => result && this.props.navigation.goBack())
        // ;
    }

    render() {


        return <ScreenPopup noScroll onBack={() => this.onBack()}
            title={"Cartão de Crédito"}
            withBorder>

            <KeyboardAvoidingView  style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior={Platform.OS == "ios" ? "padding": undefined} enabled keyboardVerticalOffset={100}>

                <Content contentContainerStyle={{  flexGrow: 1, }}>
                    <ContentInput >

                        <Space n={3} />

                        <React.Fragment>
                            <Subtitle2 type={this.props.isEdit ? "secondDarkColor" : "darkColor"}>Número do cartão</Subtitle2>
                            <Space n={1} />
                            {
                                this.state.isEdit ?
                                    <CustomInput>
                                        <HideInfo size={3} n={4} />
                                        <SpaceHorizontal n={1} />
                                        <HideInfo size={3} n={4} />
                                        <SpaceHorizontal n={1} />
                                        <HideInfo size={3} n={4} />
                                        <SpaceHorizontal n={1} />
                                        <CustomInputText>
                                            {this.state.card_number}
                                        </CustomInputText>
                                    </CustomInput> :
                                    <Input field
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        value={this.state.card_number}
                                        format={(value) => {
                                            let valueToFormat = value.split(' ').join('');
                                            return chunk(valueToFormat.split(''), 4).map(i => i.join('')).join(' ') //chunk(valueToFormat.split(''), 4).join(' ');
                                        }}
                                        keyboardType="number-pad"
                                        maxLength={19}
                                        onChangeText={(value) => this.setState({ card_number: value })}
                                    />

                            }




                            <Space n={2} />
                        </React.Fragment>

                        <Line>

                            <FlexItem>
                                <Subtitle2 type={this.props.isEdit ? "secondDarkColor" : "darkColor"}>Validade</Subtitle2>
                                <Space n={1} />
                                <Input field
                                    placeholder="mm/aa"
                                    disabled={this.props.isEdit}
                                    value={this.state.card_expiration_date}

                                    format={(value) => {
                                        let valueToFormat = value.split('/').join('');
                                        if (valueToFormat.length > 2)
                                            valueToFormat = valueToFormat.slice(0, 2) + '/' + valueToFormat.slice(2)
                                        return valueToFormat;
                                    }}
                                    keyboardType="number-pad"
                                    maxLength={5}
                                    onChangeText={(value) => this.setState({ card_expiration_date: value })} />
                                <Space n={2} />
                            </FlexItem>
                            <SpaceHorizontal n={2} />

                            <FlexItem>
                                <Subtitle2 type={this.props.isEdit ? "secondDarkColor" : "darkColor"}>CVV</Subtitle2>
                                <Space n={1} />
                                {
                                    this.state.isEdit ?
                                        <CustomInput>
                                            <HideInfo size={3} n={3} />
                                        </CustomInput> :
                                        <Input
                                            field
                                            placeholder="CVV"
                                            keyboardType="number-pad"
                                            maxLength={3}
                                            value={this.state.card_cvv}
                                            onChangeText={(value) => this.setState({ card_cvv: value })} />


                                }

                                <Space n={2} />
                            </FlexItem>

                        </Line>


                        <React.Fragment>
                            <Subtitle2 type={this.props.isEdit ? "secondDarkColor" : "darkColor"}>Nome do titular</Subtitle2>
                            <Space n={1} />
                            <Input field
                                placeholder="Nome igual ao cartão"
                                autoCapitalize="characters"
                                disabled={this.props.isEdit}
                                value={this.state.card_holder_name} onChangeText={(value) => this.setState({ card_holder_name: value })} />
                            <Space n={2} />
                        </React.Fragment>


                        <Line>
                            <FlexItem>
                                <Subtitle2
                                    disabled={this.props.isEdit}
                                    type={this.props.isEdit ? "secondDarkColor" : "darkColor"}>CPF/CNPJ do titular</Subtitle2>
                                <Space n={1} />
                                <Input
                                    field
                                    placeholder="XXX.XXX.XXX-XX"
                                    value={this.state.card_document}
                                    format={value => {
                                        value = value.replace(/(\.|\/|\-)/g, "");

                                        if (value.length <= 11)
                                            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4");
                                        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
                                    }}
                                    maxLength={18}
                                    keyboardType="number-pad"
                                    disabled={this.props.isEdit}
                                    onChangeText={(value) => this.setState({ card_document: value })} />
                                <Space n={2} />
                            </FlexItem>
                            <FlexItem />
                        </Line>

                    </ContentInput>
                    <ContentButton>
                    {this.state.isEdit ? <Button onPress={() => this.delete()} type="CallToAction-Outline-Flex" >Excluir</Button> : <Button disabled={!this.enableButton() || this.props.loading} onPress={() => this.submit()} type="CallToAction-Light">Salvar</Button>}
                    </ContentButton>
                    <Bottom />
                </Content>
            </KeyboardAvoidingView>


        </ScreenPopup>
    }
}

function mapStateToProps({ user, payments }) {
    return {
        user,
        choseMode: !!payments.choseMode,
        loading: !!payments.loading,
        isEdit: !!payments.currentPaymentKey,
        currentPayment: payments.currentPaymentKey ? payments.paymentMethods.find(f => f.key == payments.currentPaymentKey) : undefined
    }
}

export default connect(mapStateToProps)(withTheme(CreatePayment))