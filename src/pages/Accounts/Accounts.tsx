/* eslint-disable import/no-extraneous-dependencies */
import React, {useCallback, useContext, useState} from 'react';

import {Button, Modal, TextInput, useToaster} from '@gravity-ui/uikit';

import {Account} from '../../components/Account/Account';
import {AddAccount} from '../../components/Account/forms/AddAccount';
// import {AddBannerInTheEnd} from '../components/Scenario/forms/AddBannerInTheEnd';
import {AppEnvContext} from '../../contexts/AppEnv';
import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchGet, fetchPost} from '../../utils/fetchHelpers';

import cn from './Accounts.module.css';

export const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const [insights, setInsights] = useState<unknown>({});
    const [filterValue, setFilterValue] = useState('');

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

    const filteredAccounts = accounts.filter((account) => {
        if (!filterValue) return true;
        const lowercasedFilter = filterValue.toLowerCase();

        // Filter by ID
        if (account.id && account.id.toLowerCase().includes(lowercasedFilter)) {
            return true;
        }

        // Filter by available scenarios
        if (account.availableScenarios && Array.isArray(account.availableScenarios)) {
            return account.availableScenarios.some(
                (scenario) => scenario && scenario.toLowerCase().includes(lowercasedFilter),
            );
        }

        return false;
    });

    return (
        <div className={cn.container}>
            <div className={cn.header}>
                <h2>Accounts</h2>
                <div className={cn.actions}>
                    <Button view="action" onClick={handleLoadClick}>
                        Get Data
                    </Button>
                    <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                        add
                    </Button>
                    <Button view="outlined-action" onClick={handleGetInsights}>
                        get insights
                    </Button>
                </div>
            </div>

            <pre className={cn.insights}>{JSON.stringify(insights, null, 3)}</pre>

            <div className={cn.filter}>
                <TextInput
                    placeholder="Filter by ID or scenario..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    size="m"
                />
            </div>

            <div className={cn.accountsGrid}>
                {filteredAccounts.map((account) => {
                    return <Account key={account.id} {...account} />;
                })}
            </div>

            <Modal contentClassName={cn.modal} open={openModal} onClose={() => setOpenModal(false)}>
                <AddAccount
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSubmit={async (values: any) => {
                        // eslint-disable-next-line no-console
                        console.log(values);
                        await fetchPost({
                            route: ProjectRoutes.addAccount,
                            body: {...values},
                            isProd,
                        });
                        setOpenModal(false);
                    }}
                />
            </Modal>
        </div>
    );
};
