import React from 'react';
import styled from 'styled-components/native';
import Stepper from './Stepper';

export default (props) => {
    return <Stepper width={'auto'} customColor="darkColor" size={props.size ? props.size : 2} number={props.n} current={-1}/>
}