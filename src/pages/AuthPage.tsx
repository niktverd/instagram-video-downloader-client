/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Tabs} from '@gravity-ui/uikit';

import {Login} from '../components/auth/Login';
import {Registration} from '../components/auth/Registration';

enum Tab {
    LoginTab = 'login',
    RegistrationTab = 'registration',
}

export const AuthPage = () => {
    const [tab, setTab] = useState<Tab>(Tab.LoginTab);

    let tabContent = null;

    if (tab === Tab.LoginTab) {
        tabContent = <Login />;
    }

    if (tab === Tab.RegistrationTab) {
        tabContent = <Registration />;
    }

    return (
        <div>
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
