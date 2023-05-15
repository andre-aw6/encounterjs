import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { withTheme } from 'styled-components/native';
import { translation } from '../texts';
import Icons from '../components/Icons';

const TabNav = styled.View`
  height: 56px;
  background: #ffffff;
  width: 100%;
  flex-flow: row;
  elevation: 1;
`;

export const Text = styled.Text`
font-size: 13px;
font-family: ${props => props.isSelected ? 'Nunito-Bold' : 'Nunito'};
color: ${props => props.isSelected ? props.theme.colors.primaryDarkColor : props.theme.colors.secondDarkColor};
`;

const NavItem = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const icons = {
  "Início": "home",
  "Busca": "magnifier",
  [translation("menu.orders")]: "handbag",
  "Perfil": "user",
}

const Icon = (props) => {
  return <Icons name={props.name} size={16} color={props.color} />
}

const TabNavigator = withTheme((props) => {
  const activeRouteIndex = props.state.index
  
  console.log("Rendering tab navigator...");

  return (
    <TabNav>
      {
        props.state.routes.map((item, index) => (
          <NavItem 
            key={index}
            onPress={() => {
              console.log(`Navigating to ${item.name}...`);
              props.navigation.navigate(item.name)
            }}>
            <Icon 
              name={icons[item.name]} 
              size={20} 
              color={index == activeRouteIndex ? props.theme.colors.primaryDarkColor : props.theme.colors.secondDarkColor} 
            />
            <Text isSelected={index == activeRouteIndex}>{item.name}</Text>
          </NavItem>
        ))
      }
    </TabNav>
  )
});

export default TabNavigator;