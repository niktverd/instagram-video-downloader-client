import React from 'react';

import {Button} from '@gravity-ui/uikit';

// import {doSignOut} from '../../auth/utils';
import {useAuth} from '../../hooks/useAuth';

export const AuthButton = () => {
    const {userLoggedIn, keycloak} = useAuth();

    return (
        <Button
            view={userLoggedIn ? 'normal' : 'action'}
            onClick={() => {
                if (userLoggedIn) {
                    // doSignOut();
                    keycloak.logout();
                } else {
                    keycloak.login();
                }
            }}
        >
            {userLoggedIn ? 'Sign Out' : 'Sign In'}
        </Button>
    );
};
