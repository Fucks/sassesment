import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import { Text, View } from '../Themed';

const NotFound = ({ title, description }) => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('./../../../assets/images/not-found.png')} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export { NotFound };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: 'transparent'
    },
    image: {
        width: 150,
        height: 150
    },
    title: {
        color: 'gray',
        paddingTop: 8,
        fontWeight: '500'
    }
});