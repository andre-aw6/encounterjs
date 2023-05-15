import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components/native';
import { Space, Bottom } from './Space';
import { H1, H4, H3, Subtitle2 } from './Typography';
import { Image, View } from 'react-native';
import { Button } from './Button';
import Stepper from './Stepper';
import Carrossel from './Carrossel';
import { useDispatch, useSelector } from 'react-redux';
import { openInfoModal } from '../store/actions/info';
import { CheckButton } from './CheckButton';
import { RadioButton } from './RadioButton';
import { handleSelectFilterToggle } from '../store/actions/shared';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import OptionWithImage from './OptionWithImage';
import Icons from './Icons';

const MainContainer = styled.SafeAreaView`
flex: 1;
width: 100%;
padding-top: ${props => props.theme.space.space2};
`;

const Container = styled.View`
    flex: 1;
    width: 100%;
    padding-left: ${props => props.theme.space.space3};
    padding-right: ${props => props.theme.space.space3};
`;

const Content = styled.View`
    flex-grow: 1;
`;

const ImageContent2 = styled.View`
    align-items:center;
    justify-content:center;
    flex: 1;
`;

const MoreInfo = styled.View`
    align-items: flex-end;
    position:relative;
    position: absolute;
    right:0;
    top: 0;
    z-index:99;    
`;

const ImageContent = styled.View`
width: 80%;
max-width: 80%;
align-items: center;
justify-content: center;
padding-top:  ${props => props.theme.space.space4};
padding-bottom:  ${props => props.theme.space.space2};
`;

const Footer = styled.View`
    width: 100%;
`;

const Tags = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
`;

const KnowInfo = styled.TouchableOpacity`
    flex-flow: row;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Line = styled.View`
    flex-flow: row;
`;

const FilterItem = withTheme(({ type, image, selects, theme, full }) => {

    const filters = useSelector(state => state.filters.filters)
    const dispatch = useDispatch();
    if (!filters || !filters.length) return <Container></Container>

    const filter = filters.find(f => f.type == type)
    const tagsValues = filter.options
    const tags = filter.values || filter.options
    // 
    
    return (<View flex={1}>

        <Tags>
            {
                tags.map((e, key) => (
                    <CheckButton
                        isSelected={selects.includes(tagsValues[key])}
                        key={key}
                        onPress={() => dispatch(handleSelectFilterToggle(type, tagsValues[key] ))}
                    >{e}
                    </CheckButton>))
            }
        </Tags>
        {
            filter.info && <View style={{ position: 'relative', zIndex: 99 }}>
                <MoreInfo>
                    <Space n={3} />
                    <TouchableOpacity onPress={() => dispatch(openInfoModal(filter.info, filter.title))}
                        style={{
                            width: 32,
                            height: 32,
                        }}>
                        <Icons name={"exclamation"} color={theme.colors.darkColor} size={theme.sizes.icons} />

                    </TouchableOpacity>

                </MoreInfo>
            </View>
        }
        {
            (image) && <ImageContent2 full={full}>
                <ImageContent full={full}>
                    <Image resizeMode={"contain"} style={{ height: '100%', width: "100%", maxWidth: '100%' }} source={{ uri: image }} />
                </ImageContent>
            </ImageContent2>

        }

    </View>)
})

const Question = ({ full, title, options, type, optionsType, image, selectsState }) => {
    
    const selects = selectsState[type] ? selectsState[type] : []
    // console.log(onboarding.filters)

    const isSelected = (values) => {
        let checker = []

        selects.flat().forEach(select => values.includes(select) ? checker.push(1) : undefined)

        return checker.length >= values.length
    }

    const formatData = (title) => {

        return title.split('\\n')
            .map((t, i) => <View key={i}>
                {i > 0 && <Space n={1} />}
                <H4 >
                    {
                        t.split("*")
                            .map((text, index) => index % 2 == 0 ? <H4 key={index}>{text}</H4> : <H3 key={index}>{text}</H3>)
                    }
                </H4>

            </View>
            )
    }

    const dispatch = useDispatch()
    return <Content>
        <Space n={3} />
        {formatData(title)}
        <Space n={2} />

        {
            optionsType == "imageChoice" ?
                options.map((option, key) => <OptionWithImage
                    key={key}
                    {...option}
                    isActive={isSelected(option.values)}
                    onPress={() => dispatch(handleSelectFilterToggle(type, option.values))}
                />)
                : <FilterItem full={full} image={image} selects={selects} type={type} />
        }


    </Content>
}

const Step = ({ onNext, steps, selectsState }) => {

    const hasSelects = steps.map(step => step.type)
        .map(type => selectsState[type] ? selectsState[type] : [])
        .map(arr => arr.length > 0)
        .reduce((a, b) => a && b, true) || true

    return (
        <Container>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }} showsVerticalScrollIndicator={false}>

                {
                    steps.map((step, index) => (<Question full={steps.length == 1} selectsState={selectsState} key={index} {...step} />))
                }

                <Footer>
                    <Space n={2} />
                    <Button disabled={!hasSelects} type="CallToAction-Light" width={"100%"} onPress={() => onNext()}>Continuar</Button>
                </Footer>
                <Bottom />
            </ScrollView>


        </Container>)
}




// const steps = [
//     { 
//         question1: {
//             title: () => <H4>Pensando em categorias de jogos, <H3>quais você mais gosta?</H3></H4>,
//             filterType: 'categories' 
//         },

//         image : () => <Image resizeMode={"contain"} style={{ height: '100%', maxWidth: '70%' }} source={require('../../../assets/img/onboard-1.png')} />
//     }
// ]


export default withTheme(({ theme, onNext, steps, selectsState, onBack }) => {

    const [stepsEnable, setStepsEnable] = useState(1);
    const [current, setCurrent] = useState(0);
    const _onNext = (n) => {

        if (n + 1 == steps.length) {
            onNext();
            return;
        }
        setCurrent(n + 1);
        if (stepsEnable < n + 2)
            setStepsEnable(n + 2)
    }
    const back = () => {
        if (current == 0)
            onBack();
        else
            setCurrent(current - 1);
    }

    return (<MainContainer>

        <Carrossel stepperUp

            paddingRight={theme.space.space3}
            enablePages={stepsEnable}
            current={current}
            noMargin
            blocked
            onBack={back}
            onCurrentChange={(n) => setCurrent(n)} >
            {
                steps.map((step, index) => <Step
                    key={index}
                    steps={step.steps}
                    selectsState={selectsState}
                    onNext={() => _onNext(index)}
                />)
            }

        </Carrossel>
    </MainContainer>)
})