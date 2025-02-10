import React, {useState} from 'react';

import {Tabs} from '@gravity-ui/uikit';

import {CronTest} from '../components/tabs/Cron';
import {DeletePreprodData} from '../components/tabs/DeletePreprodData';

enum Tab {
    Cron = 'cron',
    Video = 'video',
    DeletePreprodDatabase = 'DeletePreprodData',
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
