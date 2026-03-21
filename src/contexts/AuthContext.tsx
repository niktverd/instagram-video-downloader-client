import React, {createContext, useContext, useEffect, useRef, useState} from 'react';

import {BrowserRouter} from 'react-router-dom';

import {keycloak} from '../configs/keycloakApi';

type AuthContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUser: any;
    userLoggedIn: boolean;
    loading: boolean;
};
const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProfider = ({children}: {children: React.ReactNode}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const isRun = useRef(false);

    useEffect(() => {
        if (isRun.current) return;
        isRun.current = true;

        keycloak
            .init({
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                checkLoginIframe: false,
            })
            .then((authenticated) => {
                setUserLoggedIn(authenticated);
                if (authenticated) {
                    keycloak
                        .loadUserProfile()
                        .then((profile) => {
                            setCurrentUser(profile);
                        })
                        .catch((error) => {
                            // eslint-disable-next-line no-console
                            console.error('Failed to load user profile', error);
                        });
                }
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.error('Failed to initialize Keycloak', error);
            })
            .finally(() => {
                setLoading(false);
            });

        // Setup token refresh listener or interval if needed, but we'll refresh on fetch for now
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, userLoggedIn, loading}}>
            <BrowserRouter>{children}</BrowserRouter>
        </AuthContext.Provider>
    );
};
