import React from 'react';

import {Link, Navigate, Route, Routes} from 'react-router-dom';

import {useAuth} from '../../contexts/AuthContext';
import {Accounts} from '../Accounts';
import {AuthPage} from '../AuthPage';
import {Home} from '../Home';
import {MediaPosts} from '../MediaPosts';
import {Policy} from '../Policy';
import {Scenarios} from '../Scenarios';
import {Test} from '../Test';

export const mainMenuConfig = [
    {text: 'Home', to: '/', Component: Home},
    {text: 'Policy', to: '/policy', Component: Policy},
    {text: 'Media Posts', to: '/media-posts', Component: MediaPosts, isProtected: true},
    {text: 'Scenarios', to: '/scenarios', Component: Scenarios, isProtected: true},
    {text: 'Accounts', to: '/accounts', Component: Accounts, isProtected: true},
    {text: 'Test', to: '/tests', Component: Test, isProtected: true},
];

const ProtectedRoute = ({children, isProtected}) => {
    const {userLoggedIn} = useAuth();
    if (isProtected) {
        return userLoggedIn ? children : <Navigate to="/" />;
    } else {
        return children;
    }
};

export const MainNavigation = () => {
    const {userLoggedIn} = useAuth();
    return (
        <nav>
            <ul>
                {mainMenuConfig.map(({text, to, isProtected}) => {
                    if (isProtected) {
                        if (userLoggedIn) {
                            return (
                                <li key={`${text}-${to}`}>
                                    <Link to={to}>{text}</Link>
                                </li>
                            );
                        } else {
                            return null;
                        }
                    } else {
                        return (
                            <li key={`${text}-${to}`}>
                                <Link to={to}>{text}</Link>
                            </li>
                        );
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
            <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    );
};
