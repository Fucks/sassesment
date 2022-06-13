import * as React from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { useAuthentication } from '../../../contexts/user-context';
import { View } from '../../Themed';
import { Menu, NavigationMenus } from './menus';


const Drawer = ({ drawer, navigation, navState }) => {

    const { state: authentication } = useAuthentication();

    const headerData = useMemo(() => {
        return {
            initials: authentication.name[0].toUpperCase(),
            name: authentication.name.split(' ')[0]
        }
    }, [authentication]);

    const menus: Menu[] = React.useMemo(() => NavigationMenus, []);

    const handleClose = () => {
        drawer.current.closeDrawer();
    }

    const goTo = (path) => {
        navigation.navigate(path);
        handleClose();
    }

    const renderMenuItem = (menuItem: Menu) => {

        return <Pressable onPress={() => goTo(menuItem.path)}>
            <View style={[menuItemStyles.menuItem, navState.name == menuItem.path && menuItemStyles.menuItemSelected]}>
                <Icon iconStyle={navState.name == menuItem.path ? menuItemStyles.menuItemIconSelected : menuItemStyles.menuItemIcon} name={menuItem.icon} />
                <Text style={[menuItemStyles.menuItemText, navState.name == menuItem.path && menuItemStyles.menuItemTextSelected]}>{menuItem.title}</Text>
            </View>
        </Pressable>
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <View style={styles.close}>
                    <Icon name="close" color="#ccc" onPress={handleClose} />
                </View>
                <View style={styles.header}>
                    <Avatar containerStyle={styles.avatar} title={headerData.initials} />
                    <View>
                        <Text style={styles.title} h4>Somare</Text>
                        <Text style={styles.subtitle}>Bem vindo, {headerData.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.menuSection}>
                {
                    menus.map(renderMenuItem)
                }
            </View>
            <View style={styles.footerSection}>
                <Text>v0.0.0</Text>
            </View>
        </View>
    );
}

export { Drawer };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    headerSection: {
        paddingTop: 40,
        flexDirection: 'column',
        flex: 0.5,
        marginBottom: 20
    },
    avatar: {
        backgroundColor: '#ccc',
        height: 60,
        width: 60,
        marginRight: 18
    },
    title: {
    },
    subtitle: {
    },
    header: {
        flexDirection: 'row'
    },

    close: {
        alignItems: 'flex-end'
    },

    menuSection: {
        flex: 2
    },
    footerSection: {
        paddingBottom: 10,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    }
});

const menuItemStyles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
        borderRadius: 30,
        marginRight: 30
    },
    menuItemIcon: {
        marginRight: 16,
        color: '#ccc'
    },
    menuItemText: {
        fontWeight: 'bold'
    },
    menuItemSelected: {
        backgroundColor: '#e7f2ff',
    },
    menuItemIconSelected: {
        color: '#2d4bff',
        marginRight: 16
    },
    menuItemTextSelected: {
        color: '#2d4bff'
    }
})