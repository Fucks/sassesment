import { FunctionComponent } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import TeamListContainer from "./list/Team.List.Container";
import TeamFormContainer from "./form/Team.Form.Container";

const Routes: FunctionComponent = () => {

    return (<Switch>
        <Route key={1} exact path="/team/list">
            <TeamListContainer />
        </Route>
        <Route key={2} exact path="/team/form">
            <TeamFormContainer />
        </Route>
        <Route key={3} exact path="/team/form/:id">
            <TeamFormContainer />
        </Route>
        <Route key={4} exact path="/team">
            <Redirect to="/team/list" />
        </Route>
    </Switch>);
}

export { Routes };