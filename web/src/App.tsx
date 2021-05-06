import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './App.css';
import LoginContainer from './modules/login/Login.Container';
import Routes from './Routes';
import AuthenticationService from './services/Authentication.service';

function App() {

    return (
        <BrowserRouter>
            {!AuthenticationService.isAuthenticated() && <Redirect to="/login" />}
            <Route children={<LoginContainer />} exact path="/login" />
            {AuthenticationService.isAuthenticated() && (
                <Route children={<Routes />} path="/" />
            )}
        </BrowserRouter>
    );
}

export default App;