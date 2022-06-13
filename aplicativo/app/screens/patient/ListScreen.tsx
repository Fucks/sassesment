import React, { useState, useEffect, useMemo } from 'react';
import { Avatar, Icon, ListItem, SearchBar, Text } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { Page, Pageable } from '../../services/page';
import { Patient, PatientService } from '../../services/patient/patient.service';
import { StyleSheet, View } from 'react-native';
import { NotFound } from '../../components/NotFound/NotFound';
import { PatientMenuOptions } from './patient-options';
import { useRef } from 'react';
import SkeletonContent from 'react-native-skeleton-content';
import BottomSheet from '@gorhom/bottom-sheet';

export default function ListScreen({ navigation }) {

    const service = useMemo(() => new PatientService(), []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [contentPage, setContentPage] = useState<Pageable<Patient>>();
    const [page, setPage] = useState<Page>({ size: 10, page: 0 })

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const [filter, setFilter] = useState<string>('');

    const [patient, setPatient] = useState(null);

    const snapPoints = useMemo(() => ['30%', '30%'], []);

    useEffect(() => {
        loadItens();
    }, [page, filter]);

    const loadItens = async () => {

        setLoading(true);

        try {
            var content = await service.list(filter, page);
            setContentPage(content);
            console.log(content);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }

    };

    const goTo = (patient, path) => {

        navigation.navigate(path, {
            patient,
            showBack: true
        });
    }

    const onSelectPatient = (patient) => {
        setPatient(patient);
        bottomSheetRef.current.expand();
    }

    const keyExtractor = (item, index) => index.toString();

    const handleClosePress = () => bottomSheetRef.current.close();

    const renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => onSelectPatient(item)}>
            <Avatar title={item.name[0]} containerStyle={styles.avatar} />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron type="font-awesome-5" name="ellipsis-h" />
        </ListItem>
    )

    const renderList = () => {

        if (loading) {
            return <SkeletonContent
                animationDirection="horizontalLeft"
                containerStyle={styles.loadingContainer}
                layout={[
                    { width: 220, height: 20, marginBottom: 6 },
                    { width: 180, height: 20, marginBottom: 6 },
                ]}
                isLoading={loading} />;
        }

        if (contentPage.content.length == 0) {
            return <NotFound title={'Nenhum paciente encontrado.'} description="" />
        }

        return <FlatList
            keyExtractor={keyExtractor}
            data={contentPage.content}
            renderItem={renderItem}
        />
    }

    const renderBottomSheet = () => {

        var name = patient?.name;

        if (name != null && name.length > 20) {
            name = name.slice(0, 19);
        }

        return <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}>
            <View>
                <View style={styles.bottomSheetHeader}>
                    <Text h3>{patient?.name}</Text>
                    <Icon name="close" onPress={handleClosePress} />
                </View>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={PatientMenuOptions}
                    renderItem={({ item }) => (
                        <ListItem bottomDivider onPress={() => goTo(patient, item.path)}>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )}
                />
            </View>
        </BottomSheet>

    }

    return (
        <View style={styles.container}>
            <SearchBar
                platform="android"
                placeholder="Procurar"
                value={filter}
                onChangeText={(filter) => setFilter(filter)} />
            {renderList()}
            {renderBottomSheet()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        backgroundColor: 'gray'
    },
    loadingContainer: {
        flex: 1,
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bottomSheetHeader: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
