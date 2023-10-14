import React from 'react';
import styled from 'styled-components/native';


const Text = styled.Text`
  font-family: 'Nunito';
`;

const CustomText = (props) => <Text {...props}>{props.children}</Text>;

export default CustomText;