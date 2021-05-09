import { FunctionComponent } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import ProfilesListContainer from "./list/Profiles.List.Container";
import ProfileFormContainer from "./form/Profile.Form.Container";

const Routes: FunctionComponent = () => {

    return (<BrowserRouter>
        <Route key={1} exact path="/profile/list">
            <ProfilesListContainer />
        </Route>
        <Route key={2} exact path="/profile/form">
            <ProfileFormContainer />
        </Route>
        <Route key={3} exact path="/profile/form/:id">
            <ProfileFormContainer />
        </Route>
        <Route key={4} exact path="/profile">
            <Redirect to="/profile/list" />
        </Route>
    </BrowserRouter>);
}

export { Routes };