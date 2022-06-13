import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from "../screens/NotFoundScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import { DarkTheme, DefaultTheme, NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ColorSchemeName } from "react-native";
import { Layout } from './../components/Layout/Layout'
import { useEffect } from 'react';
import { useAuthentication } from '../contexts/user-context';
import ListScreen from '../screens/patient/ListScreen';
import {PersonalInfoScreen} from '../screens/patient/PersonalInfoScreen';
import { AppointmentsScreen } from '../screens/patient/AppointmentsScreen';
import { HistoryScreen } from '../screens/patient/HistoryScreen';

const Stack = createStackNavigator();

export default ({ colorScheme }: { colorScheme: ColorSchemeName }) => {

    const navigationRef = React.useRef(null);
    const { state: authentication } = useAuthentication();

    useEffect(() => {

        if (authentication != null) {
            navigationRef.current?.navigate('Login');
        }

    }, [navigationRef.current])

    useEffect(() => {

        if(authentication != null) {
            const resetAction = StackActions.replace('Home');
            navigationRef.current?.dispatch(resetAction);
        }

    }, [authentication])

    const renderScreens = () => (
        <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Login" component={LoginScreen} options={{}} />
            <Stack.Screen name="Home" component={HomeScreen} options={{}} />
            
            {/* Patient */}
            <Stack.Screen name="PatientList" component={ListScreen} options={{}} />
            <Stack.Screen name="PatientPersonalInfo" component={PersonalInfoScreen} options={{}} />
            <Stack.Screen name="PatientAppointments" component={AppointmentsScreen} options={{}} />
            <Stack.Screen name="PatientHistory" component={HistoryScreen} options={{}} />

            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    )

    const renderNavigator = () => {

        if (authentication != null) {
            return (
                <Layout navigation={navigationRef.current}>
                    {renderScreens()}
                </Layout>
            )
        }

        return renderScreens();
    }

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {renderNavigator()}
        </NavigationContainer>
    )
}


