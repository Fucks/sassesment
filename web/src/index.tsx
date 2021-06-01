import React from 'react';
import ReactDOM from 'react-dom';
import App, { GlobalStyle } from './App';
import reportWebVitals from './reportWebVitals';
import { AuthenticationProvider } from './context/AutenticationContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthenticationProvider>
            <GlobalStyle />
            <App />
        </AuthenticationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
