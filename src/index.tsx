import React from 'react';

import {ThemeProvider} from '@gravity-ui/uikit';
import ReactDOM from 'react-dom/client';

import App from './App';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
// eslint-disable-next-line import/order
import './index.css';

// import reportWebVitals from './reportWebVitals';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reportWebVitals = (onPerfEntry?: any) => {
    // Изменили тип на any
    if (onPerfEntry && typeof onPerfEntry === 'function') {
        // Проверяем тип функции
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}: any) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider theme="dark">
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
reportWebVitals(); // Вызываем без аргумента или с функцией-обработчиком
