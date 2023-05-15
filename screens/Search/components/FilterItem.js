import React from 'react';
import styled, { withTheme } from 'styled-components/native';
import { H3 } from '../../../components/Typography';
import { CheckButton } from '../../../components/CheckButton';
import { RadioButton } from '../../../components/RadioButton';
import { handleSetSelectFilter } from '../../../store/actions/filters';
import { useDispatch } from 'react-redux';
import { openInfoModal } from '../../../store/actions/info';
import Icons from '../../../components/Icons';

const Tags = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
`;

const Space = styled.View`
    height: 8px;
    width: 1px;
`;

const Hr = styled.View`
    height: 16px;
    border-color:${prop => prop.theme.colors.secondLightColor};
    border-bottom-width: 1px;
`;

const Header = styled.View`
    position: relative;
    flex-flow: row;
`;

const Icon = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    padding-left: 16px;
    padding-right: 16px;
`;

const FilterItem = (props) => {

    const dispatch = useDispatch()
    return (
        <React.Fragment>
            <Space />
            <Space />
            <Header>
                { props.title !== "" && <H3 color={props.theme.colors.secondDarkColor}>{props.title}</H3> }

                {
                    props.info && <Icon onPress={() => dispatch(openInfoModal(props.info, props.title))}>
                        <Icons name={"exclamation"} color={props.theme.colors.darkColor} size={16} />
             
                    </Icon>
                }
            </Header>
            <Space />
            <Tags>
                {
                    props.tags.map((e, key) => (
                        !props.isSingle ? <CheckButton isSelected={props.selects.includes(e)} key={key} onPress={() => dispatch(handleSetSelectFilter(props.type, e))}>{props.values ? props.values[key] : e }</CheckButton> :
                            <RadioButton isLast={key == props.tags.length - 1} isFlex={props.tags.length == 2} isSelected={props.selects.includes(e)} key={key} onPress={() => dispatch(handleSetSelectFilter(props.type, e))}>{props.values ? props.values[key] : e }</RadioButton>
                    ))
                }
            </Tags>
            <Hr />
        </React.Fragment>
    )
}

export default withTheme(FilterItem)