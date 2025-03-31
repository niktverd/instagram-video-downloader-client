/* eslint-disable import/no-extraneous-dependencies */
import React, {useCallback, useContext, useState} from 'react';

import {Button, Modal, useToaster} from '@gravity-ui/uikit';

import {Account} from '../components/Account/Account';
import {AddAccount} from '../components/Account/forms/AddAccount';
// import {AddBannerInTheEnd} from '../components/Scenario/forms/AddBannerInTheEnd';
import {AppEnvContext} from '../contexts/AppEnv';
import {Routes as ProjectRoutes} from '../utils/constants';
import {fetchGet, fetchPost} from '../utils/fetchHelpers';

export const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const [insights, setInsights] = useState<unknown>({});

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.getAccounts,
            query: {},
            isProd,
        });

        setAccounts(json);
        add({
            name: Math.random() + '-split',
            title: 'data loaded',
        });
    }, [add, isProd]);

    const handleGetInsights = async () => {
        const totalReach: Record<string, number> = {};
        const totalImpressions: Record<string, number> = {};

        for (const account of accounts) {
            const {data} = await fetchGet({
                route: ProjectRoutes.getInsights,
                query: {id: account.id},
                isProd,
            });

            if (!data) {
                continue;
            }

            for (const parameter of data) {
                const {name, values} = parameter;
                for (const val of values) {
                    const {end_time: endTime, value} = val;
                    if (name === 'impressions') {
                        totalImpressions[endTime] = (totalImpressions[endTime] || 0) + value;
                    }
                    if (name === 'reach') {
                        totalReach[endTime] = (totalImpressions[endTime] || 0) + value;
                    }
                }
            }
        }

        // eslint-disable-next-line no-console
        console.log({totalReach, totalImpressions});
        setInsights({totalReach, totalImpressions});
    };

    return (
        <div>
            <h2>Accounts</h2>
            <Button view="action" onClick={handleLoadClick}>
                Get Data
            </Button>
            <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                add
            </Button>
            <Button view="outlined-action" onClick={handleGetInsights}>
                get insights
            </Button>
            <pre>{JSON.stringify(insights, null, 3)}</pre>
            {accounts.map((account) => {
                return <Account key={account.id} {...account} />;
            })}
            <Modal className="modal" open={openModal} onClose={() => setOpenModal(false)}>
                <AddAccount
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSubmit={async (values: any) => {
                        // eslint-disable-next-line no-console
                        console.log(values);
                        await fetchPost({route: ProjectRoutes.addAccount, body: {values}, isProd});
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
