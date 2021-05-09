import { FunctionComponent } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/layout/PageLayout";
import { Routes as OccupationRoutes } from "./modules/occupation/Routes";
import { Routes as ProfileRoutes } from "./modules/profile/Routes";
import { Routes as ProfessionalRoutes } from "./modules/professional/Routes";
import { Routes as PatientRoutes } from "./modules/patient/Routes";

const Routes: FunctionComponent = () => {
    return (<Layout>
        <BrowserRouter>
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
                <span>Team</span>
            </Route>
            <Route path="/profile">
                <ProfileRoutes />
            </Route>
        </BrowserRouter>
    </Layout>);
}

export default Routes;