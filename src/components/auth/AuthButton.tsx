import React from 'react';

import {Button} from '@gravity-ui/uikit';

import {keycloak} from '../../configs/keycloakApi';
import {useAuth} from '../../contexts/AuthContext';

export const AuthButton = () => {
    const {userLoggedIn} = useAuth();

    return (
        <Button
            view={userLoggedIn ? 'normal' : 'action'}
            onClick={() => {
                if (userLoggedIn) {
                    keycloak.logout();
                } else {
                    keycloak.login({redirectUri: window.location.origin});
                }
            }}
        >
            {userLoggedIn ? 'Sign Out' : 'Sign In'}
        </Button>
    );
};
