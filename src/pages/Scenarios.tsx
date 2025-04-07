/* eslint-disable import/no-extraneous-dependencies */
import React, {useCallback, useContext, useState} from 'react';

import {Button, Modal, TextInput, useToaster} from '@gravity-ui/uikit';

import {Scenario} from '../components/Scenario/Scenario';
import {ScenarioRouter} from '../components/Scenario/forms/ScenarioRouter';
import {AppEnvContext} from '../contexts/AppEnv';
import {ScenarioType} from '../types';
import {Routes as ProjectRoutes} from '../utils/constants';
import {fetchGet, fetchPost} from '../utils/fetchHelpers';

export const Scenarios = () => {
    const [scenarios, setScenarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [filterText, setFilterText] = useState('');
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.getScenarios,
            query: {},
            isProd,
        });

        setScenarios(json);
    }, [isProd]);
    const handleCreateVideoClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.createVideoByScenario,
            query: {},
            isProd,
        });

        add({
            name: Math.random() + '-create-video',
            title: JSON.stringify(json),
            theme: 'info',
        });
    }, [add, isProd]);

    const filteredScenarios = scenarios.filter((scenario) => {
        if (!filterText) return true;
        const search = filterText.toLowerCase();
        return (
            scenario.name.toLowerCase().includes(search) ||
            scenario.type.toLowerCase().includes(search)
        );
    });

    return (
        <div>
            <h2>Scenarios</h2>
            <div style={{display: 'flex', gap: '10px', marginBottom: '16px'}}>
                <Button view="action" onClick={handleLoadClick}>
                    Get Data
                </Button>
                <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                    add
                </Button>
                <Button view="outlined-action" onClick={handleCreateVideoClick}>
                    create video
                </Button>
                <TextInput
                    placeholder="Filter by name or type..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{minWidth: '300px'}}
                />
            </div>
            <div style={{margin: 64, maxWidth: 1000}}>
                {filteredScenarios.map((scenario) => {
                    return <Scenario key={scenario.id} {...scenario} />;
                })}
            </div>
            <Modal className="modal" open={openModal} onClose={() => setOpenModal(false)}>
                <ScenarioRouter
                    initialValues={{type: ScenarioType.ScenarioAddBannerAtTheEndType}}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSubmit={async (values: any) => {
                        // eslint-disable-next-line no-console
                        console.log(values);
                        await fetchPost({route: ProjectRoutes.addScenario, body: {values}, isProd});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
