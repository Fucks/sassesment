import { BrowserRouter, Route } from 'react-router-dom';
import LoginContainer from './modules/login/Login.Container';
import Routes from './Routes';
import './App.css';
import { useAuthentication } from './context/AutenticationContext';
import { useEffect } from 'react';
import { LoginService } from './services/login/login.service';

function App() {

    const { state: authentication } = useAuthentication();

    useEffect(() => {

        if (authentication) {
            new LoginService().checkToken();
        }

    }, [authentication])

    if (!authentication) {
        return <LoginContainer />
    }

    return (
        <BrowserRouter>
            <Route children={<Routes />} path="/" />
        </BrowserRouter>

    );

}

export default App;