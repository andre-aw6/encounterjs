import React, { useState } from 'react';
import styled from 'styled-components/native';
import { H3 } from './Typography';

const Container = styled.View`
    flex: 1;
`;

const Tab = styled.View`
    width: 100%;
    flex-flow: row; 
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    border-color: ${props => props.isActive ? props.theme.colors.primaryDarkColor : 'transparent'};
    border-bottom-width: 1.5px;
    justify-content: center;
    align-items:center;
    padding: ${props => props.theme.space.space1};
`;

export default (props) => {
    const [tabActive, setTabActive ] = useState(0);
    let children = props.children;
    if(props.children.type.toString().includes("fragment"));
        children = props.children.props.children;
    return  (
    <Container>
        <Tab>
            {
                props.tabs.map((tab, index) => <TabItem key={index}  onPress={() => setTabActive(index)} index={index} isActive={index == tabActive}><H3>{tab}</H3></TabItem>)
            }
        </Tab>
        <Container>
            {Array.isArray(children) ? children[tabActive] : children}
        </Container>
    </Container>)
}