import React, {useCallback, useState} from 'react';

import {Button, Modal, useToaster} from '@gravity-ui/uikit';

import {Scenario} from '../components/Scenario/Scenario';
import {AddBannerInTheEnd} from '../components/Scenario/forms/AddBannerInTheEnd';
import {Routes as ProjectRoutes} from '../utils/constants';
import {fetchGet, fetchPost} from '../utils/fetchHelpers';

export const Scenarios = () => {
    const [scenarios, setScenarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const {add} = useToaster();

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.getScenarios,
            query: {},
        });

        setScenarios(json);
    }, []);
    const handleCreateVideoClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.createVideoByScenario,
            query: {},
        });

        add({
            name: Math.random() + '-create-video',
            title: JSON.stringify(json),
            theme: 'info',
        });
    }, [add]);

    return (
        <div>
            <h2>Scenarios</h2>
            <Button view="action" onClick={handleLoadClick}>
                Get Data
            </Button>
            <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                add
            </Button>
            <Button view="outlined-action" onClick={handleCreateVideoClick}>
                create video
            </Button>
            {scenarios.map((scenario) => {
                return <Scenario key={scenario.id} {...scenario} />;
            })}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <AddBannerInTheEnd
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSubmit={async (values: any) => {
                        // eslint-disable-next-line no-console
                        console.log(values);
                        await fetchPost({route: ProjectRoutes.addScenario, body: {values}});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
