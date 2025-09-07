/* eslint-disable import/no-extraneous-dependencies */
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfigData =
    import.meta.env.VITE_APP_ENV === 'dev'
        ? import.meta.env.VITE_FIREBASE_CONFIG_PREPROD
        : import.meta.env.VITE_FIREBASE_CONFIG;

console.log('firebaseConfigData', firebaseConfigData.slice(0, 30));
if (!firebaseConfigData) {
    throw new Error('Firebase configuration not found in environment variables');
}

const firebaseConfig = JSON.parse(firebaseConfigData);
console.log('firebaseConfig', JSON.stringify(firebaseConfig).slice(0, 30));

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
