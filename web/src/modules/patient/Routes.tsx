import { FunctionComponent } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import PatientListContainer from "./list/Patient.List.Container";

const Routes: FunctionComponent = () => {

    return (<BrowserRouter>
        <Route key={1} exact path="/patient/list">
            <PatientListContainer />
        </Route>
        <Route key={2} exact path="/patient/form">
        </Route>
        <Route key={3} exact path="/patient/form/:id">
        </Route>
        <Route key={4} exact path="/patient">
            <Redirect to="/patient/list" />
        </Route>
    </BrowserRouter>);
}

export { Routes };