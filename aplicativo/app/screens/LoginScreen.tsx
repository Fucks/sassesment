import React, { useState } from 'react';
import { FunctionComponent } from "react";
import { Alert, View, StyleSheet, Image, Keyboard, LayoutAnimation } from 'react-native';
import { Actions, useAuthentication } from '../contexts/user-context';
import AuthService from "../services/Authentication.service";
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';

const LoginScreen: FunctionComponent = ({ navigation }: any) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);

    const { state, dispatch } = useAuthentication();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setIsKeyboardOpened(true)
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setIsKeyboardOpened(false)
    });

    useEffect(() => {
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])

    const handleLogin = async () => {

        setIsLoading(true);

        try {
            console.log(username, password)
            await AuthService.instance.authenticate(username, password);
            dispatch({ type: Actions.LOGIN, payload: AuthService.instance.authentication })
        }
        catch (ex) {
            Alert.alert('Erro ao autenticar', ex.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const renderLogoRegion = () => (
        <View style={styles.logoRegion}>
            <Image style={[styles.logo, isKeyboardOpened && styles.small]} source={require('./../../assets/images/Logo.png')} />
            {!isKeyboardOpened && <Image style={styles.logoText} source={require('./../../assets/images/somare.png')} />}
        </View>
    )

    const renderFormRegion = () => (
        <View style={[styles.formRegion]}>
            <Input
                style={styles.input}
                onChangeText={value => setUsername(value)}
                label='Email'
                placeholder="email@somare.com.br"
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color='grey'
                    />
                }
            />
            <Input
                style={styles.input}
                onChangeText={value => setPassword(value)}
                label='Senha'
                secureTextEntry={true}
                placeholder="******"
                leftIcon={
                    <Icon
                        name='lock'
                        size={24}
                        color='grey'
                    />
                }
            />
            <View style={styles.button}>
                <Button title="Entrar" loading={isLoading} onPress={handleLogin}></Button>
            </View>
        </View>
    );

    const renderLogin = () => (
        <>
            {renderLogoRegion()}
            {renderFormRegion()}
        </>
    )

    return (
        <View style={styles.container}>
            {renderLogin()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    logoRegion: {
        flex: 1,
        paddingTop: 40,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    logo: {
        height: 200,
        width: 200
    },
    logoText: {
        width: 230,
        height: 70
    },
    formRegion: {
        flex: 2,
        width: 250,
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    input: {
        flex: 1,
        width: 250
    },
    button: {
        width: 250
    },
    small: {
        height: 120,
        width: 120
    }
});

export default LoginScreen;