/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';

import {Button, Modal} from '@gravity-ui/uikit';

import {AccountV3} from '../../types';
import {Routes} from '../../utils/constants';
import {fetchGet, fetchPatch} from '../../utils/fetchHelpers';

import {AddAccount} from './forms/AddAccount';

import cn from './Account.module.css';

export const Account = (props: AccountV3) => {
    const [openModal, setOpenModal] = useState(false);
    const {token, id, availableScenarios} = props;
    const [insights, setInsights] = useState([]);

    const handleGetInsights = async () => {
        const data = await fetchGet({route: Routes.getInsights, query: {id}});

        setInsights(data);
    };

    return (
        <div className={cn.container}>
            <div>
                <div>
                    <h2>{id}</h2>
                    <p>{token.slice(0, 3)}****</p>
                    <div>
                        <Button onClick={handleGetInsights}>get insights</Button>
                    </div>
                    <div>
                        <h1>Insights</h1>
                        <pre>{JSON.stringify(insights)}</pre>
                    </div>
                </div>
                <pre>{JSON.stringify(props, null, 3)}</pre>
            </div>
            <div>
                <Button onClick={() => setOpenModal(true)}>Edit</Button>
            </div>
            <Modal open={openModal} contentClassName={cn.modal} onClose={() => setOpenModal(false)}>
                <AddAccount
                    initialValues={{id, token, availableScenarios}}
                    onSubmit={async (values: any) => {
                        await fetchPatch({
                            route: Routes.patchAccount,
                            body: {
                                id,
                                values: {
                                    ...values,
                                    availableScenarios: values.availableScenarios.filter(Boolean),
                                },
                            },
                        });
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
