import { FunctionComponent } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { PatientProvider } from "./context/PatientContext";
import PatientFormContainer from "./form/Patient.Form.Container";
import PatientListContainer from "./list/Patient.List.Container";
import PatientViewContainer from "./view/Patient.View.Container";

const Routes: FunctionComponent = () => {

    return (<Switch>
        <Route key={1} exact path="/patient/list">
            <PatientListContainer />
        </Route>
        <Route key={2} exact path="/patient/form">
            <PatientFormContainer />
        </Route>
        <Route key={3} exact path="/patient/form/:id">
            <PatientFormContainer />
        </Route>
        <Route key={4} exact path="/patient/view/:id">
            <PatientProvider>
                <PatientViewContainer />
            </PatientProvider>
        </Route>
        <Route key={5} exact path="/patient">
            <Redirect to="/patient/list" />
        </Route>
    </Switch>);
}

export { Routes };