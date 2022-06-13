import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from './app/hooks/useColorScheme';
import { useLoadedAssets } from './app/hooks/useLoadedAssets';
import { useEffect } from 'react';
import * as SplashScreenService from "expo-splash-screen";
import { useState } from 'react';
import { SplashScreen } from './app/screens/SplashScreen'
import Routes from './app/navigation/Routes';
import { StatusBar } from 'expo-status-bar';
import { AuthenticationProvider } from './app/contexts/user-context';
import AuthService from './app/services/Authentication.service';

export default function App() {

    const isLoadingComplete = useLoadedAssets();
    const colorScheme = useColorScheme();

    const [showApp, setShowApp] = useState(false);
    const [isAuthenticationLoaded, setIsAuthenticationLoaded] = useState(false);

    useEffect(() => {
        AuthService.initialize()
            .then(() => {
                console.log('auth started', AuthService.instance.authentication)
                setIsAuthenticationLoaded(true);
            })

    }, []);

    useEffect(() => {

        if (isLoadingComplete && isAuthenticationLoaded) {
            setTimeout(SplashScreenService.hideAsync, 3000);
            setShowApp(true)
        }

    }, [isLoadingComplete, isAuthenticationLoaded])


    if (!showApp) {
        return <SplashScreen />;
    }

    console.log('Rendering apk')

    return (
        <SafeAreaProvider>
            <AuthenticationProvider initialValue={AuthService.instance.authentication}>
                <StatusBar style="dark" />
                <Routes colorScheme={colorScheme} />
            </AuthenticationProvider>
        </SafeAreaProvider>

    );
}
