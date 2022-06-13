import * as Linking from "expo-linking";

export default {
    prefixes: [Linking.createURL("/")],
    config: {
        initialRouteName: 'Home',
        screens: {
            Home: 'home',
            Login: 'login',
            PatientList: 'patient-list',
            NotFound: "*"
        },
    },
};
