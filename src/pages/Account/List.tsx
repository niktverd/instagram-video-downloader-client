import React, {useCallback, useContext, useEffect, useState} from 'react';

import {Button, Modal, Table, TextInput, useToaster} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';

import {AddAccount} from '../../components/Account/forms/AddAccount';
import {AppEnvContext} from '../../contexts/AppEnv';
import {GetAllAccountsResponse, IAccount} from '../../sharedTypes';
import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchGet, fetchPost} from '../../utils/fetchHelpers';

import cn from './Accounts.module.css';

export const List = () => {
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);
    const [filterValue, setFilterValue] = useState('');
    const navigate = useNavigate();

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet<GetAllAccountsResponse>({
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

    useEffect(() => {
        handleLoadClick();
    }, [handleLoadClick]);

    const filteredAccounts = accounts.filter((account) => {
        if (!filterValue) return true;
        const lowercasedFilter = filterValue.toLowerCase();
        if (account.slug && account.slug.toLowerCase().includes(lowercasedFilter)) {
            return true;
        }
        if (account.availableScenarios && Array.isArray(account.availableScenarios)) {
            return account.availableScenarios.some(
                (scenario) =>
                    scenario?.slug && scenario.slug.toLowerCase().includes(lowercasedFilter),
            );
        }
        return false;
    });

    const columns = [
        {id: 'slug', name: 'Slug'},
        {id: 'enabled', name: 'Enabled'},
        {id: 'token', name: 'Token'},
        {id: 'actions', name: 'Actions'},
    ];

    const data = filteredAccounts.map((account) => ({
        ...account,
        enabled: account.enabled ? 'Yes' : 'No',
        token: account.token ? account.token.slice(0, 3) + '****' : '',
        actions: (
            <Button size="s" view="outlined" onClick={() => navigate(`${account.id}`)}>
                Details
            </Button>
        ),
    }));

    return (
        <div className={cn.container}>
            <div className={cn.header}>
                <h2>Accounts</h2>
                <div className={cn.actions}>
                    <Button view="action" onClick={handleLoadClick}>
                        Reload
                    </Button>
                    <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                        Add
                    </Button>
                </div>
            </div>
            <div className={cn.filter}>
                <TextInput
                    placeholder="Filter by ID or scenario..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    size="m"
                />
            </div>
            <Table columns={columns} data={data} />
            <Modal contentClassName={cn.modal} open={openModal} onClose={() => setOpenModal(false)}>
                <AddAccount
                    onSubmit={async (values: IAccount) => {
                        await fetchPost({
                            route: ProjectRoutes.addAccount,
                            body: {...values},
                            isProd,
                        });
                        setOpenModal(false);
                        handleLoadClick();
                    }}
                />
            </Modal>
        </div>
    );
};
