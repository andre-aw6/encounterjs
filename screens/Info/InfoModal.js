import React, { Component } from "react";
import styled, { withTheme } from "styled-components/native";
import { H3, Subtitle2 } from "../../components/Typography";
import { Entypo } from "@expo/vector-icons";
import { Space } from "../../components/Space";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { connect } from "react-redux";
import { closeInfoModal } from "../../store/actions/info";
import { Modalize } from "react-native-modalize";

//
const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  background: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
`;

const Header = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.lightColor};
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
`;

const CloseButton = styled.View`
  position: absolute;
  top: 0;
  left: 0px;
  background-color: ${(props) => props.theme.colors.lightColor};
  height: 100%;
  width: 40px;
  justify-content: center;
  align-items: flex-start;
`;

const Content = styled.View`
  flex: 1;
  width: 100%;
`;

const SafeSpace = styled.View`
  height: ${getBottomSpace()}px;
  width: 1px;
`;

class InfoModal extends Component {
  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (prevProps.info.open && !this.modalRef.state.isVisible) {
      this.modalRef.open();
    }
    if (!prevProps.info.open && this.modalRef.state.isVisible) {
      this.modalRef.close();
    }
    return true;
  }
  render() {
    const { dispatch, theme, info } = this.props;
    const { content = [], title = "" } = info;
    return (
      <Modalize
        modalStyle={{ backgroundColor: theme.colors.lightColor }}
        onClosed={() => dispatch(closeInfoModal())}
        HeaderComponent={undefined}
        ref={(ref) => (this.modalRef = ref)}
      >
        <Container behavior="padding">
          <Header
            {...this.renderprops}
            onPress={() => dispatch(closeInfoModal())}
          >
            <CloseButton>
              <Entypo
                name="chevron-thin-down"
                color={theme.colors.darkColor}
                size={16}
              />
            </CloseButton>

            {<H3 center>{title}</H3>}
          </Header>
          <Space n={3} />

          <Content>
            {content.map((item, i) => (
              <React.Fragment key={i}>
                <H3 type="primaryDarkColor">{item.name}</H3>
                <Space n={0} />
                <Subtitle2>{item.description}</Subtitle2>
                <Space n={3} />
              </React.Fragment>
            ))}
          </Content>
          <SafeSpace />
        </Container>
      </Modalize>
    );
  }
}

function mapStateToProps({ info }) {
  return {
    info: info.infoModal || {},
  };
}

export default withTheme(connect(mapStateToProps)(InfoModal));
