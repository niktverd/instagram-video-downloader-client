/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';

import {Button, Modal} from '@gravity-ui/uikit';

import {ScenarioV3} from '../../types';
import {Routes} from '../../utils/constants';
import {fetchPatch} from '../../utils/fetchHelpers';

import {AddBannerInTheEnd} from './forms/AddBannerInTheEnd';

import cn from './Scenario.module.css';

export const Scenario = (props: ScenarioV3) => {
    const [openModal, setOpenModal] = useState(false);
    const {name, id, ...extra} = props;

    return (
        <div className={cn.container}>
            <div>
                <div>
                    <h2>{name}</h2>
                    <p>{id}</p>
                </div>
                <pre>{JSON.stringify(extra, null, 3)}</pre>
            </div>
            <div>
                <Button onClick={() => setOpenModal(true)}>Edit</Button>
            </div>
            <Modal open={openModal} contentClassName={cn.modal} onClose={() => setOpenModal(false)}>
                <AddBannerInTheEnd
                    initialValues={{...extra, name}}
                    onSubmit={async (values: any) => {
                        await fetchPatch({route: Routes.patchScenario, body: {id, values}});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
