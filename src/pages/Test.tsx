/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Tab, TabList, TabPanel, TabProvider} from '@gravity-ui/uikit';

import {ConvertImageToVideo} from '../components/tabs/ConvertImageToVideo';
import {CronTest} from '../components/tabs/Cron';
import {DeletePreprodData} from '../components/tabs/DeletePreprodData';
import {GetUserById} from '../components/tabs/GetUserById';
import {UniDecode} from '../components/tabs/Unidecode';

enum TabEnum {
    Cron = 'cron',
    Video = 'video',
    DeletePreprodDatabase = 'DeletePreprodData',
    GetUserByIdTab = 'uiGetInstagramUserById',
    Unidecode = 'Unidecode',
    Convert = 'Convert',
}

export const Test = () => {
    const [tab, setTab] = useState<TabEnum>(TabEnum.Cron);

    const config = [
        {
            id: TabEnum.Cron,
            title: 'Cron',
            content: <CronTest />,
        },
        {
            id: TabEnum.DeletePreprodDatabase,
            title: 'DeletePreprodDatabase',
            content: <DeletePreprodData />,
        },
        {
            id: TabEnum.GetUserByIdTab,
            title: 'GetUserByIdTab',
            content: <GetUserById />,
        },
        {
            id: TabEnum.Unidecode,
            title: 'Unidecode',
            content: <UniDecode />,
        },
        {
            id: TabEnum.Convert,
            title: 'Convert',
            content: <ConvertImageToVideo />,
        },
    ];
    return (
        <div>
            <h2>Test</h2>
            <TabProvider value={tab} onUpdate={(value) => setTab(value as TabEnum)}>
                <TabList>
                    {config.map((item) => (
                        <Tab key={item.id} value={item.id}>
                            {item.title}
                        </Tab>
                    ))}
                </TabList>
                <div>
                    {config.map((item) => (
                        <TabPanel key={item.id} value={item.id}>
                            {item.content}
                        </TabPanel>
                    ))}
                </div>
            </TabProvider>
        </div>
    );
};
