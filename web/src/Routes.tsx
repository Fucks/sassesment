import { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";
import { Routes as OccupationRoutes } from "./modules/occupation/Routes";
import { Routes as ProfileRoutes } from "./modules/profile/Routes";
import { Routes as ProfessionalRoutes } from "./modules/professional/Routes";
import { Routes as PatientRoutes } from "./modules/patient/Routes";
import { Routes as TeamRoutes } from "./modules/team/Routes";
import Layout from "./components/layout/PageLayout";

const Routes: FunctionComponent = () => {

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
                    <TeamRoutes />
                </Route>
                <Route path="/profile">
                    <ProfileRoutes />
                </Route>
            </Switch>
        </Layout>
    );
}

export default Routes;