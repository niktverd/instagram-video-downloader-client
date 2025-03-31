import React, {useState} from 'react';

import {Switch} from '@gravity-ui/uikit';
import {getRootClassName} from '@gravity-ui/uikit/server';

import {AuthButton} from './components/auth/AuthButton';
import {AppEnvContext} from './contexts/AppEnv';
import {AuthProfider} from './contexts/AuthContext';
import {MainNavigation, MainNavigationRoutes} from './pages/Navigation/Main';

import './App.css';

const theme = 'dark';
const rootClassName = getRootClassName({theme});

function App() {
    const [isProd, setIsProd] = useState(false);

    return (
        <div className={`App g-root ${rootClassName}`}>
            <AuthProfider>
                <h1>Instagram Schedule And Analytics</h1>
                <div>
                    <span>Preprod</span>
                    <Switch checked={isProd} onUpdate={(cheched) => setIsProd(cheched)}>
                        Prod
                    </Switch>
                </div>
                {/* <Router> */}
                <div>
                    <MainNavigation />
                    <AuthButton />
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
