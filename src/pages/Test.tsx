/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Tabs} from '@gravity-ui/uikit';

import {ConvertImageToVideo} from '../components/tabs/ConvertImageToVideo';
import {CronTest} from '../components/tabs/Cron';
import {DeletePreprodData} from '../components/tabs/DeletePreprodData';
import {GetUserById} from '../components/tabs/GetUserById';
import {UniDecode} from '../components/tabs/Unidecode';

enum Tab {
    Cron = 'cron',
    Video = 'video',
    DeletePreprodDatabase = 'DeletePreprodData',
    GetUserByIdTab = 'uiGetInstagramUserById',
    Unidecode = 'Unidecode',
    Convert = 'Convert',
}

export const Test = () => {
    const [tab, setTab] = useState<Tab>(Tab.Cron);

    let tabContent = null;

    if (tab === Tab.Cron) {
        tabContent = <CronTest />;
    }

    if (tab === Tab.DeletePreprodDatabase) {
        tabContent = <DeletePreprodData />;
    }

    if (tab === Tab.GetUserByIdTab) {
        tabContent = <GetUserById />;
    }
    if (tab === Tab.Unidecode) {
        tabContent = <UniDecode />;
    }
    if (tab === Tab.Convert) {
        tabContent = <ConvertImageToVideo />;
    }

    return (
        <div>
            <h2>Test</h2>
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
