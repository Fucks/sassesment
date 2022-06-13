import React, { useMemo } from "react";
import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import { NotFound } from "../../components/NotFound/NotFound";
import { View } from "../../components/Themed";

export const HistoryScreen: FunctionComponent = ({ route, navigation }: any) => {

    const patient = useMemo(() => {
        return route.params.patient;
    }, [])    

    return (
        <View style={styles.container}>
            <NotFound title="Ainda não possuimos esse tipo de recurso" description="" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});