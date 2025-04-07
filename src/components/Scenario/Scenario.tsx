/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext, useState} from 'react';

import {ArrowDown, ArrowUp} from '@gravity-ui/icons';
import {Button, Card, Modal} from '@gravity-ui/uikit';
import {omit} from 'lodash';

import {AppEnvContext} from '../../contexts/AppEnv';
import {ScenarioV3} from '../../types';
import {Routes} from '../../utils/constants';
import {fetchPatch, fetchPost} from '../../utils/fetchHelpers';

import {ScenarioRouter} from './forms/ScenarioRouter';

import cn from './Scenario.module.css';

export const Scenario = (props: ScenarioV3) => {
    const [openModal, setOpenModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const {name, id, ...extra} = props;
    const {isProd} = useContext(AppEnvContext);

    return (
        <Card className={cn.container} type="container" view="outlined">
            <div className={cn.header}>
                <div className={cn.title}>
                    <h2>{name}</h2>
                    <p className={cn.id}>{id}</p>
                </div>
                <div className={cn.actions}>
                    <Button onClick={() => setOpenModal(true)}>Edit</Button>
                    <Button
                        onClick={async () => {
                            await fetchPost({
                                route: Routes.addScenario,
                                body: {
                                    values: {...omit(props, 'id'), copiedFrom: props.id},
                                } as any,
                                isProd: !isProd,
                            });
                        }}
                    >
                        Copy to {isProd ? 'preprod' : 'prod'}
                    </Button>
                    <Button
                        view="flat"
                        onClick={() => setExpanded(!expanded)}
                        className={cn.toggleButton}
                    >
                        {expanded ? <ArrowUp /> : <ArrowDown />}
                    </Button>
                </div>
            </div>

            {expanded && (
                <div className={cn.details}>
                    <pre>{JSON.stringify(extra, null, 3)}</pre>
                </div>
            )}
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
        </Card>
    );
};
