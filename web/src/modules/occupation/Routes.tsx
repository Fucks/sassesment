import { FunctionComponent } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import OccupationFormContainer from "./manager/OccupationForm.container";
import OccupationListContainer from "./view/OccupationList.container";

const Routes: FunctionComponent = () => {

    return (<BrowserRouter>
        <Route exact path="/occupation/list">
            <OccupationListContainer />
        </Route>
        <Route exact path="/occupation/form">
            <OccupationFormContainer />
        </Route>
        <Route exact path="/occupation/form/:id">
            <OccupationFormContainer />
        </Route>
        <Route exact path="/occupation">
            <Redirect to="/occupation/list" />
        </Route>
    </BrowserRouter>);
}

export { Routes };