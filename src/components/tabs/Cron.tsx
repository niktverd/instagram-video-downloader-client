import React, {Fragment} from 'react';

import {Button, useToaster} from '@gravity-ui/uikit';

import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

import cn from './Cron.module.css';

export const CronTest = () => {
    const {add} = useToaster();

    const handleDownloadVideoClick = async () => {
        const json = await fetchGet({
            route: ProjectRoutes.downloadVideoFromSourceV3,
            query: {},
        });

        add({
            name: Math.random() + '-create-video',
            title: JSON.stringify(json),
            theme: 'info',
        });
    };

    const handleCreateVideoByScenarioClick = async () => {
        const json = await fetchGet({
            route: ProjectRoutes.createVideoByScenario,
            query: {},
        });

        add({
            name: Math.random() + '-create-video',
            title: JSON.stringify(json),
            theme: 'info',
        });
    };

    return (
        <Fragment>
            <h3>Cron</h3>
            <div className={cn.container}>
                <div>
                    <Button view="outlined-action" onClick={handleDownloadVideoClick}>
                        Download Video
                    </Button>
                </div>
                <div>
                    <Button view="outlined-action" onClick={handleCreateVideoByScenarioClick}>
                        Concat video
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};
