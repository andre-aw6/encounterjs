import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Subtitle2, H3 } from '../../../components/Typography';
import { Space, SpaceHorizontal, Bottom } from '../../../components/Space';
import Input from '../../../components/Input';
import { Button } from '../../../components/Button';
import { connect } from 'react-redux';
import ScreenPopup from '../../../components/ScreenPopup';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import {
  handleAddOrEditAddress,
  handleRemoveAddressConfirmModal,
} from '../../../store/actions/address';
import { View } from 'react-native-animatable';
import Icons from '../../../components/Icons';

const Content = styled.ScrollView`
    flex: 1;
    padding: ${(props) => props.theme.space.space2};
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
    margin-top: ${(props) => props.theme.space.space3};
`;

const LineAddress = styled.View`
    flex-flow: row;
    align-items: center;
`;

const Column = styled.View`
    flex-flow: column;
    flex: 1; 
`;

function AddAddress({ currentLocation, dispatch, navigation, theme }) {
  const initialState = JSON.stringify({
    cep: currentLocation.cep ? currentLocation.cep : '',
    number: '',
    complement: '',
    reference: '',
    name: '',
    isEdit: false,
  });
  const [state, setState] = useState(JSON.parse(initialState));

  useEffect(() => {
    if (currentLocation.key) {
      const { name, complement, number, reference, cep } = currentLocation;
      setState({ name, complement, number, reference, cep, isEdit: true });
    }
  }, []);

  const enableButton = () => {
    const { number } = state;
    return number.length > 0 && JSON.stringify(state) !== initialState;
  };

  const formatCep = (value) => {
    var numberPattern = /\d+/g;
    var valueToFormat =
      value.length !== 0
        ? value.match(numberPattern).join('').substring(0, 11)
        : value;
    if (valueToFormat.length >= 6)
      setState({
        ...state,
        cep: valueToFormat.substring(0, 5) + '-' + valueToFormat.substring(5),
      });
    else setState({ ...state, cep: valueToFormat });
  };

  const deleteAddress = () => {
    dispatch(handleRemoveAddressConfirmModal()).then(
      (r) => r && navigation.goBack()
    );
  };

  const saveAddress = () => {
    Keyboard.dismiss();
    const { name, complement, number, reference, cep } = state;
    dispatch(
      handleAddOrEditAddress(number, complement, reference, name, cep)
    ).then((result) => {
      if (result) navigation.navigate('Address');
      if (!choseAddressMode) navigation.goBack();
    });
  };

  return (
    <ScreenPopup noScroll withBorder title={'Endereços'}>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
        keyboardVerticalOffset={100}>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <ContainerInputs>
            <LineAddress>
              <Icons
                name="location-pin"
                color={theme.colors.darkColor}
                size={24}
              />
              <SpaceHorizontal n={2} />
              <Column>
                <H3>{currentLocation.street}</H3>
                <Subtitle2>
                  {currentLocation.neighborhood} - {currentLocation.city}/
                  {currentLocation.state}
                </Subtitle2>
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
                  disabled={state.isEdit}
                  keyboardType="number-pad"
                  maxLength={9}
                  value={state.cep}
                  onChangeText={(value) => formatCep(value)}
                />
              </ContainerInputs>
              <SpaceHorizontal n={2} />
              <ContainerInputs>
                <Subtitle2>Número*</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  placeholder="Insira o número"
                  value={state.number}
                  onChangeText={(value) =>
                    setState({ ...state, number: value })
                  }
                />
              </ContainerInputs>
            </Line>

            <Space n={2} />

            <Line>
              <ContainerInputs>
                <Subtitle2>Complemento</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  placeholder="Ex: Apartamento 123"
                  value={state.complement}
                  onChangeText={(value) =>
                    setState({ ...state, complement: value })
                  }
                />
              </ContainerInputs>
            </Line>

            <Space n={2} />

            <Line>
              <ContainerInputs>
                <Subtitle2>Referência</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  placeholder="Ex: Ao lado do mercado"
                  value={state.reference}
                  onChangeText={(value) =>
                    setState({ ...state, reference: value })
                  }
                />
              </ContainerInputs>
            </Line>

            {state.isEdit && (
              <>
                <Space n={3} />

                <View animation="fadeIn" duration={500}>
                  <LineButtons>
                    <Button secondary onPress={deleteAddress}>
                      <Icons
                        name="trash"
                        color={theme.colors.primaryColor}
                        size={24}
                      />
                      <SpaceHorizontal n={2} />
                      <Subtitle2 color={theme.colors.primaryColor}>
                        Remover endereço
                      </Subtitle2>
                    </Button>
                  </LineButtons>
                </View>
              </>
            )}
          </ContainerInputs>
        </Content>

        <Bottom>
          <Button disabled={!enableButton()} onPress={saveAddress}>
            <Subtitle2 color={theme.colors.lightColor}>
              {state.isEdit ? 'Editar endereço' : 'Salvar endereço'}
            </Subtitle2>
          </Button>
        </Bottom>
      </KeyboardAvoidingView>
    </ScreenPopup>
  );
}

export default withTheme(connect()(AddAddress));
