// /* eslint-disable import/no-extraneous-dependencies */
// import {keycloakInstance} from '../configs/keycloak';

// import {handleAuthError} from './errors';

// /**
//  * Sign in with email and password using Keycloak
//  * @param email User's email address
//  * @param _password User's password (not used in Keycloak redirect flow)
//  * @returns Promise that resolves when login redirect is initiated
//  */
// export const doSignInWithEmailAndPassword = async (
//     email: string,
//     _password: string,
// ): Promise<void> => {
//     try {
//         // Keycloak doesn't support direct password authentication from the client
//         // We need to redirect to Keycloak login page with login hint
//         // Password parameter is kept for API compatibility but not used in redirect flow
//         await keycloakInstance.login({
//             loginHint: email,
//         });
//     } catch (error) {
//         throw handleAuthError(error);
//     }
// };

// /**
//  * Create a new user account with email and password using Keycloak
//  * @param email User's email address
//  * @param _password User's password (not used in Keycloak redirect flow)
//  * @returns Promise that resolves when registration redirect is initiated
//  */
// export const doCreateUserWithEmailAndPassword = async (
//     email: string,
//     _password: string,
// ): Promise<void> => {
//     try {
//         // Redirect to Keycloak registration page
//         // Password parameter is kept for API compatibility but not used in redirect flow
//         await keycloakInstance.register({
//             loginHint: email,
//         });
//     } catch (error) {
//         throw handleAuthError(error);
//     }
// };

// /**
//  * Sign in with Google OAuth using Keycloak
//  * @returns Promise that resolves when OAuth redirect is initiated
//  */
// export const doSignInWithGoogle = async (): Promise<void> => {
//     try {
//         await keycloakInstance.login({
//             idpHint: 'google',
//         });
//     } catch (error) {
//         throw handleAuthError(error);
//     }
// };

// /**
//  * Sign out the current user
//  * @returns Promise that resolves when logout is complete
//  */
// export const doSignOut = async (): Promise<void> => {
//     try {
//         await keycloakInstance.logout();
//     } catch (error) {
//         throw handleAuthError(error);
//     }
// };

// /**
//  * Get the current access token
//  * @returns Access token or undefined if not authenticated
//  */
// export const getAccessToken = (): string | undefined => {
//     return keycloakInstance.token;
// };

// /**
//  * Refresh the authentication token
//  * @param minValidity Minimum validity in seconds (default: 5)
//  * @returns Promise that resolves to true if token was refreshed
//  */
// export const refreshToken = async (minValidity = 5): Promise<boolean> => {
//     try {
//         return await keycloakInstance.updateToken(minValidity);
//     } catch (error) {
//         // eslint-disable-next-line no-console
//         console.error('Token refresh error:', error);
//         return false;
//     }
// };

// /**
//  * Check if user is authenticated
//  * @returns True if user is authenticated
//  */
// export const isAuthenticated = (): boolean => {
//     return keycloakInstance.authenticated ?? false;
// };
