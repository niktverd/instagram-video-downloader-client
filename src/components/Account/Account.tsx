/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext, useState} from 'react';

import {Button, Modal} from '@gravity-ui/uikit';
import {omit} from 'lodash';

import {AppEnvContext} from '../../contexts/AppEnv';
import {IAccount} from '../../sharedTypes';
import {Routes} from '../../utils/constants';
import {fetchGet, fetchPatch, fetchPost} from '../../utils/fetchHelpers';

import {InstagramConnect} from './InstagramConnect';
import {AddAccount} from './forms/AddAccount';

import cn from './Account.module.css';

export const Account = (props: IAccount) => {
    const [openModal, setOpenModal] = useState(false);
    const {token, id, availableScenarios, slug, token: instagramToken, userIdIG} = props;
    const [insights, setInsights] = useState([]);
    const [media, setMedia] = useState([]);
    const {isProd} = useContext(AppEnvContext);

    const scenarioIds = availableScenarios.map((scenario) =>
        typeof scenario === 'number' ? scenario : scenario.id,
    );

    const handleGetInsights = async () => {
        const data = await fetchGet({route: Routes.getInsights, query: {id}, isProd});

        setInsights(data);
    };

    const handleGetMedia = async () => {
        const data = await fetchGet({route: Routes.getMedia, query: {id}, isProd});

        setMedia(data);
    };

    // eslint-disable-next-line no-console
    console.log(media);

    return (
        <div className={cn.container}>
            <div>
                <div className={cn.header}>
                    <h2>{slug}</h2>
                    <p>{id}</p>
                    {token && <p className={cn.token}>Token: {token.slice(0, 3)}****</p>}
                    {userIdIG && <p className={cn.token}>IG User ID: {userIdIG}</p>}
                    <div className={cn.actions}>
                        <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                            Edit
                        </Button>
                        <Button onClick={handleGetInsights}>get insights</Button>
                        <Button onClick={handleGetMedia}>get media</Button>
                        <Button
                            onClick={async () => {
                                await fetchPost({
                                    route: Routes.addAccount,
                                    body: {
                                        values: {...omit(props, 'id'), copiedFrom: props.id},
                                    } as any,
                                    isProd: !isProd,
                                });
                            }}
                        >
                            Copy to {isProd ? 'preprod' : 'prod'}
                        </Button>
                        <InstagramConnect
                            accountId={String(id)}
                            token={instagramToken}
                            slug={slug}
                        />
                    </div>
                    {insights.length > 0 && (
                        <div className={cn.insights}>
                            <h1>Insights</h1>
                            <pre className={cn.insightsData}>{JSON.stringify(insights)}</pre>
                        </div>
                    )}
                </div>
                <pre className={cn.details}>{JSON.stringify(props, null, 3)}</pre>
            </div>
            <Modal open={openModal} contentClassName={cn.modal} onClose={() => setOpenModal(false)}>
                <AddAccount
                    initialValues={{
                        id,
                        slug,
                        token,
                        availableScenarios: scenarioIds,
                        instagramToken,
                    }}
                    onSubmit={async (values: any) => {
                        await fetchPatch({
                            route: Routes.patchAccount,
                            body: values,
                            isProd,
                        });
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
