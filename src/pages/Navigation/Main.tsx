import React, {JSX} from 'react';

import {Link, Navigate, Route, Routes} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';
import {Accounts} from '../Accounts';
import {AnalizeUserContent} from '../AnalizeUserContent';
import {AuthPage} from '../AuthPage/AuthPage';
import {Home} from '../Home';
import {InstagramCallback} from '../InstagramCallback';
import {MediaPosts} from '../MediaPosts';
import {Policy} from '../Policy';
import {Scenarios} from '../Scenarios/Scenarios';
import {Test} from '../Test';

import cl from './Main.module.css';

type IsAllowedArgs = {
    userLoggedIn: boolean;
    isProtected?: boolean | string[];
    userLogin?: string;
};

const isAllowed = ({isProtected, userLoggedIn, userLogin}: IsAllowedArgs) => {
    if (isProtected) {
        if (userLoggedIn) {
            if (typeof isProtected === 'boolean') {
                return true;
            } else if (userLogin) {
                return isProtected.includes(userLogin);
            }
        } else {
            return false;
        }
        return false;
    } else {
        return true;
    }
};

type MainMenuConfigType = {
    text: string;
    to: string;
    Component: () => JSX.Element;
    isProtected?: boolean | string[];
};

export const mainMenuConfig: MainMenuConfigType[] = [
    {text: 'Home', to: '/', Component: Home},
    {text: 'Policy', to: '/policy', Component: Policy},
    {
        text: 'Media Posts',
        to: '/media-posts',
        Component: MediaPosts,
        isProtected: ['oKDGdx26d2SuT3yYi5fikiVWdvJ2'],
    },
    {
        text: 'Scenarios',
        to: '/scenarios',
        Component: Scenarios,
        isProtected: ['oKDGdx26d2SuT3yYi5fikiVWdvJ2'],
    },
    {
        text: 'Accounts',
        to: '/accounts',
        Component: Accounts,
        isProtected: ['oKDGdx26d2SuT3yYi5fikiVWdvJ2'],
    },
    {text: 'Test', to: '/tests', Component: Test, isProtected: ['oKDGdx26d2SuT3yYi5fikiVWdvJ2']},
    {
        text: 'Analize User Content',
        to: '/analize-user-content',
        Component: AnalizeUserContent,
        isProtected: true,
    },
];

const ProtectedRoute = ({children, isProtected}) => {
    const {userLoggedIn, currentUser} = useAuth();
    if (isProtected) {
        return isAllowed({userLoggedIn, isProtected, userLogin: currentUser?.uid}) ? (
            children
        ) : (
            <Navigate to="/" />
        );
    } else {
        return children;
    }
};

export const MainNavigation = () => {
    const {userLoggedIn, currentUser} = useAuth();

    return (
        <nav>
            <ul className={cl.ul}>
                {mainMenuConfig.map(({text, to, isProtected}) => {
                    if (isAllowed({userLoggedIn, isProtected, userLogin: currentUser?.uid})) {
                        return (
                            <li key={`${text}-${to}`}>
                                <Link to={to}>{text}</Link>
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
            </ul>
        </nav>
    );
};

export const MainNavigationRoutes = () => {
    return (
        <Routes>
            {mainMenuConfig.map(({text, to, isProtected, Component}) => {
                return (
                    <Route
                        key={`${text}-${to}`}
                        path={to}
                        element={
                            <ProtectedRoute isProtected={isProtected}>
                                <Component />
                            </ProtectedRoute>
                        }
                    />
                );
            })}
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/instagram-callback" element={<InstagramCallback />} />
            <Route path="/instagram-callback/:accountId" element={<InstagramCallback />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    );
};
