import React, {useState} from 'react';

import {Switch} from '@gravity-ui/uikit';
// import {getRootClassName} from '@gravity-ui/uikit/server';

import {AuthButton} from './components/auth/AuthButton';
import {AppEnvContext} from './contexts/AppEnv';
import {AuthProfider} from './contexts/AuthContext';
import {MainNavigation, MainNavigationRoutes} from './pages/Navigation/Main';

import './App.css';

// const theme = 'dark';
// const rootClassName = getRootClassName({theme});

function App() {
    const [isProd, setIsProd] = useState(process.env.REACT_APP_APP_ENV === 'prod');
    console.log('process.env.REACT_APP_APP_ENV', process.env.REACT_APP_APP_ENV);
    console.log(
        'process.env.REACT_APP_API_ENDPOINT_PREPROD',
        process.env.REACT_APP_API_ENDPOINT_PREPROD,
    );
    console.log('process.env.REACT_APP_API_ENDPOINT_PROD', process.env.REACT_APP_API_ENDPOINT_PROD);
    console.log('process.env', process.env);

    return (
        <div className={`App g-root`}>
            <AuthProfider>
                <h1>Instagram Schedule And Analytics</h1>
                {process.env.REACT_APP_APP_ENV === 'dev' ? (
                    <div>
                        <span>Preprod</span>
                        <Switch checked={isProd} onUpdate={(cheched) => setIsProd(cheched)}>
                            Prod
                        </Switch>
                    </div>
                ) : null}
                <div className="navigation">
                    <MainNavigation />
                    <AuthButton />
                </div>
                <div>
                    <AppEnvContext.Provider value={{isProd}}>
                        <MainNavigationRoutes />
                        {/* If you want a default/fallback route when no other route matches */}
                    </AppEnvContext.Provider>
                </div>
            </AuthProfider>
        </div>
    );
}

export default App;
