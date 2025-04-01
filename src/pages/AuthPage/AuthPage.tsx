import React, {useEffect, useState} from 'react';

import {Tabs} from '@gravity-ui/uikit';
import {useLocation} from 'react-router-dom';

import {Login} from '../../components/auth/Login';
import {Registration} from '../../components/auth/Registration';

import cl from './AuthPage.module.css';

enum Tab {
    LoginTab = 'login',
    RegistrationTab = 'registration',
}

export const AuthPage = () => {
    const [tab, setTab] = useState<Tab>(Tab.LoginTab);
    const {hash} = useLocation();

    let tabContent = null;

    if (tab === Tab.LoginTab) {
        tabContent = <Login />;
    }

    if (tab === Tab.RegistrationTab) {
        tabContent = <Registration />;
    }

    useEffect(() => {
        if (hash === `#${Tab.LoginTab}`) {
            setTab(Tab.LoginTab);
        }

        if (hash === `#${Tab.RegistrationTab}`) {
            setTab(Tab.RegistrationTab);
        }
    }, [hash]);

    return (
        <div className={cl.page}>
            <h2>Authentication</h2>
            <Tabs
                activeTab={tab}
                items={Object.values(Tab).map((t) => ({
                    id: t,
                    title: t,
                }))}
                onSelectTab={(tabId) => setTab(tabId as Tab)}
            />
            {tabContent}
        </div>
    );
};
