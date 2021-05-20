import { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/PageLayout";
import { Routes as OccupationRoutes } from "./modules/occupation/Routes";
import { Routes as ProfileRoutes } from "./modules/profile/Routes";
import { Routes as ProfessionalRoutes } from "./modules/professional/Routes";
import { Routes as PatientRoutes } from "./modules/patient/Routes";
import { useAuthentication } from "./context/AutenticationContext";

const Routes: FunctionComponent = () => {

    const {state} = useAuthentication();

    return (
        <Layout>
            <Switch>
                <Route path="/professional">
                    <ProfessionalRoutes />
                </Route>
                <Route path="/patient">
                    <PatientRoutes />
                </Route>
                <Route path="/occupation">
                    <OccupationRoutes />
                </Route>
                <Route path="/team">
                    <span>{state?.name}</span>
                </Route>
                <Route path="/profile">
                    <ProfileRoutes />
                </Route>
            </Switch>
        </Layout>
    );
}

export default Routes;