import React, { useState, useEffect } from 'react';
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

// export const CarroselTime = (props) => {
//     let carrosel;


//     return (<Carros)
// }

export default withTheme((props) => {

    const deviceWidth = Dimensions.get('window').width - (props.padding ? props.padding : 0)

    const [current, setCurrert] = useState(props.current || 0)
    
    let forceTo = undefined;

    const onChange = (event) => {

        const current = Math.max(Math.floor((event.nativeEvent.contentOffset.x / deviceWidth) + .1), 0)

        if (forceTo != undefined && current == forceTo ||
            forceTo == undefined) {
            forceTo = undefined;
            setCurrert(current)

            if (props.onCurrentChange)
                props.onCurrentChange(current)
        }


    }


    useEffect(() => {
        if (myScroll) {
            forceTo = forceTo || props.current;
            myScroll.scrollTo({ x: deviceWidth * props.current })
        }
    })

    const children = Array.isArray(props.children) ? props.children : [props.children]

    const nEnabled = props.enablePages || children.length

    let myScroll;


    return (
        <Container>
            {
                (props.stepperUp || !!props.onBack) && <StepperHeader paddingRight={props.paddingRight}>
                    <StepperHeaderBack onPress={props.onBack} disabled={!props.onBack}>
                        {
                            !!props.onBack && <EvilIcons name="chevron-left" color={props.theme.colors.darkColor} size={32} />
                        }
                        
                    </StepperHeaderBack>
                    {
                        props.stepperUp && <Stepper width={"auto"} number={children.length} current={current} />
                    }
                    
                </StepperHeader>
            }
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={10}
                pagingEnabled
                scrollEnabled={!props.blocked}
                ref={(ref) => { myScroll = ref }}
                onScroll={(event) => onChange(event)}
                flex={1}
            >
                {children.filter((child, index) => index < nEnabled).map((child, i) => (
                    <Content stepperUp={props.stepperUp} noMargin={props.noMargin} key={`image${i}`} style={{ width: deviceWidth }}>
                        {child}
                    </Content>
                ))}
            </ScrollView>
            {
                props.stepperDown && <React.Fragment>
                    <Space n={0} />
                    <Stepper number={children.length} current={current} />
                </React.Fragment>
            }

        </Container>
    )

})