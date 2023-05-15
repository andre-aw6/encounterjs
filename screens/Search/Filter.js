import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Screen from '../../components/Screen';
import styled, { withTheme } from 'styled-components/native';
import SearchBar from './components/SearchBar';
import { H3, Subtitle2 } from '../../components/Typography';
import { CheckButton } from '../../components/CheckButton';
import FilterItem from './components/FilterItem';
import ScreePopup from '../../components/ScreePopup';
import { handleLoadFilters, handleClearSelects } from '../../store/actions/filters';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { translation } from '../../texts';

const Container = styled.View`
    padding: ${props => props.theme.space.space2};
    padding-top: ${props => props.theme.space.space0};
    flex: 1;
`;

const Filter = (props) => {

    const dispatch = useDispatch();
    const filters = useSelector(state => state.filters.filters) || []
    const { selects = {} } = useSelector(state => state.filters) 
    const navigation = useNavigation()
    
    return (<ScreePopup title="Filtros" tooltext="Limpar tudo" withBorder onToolPress={() => dispatch(handleClearSelects())}>
        <Container>
            {
                filters.map(f => (
                    <FilterItem key={f.type} {...f} selects={selects[f.type] || []} tags={f.options} values={f.values}  />
                ))
            }
            <Button onPress={() => navigation.navigate('Busca')} type={'CallToAction-Light'}>{translation("search.button")}</Button>
        </Container>
    </ScreePopup>)
}


export default withTheme(Filter)