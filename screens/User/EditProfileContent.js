import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Subtitle2, Subtitle3 } from '../../components/Typography';
import { Space, Bottom } from '../../components/Space';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { connect } from 'react-redux';
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Linking,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { handleEditUserInfo } from '../../store/actions/user';
import { RadioButton } from '../../components/RadioButton';
import { View } from 'react-native-animatable';

const Content = styled.ScrollView`
  flex: 1;
  padding: ${(props) => props.theme.space.space2};
`;

const ContainerInputs = styled.View`
  flex: 1;
`;

const Opacity = styled.View`
  opacity: 0.5;
`;

const CustomInput = styled.TextInput`
    border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
    background: ${(props) => props.theme.colors.primaryLightColor};
    padding-left: ${(props) => props.theme.space.space2};
    border-radius: ${(props) => props.theme.borderRadius.button};
    height: 48px
    width: 50%;
    justify-content: center;
`;

const InputDate = styled.TouchableOpacity`
    border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
    background: ${(props) => props.theme.colors.primaryLightColor};
    padding-left: ${(props) => props.theme.space.space2};
    border-radius: ${(props) => props.theme.borderRadius.button};
    height: 48px;
    width: 50%;
    justify-content: center;
`;

const Line = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`;

const LineRow = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
    flex: 1;
`;

const CheckLine = styled.TouchableOpacity`
  flex-flow: row;
  height: 100%;
`;

const Check = styled.View`
    width: ${(props) => props.theme.space.space2};
    height: ${(props) => props.theme.space.space2};
    margin-right: ${(props) => props.theme.space.space1};
    border: 1px ${(props) => props.theme.colors.primaryDarkColor};
    borderRadius: 2px;
    margin-top: ${(props) => props.theme.space.space0};
    background: ${(props) =>
      props.selected ? props.theme.colors.primaryDarkColor : 'transparent'};
`;

const CustomInputText = styled.Text`
    font-size: ${(props) => props.theme.sizes.h3};
    opacity: ${(props) => (props.disabled ? '.5' : '1')};
    color: ${(props) =>
      props.hasValue
        ? props.theme.colors.darkColor
        : props.theme.colors.secondColor};
`;

const TermsAndConditions = styled.TouchableOpacity`
  flex-flow: row;
`;

