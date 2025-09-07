/* eslint-disable import/no-extraneous-dependencies */
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfigData =
    import.meta.env.APP_ENV === 'development'
        ? import.meta.env.VITE_FIREBASE_CONFIG_PREPROD
        : import.meta.env.VITE_FIREBASE_CONFIG;

const firebaseConfig = JSON.parse(firebaseConfigData || '{}');

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
