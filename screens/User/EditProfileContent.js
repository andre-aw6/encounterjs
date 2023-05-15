import React, { useState, Component } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Numberpad from "../../components/Numberpad";
import styled from "styled-components/native";
import { Subtitle2, Subtitle3 } from "../../components/Typography";
import { Space, Bottom } from "../../components/Space";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import { useSelector, connect } from "react-redux";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Linking,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleEditUserInfo } from "../../store/actions/user";
import { RadioButton } from "../../components/RadioButton";
import { View } from "react-native-animatable";

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
      props.selected ? props.theme.colors.primaryDarkColor : "transparent"};
`;

const CustomInputText = styled.Text`
    font-size: ${(props) => props.theme.sizes.h3};
    opacity: ${(props) => (props.disabled ? ".5" : "1")};
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

class EditProfileContent extends Component {
  state = {
    name: "",
    lastname: "",
    aka: "",
    gender: "",
    document: "",
    cellphone: "",
    birthday: null,
    showDate: false,
    terms: false,
  };

  componentDidMount() {
    const { name: autocompleteName, lastname: autocompleteLastname } =
      this.props.autoCompleteRegister || {};
    if (this.props.user && this.props.user.userInfo) {
      const {
        name,
        lastname,
        preferenceName: aka,
        cellphone,
        birthdayFormatted: birthday,
        gender,
        document,
      } = this.props.user.userInfo;

      this.setState(
        {
          name: name ? name : autocompleteName || "",
          lastname: lastname ? lastname : autocompleteLastname || "",
          aka: aka ? aka : "",
          cellphone: cellphone ? cellphone : "",
          birthday: birthday ? birthday : "",
          gender: gender ? gender : "",
          document: document ? document : "",
        },
        () => {
          this.initialState = JSON.stringify(this.state);
          this.forceUpdate();
        }
      );
    } else {
      this.setState(
        {
          name: autocompleteName || "",
          lastname: autocompleteLastname || "",
        },
        () => {
          this.initialState = JSON.stringify(this.state);
          this.forceUpdate();
        }
      );
    }
  }

  cellphoneChange = (value) => {
    var numberPattern = /\d+/g;
    var valueToFormat =
      value.length !== 0
        ? value.match(numberPattern).join("").substring(0, 11)
        : value;

    var result = "";

    if (value.length == 4)
      return this.setState({ cellphone: valueToFormat[0] });

    if (valueToFormat.length >= 2)
      result += "(" + valueToFormat.substring(0, 2) + ") ";

    if (valueToFormat.length > 2) result += valueToFormat.substring(2, 7);

    if (valueToFormat.length > 7)
      result += "-" + valueToFormat.substring(7, 11);

    return this.setState({ cellphone: result == "" ? valueToFormat : result });
  };

  enableButton = () => {
    const {
      cellphone,
      name,
      lastname,
      aka,
      birthday,
      terms,
      gender,
      document,
    } = this.state;
    const hasTerms = this.props.hasTerms;

    return (
      cellphone.length == 15 &&
      name.length >= 3 &&
      lastname.length >= 3 &&
      aka.length >= 3 &&
      // birthday !== null &&
      // gender !== '' &&
      document.length == 14 &&
      ((hasTerms && terms) || !hasTerms) &&
      this.initialState !== JSON.stringify(this.state)
    );
  };

