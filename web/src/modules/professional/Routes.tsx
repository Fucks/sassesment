import { FunctionComponent } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import ProfessionalFormContainer from "./form/Professional.Form.Container";
import ProfessionalListContainer from "./list/Professional.List.Container";

const Routes: FunctionComponent = () => {

    return (<Switch>
        <Route key={1} exact path="/professional/list">
            <ProfessionalListContainer />
        </Route>
        <Route key={2} exact path="/professional/form">
            <ProfessionalFormContainer />
        </Route>
        <Route key={3} exact path="/professional/form/:id">
            <ProfessionalFormContainer />
        </Route>
        <Route key={4} exact path="/professional">
            <Redirect to="/professional/list" />
        </Route>
    </Switch>);
}

export { Routes };