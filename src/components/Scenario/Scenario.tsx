/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext, useState} from 'react';

import {Button, Modal} from '@gravity-ui/uikit';

import {AppEnvContext} from '../../contexts/AppEnv';
import {ScenarioV3} from '../../types';
import {Routes} from '../../utils/constants';
import {fetchPatch} from '../../utils/fetchHelpers';

import {ScenarioRouter} from './forms/ScenarioRouter';

import cn from './Scenario.module.css';

export const Scenario = (props: ScenarioV3) => {
    const [openModal, setOpenModal] = useState(false);
    const {name, id, ...extra} = props;
    const {isProd} = useContext(AppEnvContext);

    return (
        <div className={cn.container}>
            <div>
                <div>
                    <h2>{name}</h2>
                    <p>{id}</p>
                    <div>
                        <Button onClick={() => setOpenModal(true)}>Edit</Button>
                    </div>
                </div>
                <pre>{JSON.stringify(extra, null, 3)}</pre>
            </div>
            <Modal
                className="modal"
                open={openModal}
                contentClassName={cn.modal}
                onClose={() => setOpenModal(false)}
            >
                <ScenarioRouter
                    initialValues={{...extra, name}}
                    onSubmit={async (values: any) => {
                        await fetchPatch({route: Routes.patchScenario, body: {id, values}, isProd});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
