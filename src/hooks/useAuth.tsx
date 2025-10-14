/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore - keycloak-js has type definitions but moduleResolution issue
import {useKeycloak} from '@react-keycloak/web';

export const useAuth = () => {
    const {initialized, keycloak} = useKeycloak();
    const userLoggedIn = keycloak.authenticated;
    const currentUser = {
        uid: keycloak.idToken,
    };

    return {
        loading: !initialized,
        userLoggedIn,
        currentUser,
        keycloak,
    };
};
