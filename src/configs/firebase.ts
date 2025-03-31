/* eslint-disable import/no-extraneous-dependencies */
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfigData =
    process.env.APP_ENV === 'development'
        ? process.env.REACT_APP_FIREBASE_CONFIG_PREPROD
        : process.env.REACT_APP_FIREBASE_CONFIG;

const firebaseConfig = JSON.parse(firebaseConfigData || '{}');

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
