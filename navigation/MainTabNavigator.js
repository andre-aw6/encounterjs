import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/Home";
import SearchScreen from "../screens/Search/Search";
import TabNav from "./TabBarNav";
import ProductDetails from "../screens/Product/ProductDetails";
import CuponsScreen from "../screens/Cupons/Cupons";
import EditProfileScreen from "../screens/User/EditProfile";
import NotificationsListScreen from "../screens/Notifications/NotificationsList";
import Filter from "../screens/Search/Filter";
import MyOrders from "../screens/Orders/MyOrders";
import BillingScreen from "../screens/Orders/BillingScreen";
import UserSettingsScreen from "../screens/User/UserSetting";
import SettingsScreen from "../screens/Settings/Settings";
import styled from "styled-components/native";
import PaymentScreen from "../screens/Payment/Payment";
import CreatePaymentScreen from "../screens/Payment/CreatePayment";
import AddressScreen from "../screens/Address/Address";
import CurrentLocation from "../screens/Address/CurrentLocation";
import AddAddress from "../screens/Address/component/AddAddress";
import SelfUpload from "../screens/User/SelfUpload";
import CartInfo from "../screens/Cart/components/CartInfo";
import UserScreen from "../screens/User/User";
import { useSelector, useDispatch } from "react-redux";
import CompleteInfos from "../screens/User/CompleteInfos";
import Tutorial from "../screens/Search/Tutorial";
import AboutScreen from "../screens/Settings/About";
import { View, Dimensions } from "react-native";
import Discovery from "../screens/Discovery/Discovery";
import Onboarding from "../screens/Onboarding/Onboarding";
import { registerRedirectComponent } from "../store/actions/shared";
import { translation } from "../texts";
import QuickSearchs from "../screens/QuickSearchs/QuickSearchs";
import RenewCartInfo from "../screens/Cart/components/RenewCartInfo";

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const HomeStack = createBottomTabNavigator();

function HomeStackScreen() {
  const user = useSelector((state) => state.user);

  const quickSearchs = useSelector((state) => state.quickSearchs);
  const quickSearch =
    Object.keys(quickSearchs).length == 0
      ? undefined
      : quickSearchs[Object.keys(quickSearchs)[0]];

  const { open: onboardIsOpened = false } = useSelector(
    (state) => state.onboarding
  );
  const { open: discoveryIsOpened = false } = useSelector(
    (state) => state.discovery
  );

  const RedirectComponent = () => {
    const navigation = useNavigation();

    React.useEffect(() => {
      registerRedirectComponent((screen) => {
        console.log(`Navigating to ${screen}`);
        navigation.navigate(screen);
      });
    });
    return null;
  };
  const { tutorial = false } = useSelector((state) => state.filters);

  console.log("HomeStackScreen rendered");

  return (
    <SafeAreaView>
      <RedirectComponent />
      <CartInfo />
      {/* <RenewCartInfo /> */}

      {user.needCompleteInfos && (
        <React.Fragment>
          {console.log("Showing CompleteInfos...")}
          <CompleteInfos />
        </React.Fragment>
      )}
      {tutorial && (
        <React.Fragment>
          {console.log("Showing Tutorial...")}
          <Tutorial />
        </React.Fragment>
      )}
      {quickSearch && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: 100,
          }}
        >
          <QuickSearchs quickSearch={quickSearch} />
        </View>
      )}
      {(onboardIsOpened || discoveryIsOpened) && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: 100,
          }}
        >
          {discoveryIsOpened ? <Discovery /> : <Onboarding />}
        </View>
      )}

      <HomeStack.Navigator
        initialRouteName="Início"
        tabBar={(props) => {
          console.log("Rendering TabNav...");
          return <TabNav {...props} />;
        }}
      >
        <HomeStack.Screen name="Início" component={HomeScreen} />
        <HomeStack.Screen name="Busca" component={SearchScreen} />
        <HomeStack.Screen
          name={translation("menu.orders")}
          component={MyOrders}
        />
        <HomeStack.Screen name="Perfil" component={SettingsScreen} />
      </HomeStack.Navigator>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const T = createStackNavigator();

export default function App() {
  console.log("App component rendered");
  return (
    <NavigationContainer>
      <SettingsStack.Navigator
        screenOptions={
          {
            headerShown: false
          }
        }
        initialRouteName="Home"
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="ProductDetails" component={ProductDetails} />
        <Tab.Screen name="Filter" component={Filter} />
        <Tab.Screen name="Billing" component={BillingScreen} />
        <Tab.Screen name="EditProfile" component={EditProfileScreen} />
        <Tab.Screen name="Notifications" component={NotificationsListScreen} />
        <Tab.Screen name="Cupons" component={CuponsScreen} />
        <Tab.Screen name="UserSettings" component={UserSettingsScreen} />
        <Tab.Screen name="Address" component={AddressScreen} />
        <Tab.Screen name="Payments" component={PaymentScreen} />
        <Tab.Screen name="CreatePayment" component={CreatePaymentScreen} />
        <Tab.Screen name="CurrentLocation" component={CurrentLocation} />
        <Tab.Screen name="AddNewAddress" component={AddAddress} />
        <Tab.Screen name="SelfUpload" component={SelfUpload} />
        <Tab.Screen name="User" component={UserScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </SettingsStack.Navigator>
    </NavigationContainer>
  );
}
