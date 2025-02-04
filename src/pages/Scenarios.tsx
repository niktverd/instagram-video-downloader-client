import React, {useCallback, useState} from 'react';

import {Button, Modal} from '@gravity-ui/uikit';

import {Scenario} from '../components/Scenario/Scenario';
import {AddBannerInTheEnd} from '../components/Scenario/forms/AddBannerInTheEnd';
import {Routes as ProjectRoutes, Routes} from '../utils/constants';
import {fetchGet, fetchPost} from '../utils/fetchHelpers';

export const Scenarios = () => {
    const [scenarios, setScenarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.getScenarios,
            query: {},
        });

        setScenarios(json);
    }, []);

    return (
        <div>
            <h2>Scenarios</h2>
            <Button view="action" onClick={handleLoadClick}>
                Get Data
            </Button>
            <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                add
            </Button>
            {scenarios.map((scenario) => {
                return <Scenario key={scenario.id} {...scenario} />;
            })}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <AddBannerInTheEnd
                    onSubmit={async (values: any) => {
                        console.log(values);
                        await fetchPost({route: Routes.addScenario, body: {values}});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
