import React, { useRef, useState, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements/dist/header/Header';
import { DrawerLayoutAndroid } from 'react-native-gesture-handler';
import { Drawer } from './Drawer/Drawer';


const Layout = ({ children, navigation }) => {

    const drawer = useRef(null);

    const [navState, setNavState] = useState(navigation.getCurrentRoute());

    useEffect(() => {
        navigation.addListener('state', (e) => {
            const { data: { state: { routes, index } } } = e;
            setNavState(routes[index]);
        })
    }, []);

    const getLeftComponent = useMemo(() => {

        return () => {

            if (navState.params && navState.params.showBack) {
                return {
                    icon: 'arrow-back', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => navigation.goBack()
                }
            }

            return {
                icon: 'menu', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => drawer.current.openDrawer()
            }
        }
    }, [navState]);

    const navigationView = () => (<Drawer drawer={drawer} navigation={navigation} navState={navState} />);

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={"left"}
            renderNavigationView={navigationView}>
            <Header
                leftComponent={getLeftComponent()}
                centerComponent={{ text: 'S-ASSESMENT', style: { color: '#fff' } }}
                containerStyle={{
                    backgroundColor: '#3D6DCC',
                    justifyContent: 'space-around'
                }} />
            {children}
        </DrawerLayoutAndroid>
    );
}

export { Layout };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    navigationContainer: {
        flex: 1,
        paddingTop: 250,
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    menuItem: {
        flex: 1
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    }
});