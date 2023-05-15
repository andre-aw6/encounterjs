import React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeFilteringText } from '../store/actions/filters';
import { EvilIcons } from '@expo/vector-icons';
import { handleSearchLocationByTerm } from '../store/actions/address';

const SearchBar = styled.View`
    padding-top: 8px;
    padding-bottom: 8px;
    height: 48px;
    background: white;
    border-radius: ${props => props.theme.borderRadius.button};
    align-items: center;
    flex-flow: row;    
    width: 100%;
    shadow-color: ${props => props.theme.shadow.shadowColor};
    shadow-offset: ${props => props.theme.shadow.shadowOffset.width} ${props => props.theme.shadow.shadowOffset.width};
    shadow-opacity: ${props => props.theme.shadow.shadowOpacity};
    shadow-radius: ${props => props.theme.shadow.shadowRadius}px;
    elevation: ${props => props.theme.shadow.elevation};
    padding-left: 12px;
`;

const Clear = styled.TouchableOpacity`
    padding: 4px;
    background-color: ${props => props.theme.colors.secondLightColor};
    border-radius: 16px;
    justify-content: center;
    align-items:center;
    margin-right: ${props => props.theme.space.space1};
`;

const SearchInput = styled.TextInput`
    flex: 1;
    height: 100%;
    color: ${props => props.theme.colors.secondDarkColor};
    font-size:  ${props => props.theme.sizes.subtitle3};
`;

export default (props) => {
    const dispatch = useDispatch();
    let text = "";
    let maxLength;
    let placeholder = "Buscar";
    let keyboardType = "default";
    let onChange = e => false;
    let onClear = e => false;
    if(props.type == "Filter"){
        const filter = useSelector(state => state.filters);        
        text = filter.text || '';
        onChange = e => dispatch(handleChangeFilteringText(e));
        onClear = e  => dispatch(handleChangeFilteringText(''));
    }

    if(props.type == "Location"){
        placeholder = "Buscar por cep"
        keyboardType="number-pad"
        maxLength=9
        const address = useSelector(state => state.address);        
        text = address.searchLocations && address.searchLocations.term ? address.searchLocations.term : '';
        onChange = value => {            
            var numberPattern = /\d+/g;
            let cep;
            var valueToFormat = value.length !== 0 ? value.match(numberPattern).join('').substring(0, 11) : value;            
            if(valueToFormat.length >= 6)
                cep = valueToFormat.substring(0, 5) + "-" + valueToFormat.substring(5);
            else 
                cep = valueToFormat;                
            dispatch(handleSearchLocationByTerm(cep.substring(0, 9), true));        
        }
        onClear = e  => dispatch(handleSearchLocationByTerm(''));
    }

    return (<SearchBar>
        <SearchInput 
            value={text}
            keyboardType={keyboardType}
            placeholder={placeholder} 
            maxLength={maxLength}
            onChangeText={onChange} />
        {
            (props.clearButton && text !== '' ) && <Clear onPress={onClear}>
            <EvilIcons name="close" color={'black'} size={16} />
        </Clear> 
        }
        {props.children}
    </SearchBar>)
}