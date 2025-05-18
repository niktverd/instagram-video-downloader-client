import React, {JSX} from 'react';

import {Link, Navigate, Route, Routes} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';
import {Root as AccountRoot} from '../Account';
import {AnalizeUserContent} from '../AnalizeUserContent';
import {AuthPage} from '../AuthPage/AuthPage';
import {Home} from '../Home';
import {InstagramCallback} from '../InstagramCallback';
import {Policy} from '../Policy';
import {Root as PreparedVideoRoot} from '../PreparedVideo';
import {Root as ScenarioRoot} from '../Scenario';
import {Root as SourceRoot} from '../Source';
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
        text: 'Scenarios',
        to: '/scenario/*',
        Component: ScenarioRoot,
        isProtected: true,
    },
    {
        text: 'Accounts',
        to: '/account/*',
        Component: AccountRoot,
        isProtected: true,
    },
    {
        text: 'Sources',
        to: '/sources/*',
        Component: SourceRoot,
        isProtected: true,
    },
    {
        text: 'Prepared Videos',
        to: '/prepared-videos/*',
        Component: PreparedVideoRoot,
        isProtected: true,
    },
    {text: 'Test', to: '/tests', Component: Test, isProtected: true},
    {
        text: 'Analize User Content',
        to: '/analize-user-content',
        Component: AnalizeUserContent,
        isProtected: true,
    },
];

const ProtectedRoute = ({children, isProtected}) => {
    const {userLoggedIn, currentUser, loading} = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }
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
                                <Link to={to.replace(/\*$/g, '')}>{text}</Link>
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
