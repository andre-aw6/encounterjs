import styled from 'styled-components/native';
import { getBottomSpace, } from 'react-native-iphone-x-helper';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const Space = styled.View`
height: ${props => props.theme.space['space' + props.n]};
width: 1px;
`;

export const SpaceHorizontal = styled.View`
width: ${props => props.theme.space['space' + props.n]};
height: 1px;
`;

export const Bottom = styled.View`
    width: 100%;
    height: ${(Platform.OS == "ios" ? getBottomSpace() + 16 : Constants.statusBarHeight + 16) + 'px'};
`;