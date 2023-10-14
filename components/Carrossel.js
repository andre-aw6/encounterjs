import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Dimensions, ScrollView } from 'react-native';
import styled, { withTheme } from 'styled-components/native';
import Stepper from './Stepper';
import { Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';
import { Space } from './Space';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Content = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-bottom: ${props => props.noMargin ? 0 : (props.stepperUp ? '0px' : props.theme.space.space2)};
`;

const StepperHeader = styled.View`
    flex-flow: row;
    width: 100%;
    padding-right: ${props => props.paddingRight ? props.paddingRight : '0'};
    padding-left: ${props => props.paddingRight ? props.paddingRight : '0'};
`;

const StepperHeaderBack = styled.TouchableOpacity`
    flex-flow: row;
    flex: 1;
    height: 32px;
`;

const Carrossel = (props) => {
    const deviceWidth = Dimensions.get('window').width - (props.padding ? props.padding : 0);
    const [current, setCurrent] = useState(props.current || 0);
    const nEnabled = props.enablePages || props.children.length;
    const myScroll = useRef(null);
    const forceToRef = useRef(undefined);

    const onChange = (event) => {
        const current = Math.max(Math.floor((event.nativeEvent.contentOffset.x / deviceWidth) + .1), 0);

        if (forceToRef.current != undefined && current == forceToRef.current ||
            forceToRef.current == undefined) {
            forceToRef.current = undefined;
            setCurrent(current);

            if (props.onCurrentChange) {
                props.onCurrentChange(current);
            }
        }
    };

    useEffect(() => {
        if (myScroll.current) {
            forceToRef.current = forceToRef.current || props.current;
            myScroll.current.scrollTo({ x: deviceWidth * props.current });
        }
    }, );

    const children = Array.isArray(props.children) ? props.children : [props.children];

    return (
        <Container>
            {(props.stepperUp || !!props.onBack) && <StepperHeader paddingRight={props.paddingRight}>
                <StepperHeaderBack onPress={props.onBack} disabled={!props.onBack}>
                    { !!props.onBack && <EvilIcons name="chevron-left" color={props.theme.colors.darkColor} size={32} /> }  
                </StepperHeaderBack>
                { props.stepperUp && <Stepper width={"auto"} number={children.length} current={current} /> }
            </StepperHeader>}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                pagingEnabled
                scrollEnabled={!props.blocked}
                ref={myScroll}
                onScroll={(event) => onChange(event)}
                flex={1}
            >
                {children.filter((child, index) => index < nEnabled).map((child, i) => (
                    <Content stepperUp={props.stepperUp} noMargin={props.noMargin} key={`image${i}`} style={{ width: deviceWidth }}>
                        {child}
                    </Content>
                ))}
            </ScrollView>
            { props.stepperDown && <React.Fragment>
                <Space n={0} />
                <Stepper number={children.length} current={current} />
            </React.Fragment>}
        </Container>
    );
};

export default withTheme(Carrossel);