import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { useAssets } from "expo-asset";

export function useLoadedAssets() {

    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [isFontLoaded, setIsFontLoaded] = React.useState(false);

    const [assets] = useAssets([
        require('../../assets/images/Logo.png'),
        require('../../assets/images/somare.png'),
        require('../../assets/images/not-found.png'),
    ]);


    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    "space-mono": require("../../assets/fonts/SpaceMono-Regular.ttf"),
                });

            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setIsFontLoaded(true);
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    React.useEffect(() => {
        if (isFontLoaded && assets) {
            setLoadingComplete(true);
        }
    }, [assets, isFontLoaded]);


    return isLoadingComplete;
}
