import { BrowserRouter, Route } from 'react-router-dom';
import LoginContainer from './modules/login/Login.Container';
import Routes from './Routes';
import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useAuthentication } from './context/AutenticationContext';
import { useEffect } from 'react';
import { LoginService } from './services/login/login.service';
import { createGlobalStyle } from 'styled-components'
import PerfectScrollbar from 'react-perfect-scrollbar'

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
        <>
        <PerfectScrollbar>
            <BrowserRouter>
                <Route children={<Routes />} path="/" />
            </BrowserRouter >
        </PerfectScrollbar>
        </>
    );

}

export default App;


export const GlobalStyle = createGlobalStyle`
html {
    height: 100%;
}

body {
  margin: 0;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
    height: 100%;
    overflow: hidden;
}

#main{
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 60px);
}

a {
    text-decoration: none;
}

fieldset {
    border: none;
    padding: 0;
}`;