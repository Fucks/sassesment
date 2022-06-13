import React, { useMemo } from "react";
import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { NotFound } from "../../components/NotFound/NotFound";
import { View } from "../../components/Themed";
import { FAB, Icon } from 'react-native-elements';

export const AppointmentsScreen: FunctionComponent = ({ route, navigation }: any) => {

    const patient = useMemo(() => {
        return route.params.patient;
    }, [])

    return (
        <View style={styles.container}>
            <FAB placement="right" color="#3D6DCC" icon={<Icon name="add" type="material" color="white" />} />
            <NotFound title="O paciente ainda não possui atendimentos" description="" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});