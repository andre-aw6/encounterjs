import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { H3, Subtitle2 } from '../../components/Typography';
import { Space } from '../../components/Space';
import ScreePopup from '../../components/ScreePopup';
import { Box } from '../../components/Box';
import NotLoggedBox from '../User/components/NotLoggedBox';
import InformationBox from '../../components/InformationBox';
import { useSelector, useDispatch } from 'react-redux';
import { handleLoadNotifications } from '../../store/actions/user';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { isLoading } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { handleOpenNotification } from '../../store/actions/shared';

const Container = styled.View`
    min-height:100%;
    padding: ${props => props.theme.space.space2};
`;

const Info = styled.View`
    flex: 1;
    margin-bottom:  ${props => props.theme.space.space0};
`;

const Notification = styled.TouchableOpacity`
    padding: ${props => props.theme.space.space2};
    padding-bottom:  0px;
    ${props => props.isActive ? 'background: ' + props.theme.colors.primaryColor : ''};
`;

const NotificationBody = styled.View`
    flex-flow: row;
    width: 100%;
`;

const Hr = styled.View`
    background: ${props => props.theme.colors.secondLightColor};
    height: 1.5px;
`;

function Notifications({ notifications, isLoading }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    function onPress(n) {
        dispatch(handleOpenNotification(n.key, n.action))
        .then(result => {
          if(result && result.redirect){
                navigation.navigate(result.redirect);
          }
        });
    }

    if (isLoading) {
        return (
            <Box noPadding>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, index) => (
                    <Placeholder key={index} Animation={Fade}>
                        <Notification>
                            <NotificationBody>
                                <Info >
                                    <PlaceholderLine noMargin width={40} height={18} />
                                    <Space n={0} />
                                    <PlaceholderLine noMargin width={80} height={16} />
                                </Info>
                                <Date>
                                    <PlaceholderMedia noMargin size={36} />
                                    {/* <Subtitle2 type={"secondDarkColor"}>{n.dateTimeFormated}</Subtitle2>
                                    <Subtitle2 type={"secondDarkColor"}>{n.dateFormated}</Subtitle2> */}
                                </Date>
                            </NotificationBody>
                            <Space n={1} />
                            <Hr />
                        </Notification>
                    </Placeholder>
                ))}
            </Box>
        )
    } else {
        return (
            <Box noPadding>
                {notifications.map((n, index) => (
                    <Notification isActive={n.viewed} key={index} onPress={() => onPress(n)}>
                        <NotificationBody>
                            <Info>
                                <H3>{n.title}</H3>
                                <Space n={0} />
                                <Subtitle2 type={"secondDarkColor"}>{n.body}</Subtitle2>
                            </Info>
                            <Date>
                                <Subtitle2 type={"secondDarkColor"}>{n.dateTimeFormated}</Subtitle2>
                                <Subtitle2 type={"secondDarkColor"}>{n.dateFormated}</Subtitle2>
                            </Date>
                        </NotificationBody>
                        <Space n={1} />
                        <Hr />
                    </Notification>
                ))}
            </Box>
        )
    }
}

export default function NotificationsScreen() {
    const dispatch = useDispatch()

    const { isLogged = false, notifications } = useSelector(state => state.user)

    const hasNotification = notifications && notifications.length > 0;
    const isLoading = !notifications

    function isLoggedContent() {
        return (hasNotification || isLoading) ? <Notifications isLoading={isLoading} notifications={notifications} /> : <InformationBox
            title='Você não possui notificações.'
            description='Assim que receber, poderá ver tudo por aqui!' />
    }

    function isNotLoggedContent() {
        return <NotLoggedBox title='Você não possui notificações.' />
    }

    return (
        <ScreePopup title={"Notificações"} withBorder >
            <Container>
                {isLogged ? isLoggedContent() : isNotLoggedContent()}
            </Container>
        </ScreePopup>
    )
}
