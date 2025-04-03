/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Tab, TabList, TabPanel, TabProvider} from '@gravity-ui/uikit';

import PerformanceMonitor from '../components/PerformanceMonitor/PerformanceMonitor';
import {ConvertImageToVideo} from '../components/tabs/ConvertImageToVideo';
import {CronTest} from '../components/tabs/Cron';
import {DeletePreprodData} from '../components/tabs/DeletePreprodData';
import {GetUserById} from '../components/tabs/GetUserById';
import {UniDecode} from '../components/tabs/Unidecode';

enum TabEnum {
    CronTab = 'cron',
    VideoTab = 'video',
    DeletePreprodDatabaseTab = 'DeletePreprodData',
    GetUserByIdTab = 'uiGetInstagramUserById',
    UnidecodeTab = 'Unidecode',
    ConvertTab = 'Convert',
    PerformanceMonitorTab = 'performanceMonitor',
}

export const Test = () => {
    const [tab, setTab] = useState<TabEnum>(TabEnum.CronTab);

    const config = [
        {
            id: TabEnum.CronTab,
            title: 'Cron',
            content: <CronTest />,
        },
        {
            id: TabEnum.DeletePreprodDatabaseTab,
            title: 'DeletePreprodDatabase',
            content: <DeletePreprodData />,
        },
        {
            id: TabEnum.GetUserByIdTab,
            title: 'GetUserByIdTab',
            content: <GetUserById />,
        },
        {
            id: TabEnum.UnidecodeTab,
            title: 'Unidecode',
            content: <UniDecode />,
        },
        {
            id: TabEnum.ConvertTab,
            title: 'Convert',
            content: <ConvertImageToVideo />,
        },
        {
            id: TabEnum.PerformanceMonitorTab,
            title: 'Memory Usage',
            content: <PerformanceMonitor />,
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
