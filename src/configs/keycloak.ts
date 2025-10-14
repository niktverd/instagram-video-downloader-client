/* eslint-disable valid-jsdoc */
/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore - keycloak-js has type definitions but moduleResolution issue
import Keycloak from 'keycloak-js';
export const keycloakInstance = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});