const LineButtons = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${(props) => props.theme.space.space3};
`;

const EditProfileContent = ({
  user,
  autoCompleteRegister,
  dispatch,
  navigation,
  isEdit,
  hasTerms,
}) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [aka, setAka] = useState('');
  const [gender, setGender] = useState('');
  const [document, setDocument] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [terms, setTerms] = useState(false);
  const [initialState, setInitialState] = useState('');

  useEffect(() => {
    const { name: autocompleteName, lastname: autocompleteLastname } =
      autoCompleteRegister || {};
    if (user && user.userInfo) {
      const {
        name,
        lastname,
        preferenceName: aka,
        cellphone,
        birthdayFormatted: birthday,
        gender,
        document,
      } = user.userInfo;
      setName(name ? name : autocompleteName || '');
      setLastname(lastname ? lastname : autocompleteLastname || '');
      setAka(aka ? aka : '');
      setCellphone(cellphone ? cellphone : '');
      setBirthday(birthday ? birthday : null);
      setGender(gender ? gender : '');
      setDocument(document ? document : '');
      setInitialState(
        JSON.stringify({
          name: name ? name : autocompleteName || '',
          lastname: lastname ? lastname : autocompleteLastname || '',
          aka: aka ? aka : '',
          cellphone: cellphone ? cellphone : '',
          birthday: birthday ? birthday : null,
          gender: gender ? gender : '',
          document: document ? document : '',
        })
      );
    } else {
      setName(autocompleteName || '');
      setLastname(autocompleteLastname || '');
      setInitialState(
        JSON.stringify({
          name: autocompleteName || '',
          lastname: autocompleteLastname || '',
        })
      );
    }
  }, [user, autoCompleteRegister]);

  const cellphoneChange = (value) => {
    var numberPattern = /\d+/g;
    var valueToFormat =
      value.length !== 0
        ? value.match(numberPattern).join('').substring(0, 11)
        : value;
    var result = '';

    if (value.length == 4) return setCellphone(valueToFormat[0]);

    if (valueToFormat.length >= 2)
      result += '(' + valueToFormat.substring(0, 2) + ') ';

    if (valueToFormat.length > 2) result += valueToFormat.substring(2, 7);

    if (valueToFormat.length > 7)
      result += '-' + valueToFormat.substring(7, 11);

    setCellphone(result == '' ? valueToFormat : result);
  };

  const enableButton = () => {
    const hasTerms = hasTerms;
    return (
      cellphone.length == 15 &&
      name.length >= 3 &&
      lastname.length >= 3 &&
      aka.length >= 3 &&
      // birthday !== null &&
      // gender !== '' &&
      document.length == 14 &&
      ((hasTerms && terms) || !hasTerms) &&
      initialState !==
        JSON.stringify({
          cellphone,
          name,
          lastname,
          aka,
          birthday,
          terms,
          gender,
          document,
        })
    );
  };

  const handleConfirmDate = (date) => {
    const toDate = (date) => {
      const day = date.getDate().toString();
      const dayF = day.length == 1 ? '0' + day : day;
      const month = (date.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
      const monthF = month.length == 1 ? '0' + month : month;
      const yearF = date.getFullYear();
      return dayF + '/' + monthF + '/' + yearF;
    };
    setBirthday(toDate(date));
    setShowDate(false);
  };

  const handleCancelDate = () => {
    setShowDate(false);
  };

  const saveInfo = () => {
    dispatch(
      handleEditUserInfo(
        name,
        lastname,
        aka,
        birthday,
        cellphone,
        terms,
        gender,
        document
      )
    ).then((_) => {
      if (user && user.pendences && hasTerms && user.pendences.length > 0)
        navigation.navigate('SelfUpload');
    });
    Keyboard.dismiss();
    setInitialState(
      JSON.stringify({
        cellphone,
        name,
        lastname,
        aka,
        birthday,
        terms,
        gender,
        document,
      })
    );
  };

  const nameChange = (value) => {
    setName(value);
    if (aka == '' || aka == name) setAka(value);
  };

  const openTerms = (type) => {
    Linking.openURL(terms[type]);
  };

  return (
    <View flex={1}>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
        keyboardVerticalOffset={100}>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <ContainerInputs>
            <>
              <Subtitle2>Nome</Subtitle2>
              <Space n={1} />
              <Input
                field
                value={name}
                onChangeText={(value) => nameChange(value)}
              />
              <Space n={2} />
            </>
            <>
              <Subtitle2>Sobrenome</Subtitle2>
              <Space n={1} />
              <Input
                field
                value={lastname}
                onChangeText={(value) => setLastname(value)}
              />
              <Space n={2} />
            </>

            <>
              <Subtitle2>Como prefere ser chamado</Subtitle2>
              <Space n={1} />
              <Input
                field
                value={aka}
                onChangeText={(value) => setAka(value)}
              />
              <Space n={2} />
            </>

            <>
              <Opacity>
                <Subtitle2>E-mail</Subtitle2>
              </Opacity>
              <Space n={1} />
              <Input field value={user?.email} disabled />
              <Space n={2} />
            </>

            <>
              <Opacity>
                <Subtitle2>CPF</Subtitle2>
              </Opacity>
              <Space n={1} />

              <Input
                field
                placeholder="XXX.XXX.XXX-XX"
                format={(value) => {
                  value = value.replace(/(\.|\/|\-)/g, '');
                  return value.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                    '$1.$2.$3-$4'
                  );
                }}
                maxLength={18}
                keyboardType="number-pad"
                disabled={isEdit}
                value={document}
                onChangeText={(value) => setDocument(value)}
              />
              <Space n={2} />
            </>

            <>
              <Subtitle2>{'Número de telefone'}</Subtitle2>
              <Space n={1} />
              <CustomInput
                placeholder="(xx) xxxxx-xxxx"
                keyboardType="number-pad"
                autoCorrect={false}
                maxLength={15}
                value={cellphone}
                onChangeText={(value) => cellphoneChange(value)}
              />
              <Space n={2} />
            </>

            <DateTimePickerModal
              isVisible={showDate}
              mode="date"
              locale="pt-br"
              headerTextIOS="Data de nascimento"
              maximumDate={new Date()}
              onConfirm={(date) => handleConfirmDate(date)}
              onCancel={() => handleCancelDate()}
              // onCancel={hideDatePicker}
            />
            <>
              <Subtitle2>
                {'Data de nascimento'} <Subtitle3>(Opcional)</Subtitle3>{' '}
              </Subtitle2>
              <Space n={1} />
              <InputDate onPress={() => setShowDate(true)}>
                {birthday ? (
                  <CustomInputText hasValue>{birthday}</CustomInputText>
                ) : (
                  <CustomInputText>dd/mm/aaaa</CustomInputText>
                )}
              </InputDate>
              <Space n={2} />
            </>

            <>
              <Subtitle2>
                {'Gênero que mais se identifica'}{' '}
                <Subtitle3>(Opcional)</Subtitle3>
              </Subtitle2>
              <Space n={1} />
              <Line>
                {['Feminino', 'Masculino', 'Outro'].map((gender) => (
                  <RadioButton
                    key={gender}
                    isLast={gender == 'Outro'}
                    isSelected={gender == gender}
                    onPress={() => setGender(gender)}>
                    {gender}
                  </RadioButton>
                ))}
              </Line>

              <Space n={2} />
            </>

            <Space n={3} />

            {hasTerms && (
              <Line>
                <CheckLine onPress={() => setTerms(!terms)}>
                  <Check selected={terms} />
                </CheckLine>
                <LineRow>
                  <Subtitle2 width="auto">Li e concordo com os </Subtitle2>
                  <TermsAndConditions onPress={() => openTerms('terms')}>
                    <Subtitle2 width="auto" underline>
                      Termos e Condições
                    </Subtitle2>
                  </TermsAndConditions>
                  <Subtitle2 width="auto"> e </Subtitle2>
                  <TermsAndConditions onPress={() => openTerms('policy')}>
                    <Subtitle2 width="auto" underline>
                      Política de Privacidade
                    </Subtitle2>
                  </TermsAndConditions>
                </LineRow>
              </Line>
            )}

            <Space n={3} />
          </ContainerInputs>
          <LineButtons>
            <Button
              disabled={!enableButton()}
              onPress={() => saveInfo()}
              type="CallToAction-Light">
              {hasTerms ? 'Confirmar' : 'Salvar'}
            </Button>
          </LineButtons>
          <Bottom />
        </Content>
        {/* <Numberpad /> */}
      </KeyboardAvoidingView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    autoCompleteRegister: state.user && state.user.autoCompleteRegister,
    terms: state.app.terms,
  };
}

export default connect(mapStateToProps)(EditProfileContent);
