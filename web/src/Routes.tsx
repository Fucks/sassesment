import { FunctionComponent } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./components/layout/PageLayout";
import { Routes as OccupationRoutes } from "./modules/occupation/Routes";

const Routes: FunctionComponent = () => {
    return (<Layout>
        <BrowserRouter>
            <Route path="/professional">
                <span>Profissional</span>
            </Route>
            <Route path="/patient">
                <span>Patient</span>
            </Route>
            <Route path="/occupation">
                <OccupationRoutes />
            </Route>
            <Route path="/team">
                <span>Team</span>
            </Route>
            <Route path="/profile">
                <span>Profile</span>
            </Route>
        </BrowserRouter>
    </Layout>);
}

export default Routes;