  handleConfirmDate = (date) => {
    const toDate = (date) => {
      const day = date.getDate().toString();
      const dayF = day.length == 1 ? "0" + day : day;
      const month = (date.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
      const monthF = month.length == 1 ? "0" + month : month;
      const yearF = date.getFullYear();
      return dayF + "/" + monthF + "/" + yearF;
    };

    this.setState({ birthday: toDate(date), showDate: false });
  };

  handleCancelDate = () => {
    this.setState({ showDate: false });
  };

  saveInfo = () => {
    const {
      cellphone,
      name,
      lastname,
      aka,
      birthday,
      terms,
      gender,
      document,
    } = this.state;
    this.props
      .dispatch(
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
      )
      .then((_) => {
        if (
          this.props.user &&
          this.props.user.pendences &&
          this.props.hasTerms &&
          this.props.user.pendences.length > 0
        )
          this.props.navigation.navigate("SelfUpload");
      });
    Keyboard.dismiss();
    this.initialState = JSON.stringify(this.state);
  };

  nameChange = (value) => {
    this.setState({ name: value });

    if (this.state.aka == "" || this.state.aka == this.state.name)
      this.setState({ aka: value });
  };

  openTerms(type) {
    Linking.openURL(this.props.terms[type]);
  }

  render() {
    const { cellphone, terms } = this.state;
    const hasTerms = this.props.hasTerms;

    const { user = {} } = this.props.user;
    // <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
    return (
      <View flex={1}>
        <KeyboardAvoidingView
          style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
          behavior={Platform.OS == "ios" ? "padding" : undefined}
          enabled
          keyboardVerticalOffset={100}
        >
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            <ContainerInputs>
              <React.Fragment>
                <Subtitle2>Nome</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  value={this.state.name}
                  onChangeText={(value) => this.nameChange(value)}
                />
                <Space n={2} />
              </React.Fragment>

              <React.Fragment>
                <Subtitle2>Sobrenome</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  value={this.state.lastname}
                  onChangeText={(value) => this.setState({ lastname: value })}
                />
                <Space n={2} />
              </React.Fragment>

              <React.Fragment>
                <Subtitle2>Como prefere ser chamado</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  value={this.state.aka}
                  onChangeText={(value) => this.setState({ aka: value })}
                />
                <Space n={2} />
              </React.Fragment>

              <React.Fragment>
                <Opacity>
                  <Subtitle2>E-mail</Subtitle2>
                </Opacity>
                <Space n={1} />
                <Input field value={user.email} disabled />
                <Space n={2} />
              </React.Fragment>

              <React.Fragment>
                <Opacity>
                  <Subtitle2>CPF</Subtitle2>
                </Opacity>
                <Space n={1} />

                <Input
                  field
                  placeholder="XXX.XXX.XXX-XX"
                  format={(value) => {
                    value = value.replace(/(\.|\/|\-)/g, "");
                    return value.replace(
                      /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                      "$1.$2.$3-$4"
                    );
                  }}
                  maxLength={18}
                  keyboardType="number-pad"
                  disabled={this.props.isEdit}
                  value={this.state.document}
                  onChangeText={(value) => this.setState({ document: value })}
                />
                <Space n={2} />
              </React.Fragment>

              <React.Fragment>
                <Subtitle2>{"Número de telefone"}</Subtitle2>
                <Space n={1} />
                <CustomInput
                  placeholder="(xx) xxxxx-xxxx"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  maxLength={15}
                  value={cellphone}
                  onChangeText={(value) => this.cellphoneChange(value)}
                />
                <Space n={2} />
              </React.Fragment>

              <DateTimePickerModal
                isVisible={this.state.showDate}
                mode="date"
                locale="pt-br"
                headerTextIOS="Data de nascimento"
                maximumDate={new Date()}
                onConfirm={(date) => this.handleConfirmDate(date)}
                onCancel={() => this.handleCancelDate()}
                // onCancel={hideDatePicker}
              />

              <React.Fragment>
                <Subtitle2>
                  {"Data de nascimento"} <Subtitle3>(Opcional)</Subtitle3>{" "}
                </Subtitle2>
                <Space n={1} />
                <InputDate onPress={() => this.setState({ showDate: true })}>
                  {this.state.birthday ? (
                    <CustomInputText hasValue>
                      {this.state.birthday}
                    </CustomInputText>
                  ) : (
                    <CustomInputText>dd/mm/aaaa</CustomInputText>
                  )}
                </InputDate>
                <Space n={2} />
              </React.Fragment>

              <React.Fragment>
                <Subtitle2>
                  {"Gênero que mais se identifica"}{" "}
                  <Subtitle3>(Opcional)</Subtitle3>
                </Subtitle2>
                <Space n={1} />
                <Line>
                  {["Feminino", "Masculino", "Outro"].map((gender) => (
                    <RadioButton
                      key={gender}
                      isLast={gender == "Outro"}
                      isSelected={this.state.gender == gender}
                      onPress={() => this.setState({ gender })}
                    >
                      {gender}
                    </RadioButton>
                  ))}
                </Line>

                <Space n={2} />
              </React.Fragment>

              <Space n={3} />

              {hasTerms && (
                <Line>
                  <CheckLine onPress={() => this.setState({ terms: !terms })}>
                    <Check selected={terms} />
                  </CheckLine>
                  <LineRow>
                    <Subtitle2 width="auto">Li e concordo com os </Subtitle2>
                    <TermsAndConditions onPress={() => this.openTerms("terms")}>
                      <Subtitle2 width="auto" underline>
                        Termos e Condições
                      </Subtitle2>
                    </TermsAndConditions>
                    <Subtitle2 width="auto"> e </Subtitle2>
                    <TermsAndConditions
                      onPress={() => this.openTerms("policy")}
                    >
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
                disabled={!this.enableButton()}
                onPress={() => this.saveInfo()}
                type="CallToAction-Light"
              >
                {hasTerms ? "Confirmar" : "Salvar"}
              </Button>
            </LineButtons>
            <Bottom />
          </Content>
          {/* <Numberpad /> */}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    autoCompleteRegister: state.user && state.user.autoCompleteRegister,
    terms: state.app.terms,
  };
}

export default connect(mapStateToProps)(EditProfileContent);
