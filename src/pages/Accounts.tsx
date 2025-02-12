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

    return (
        <div>
            <h2>Accounts</h2>
            <Button view="action" onClick={handleLoadClick}>
                Get Data
            </Button>
            <Button view="outlined-action" onClick={() => setOpenModal(true)}>
                add
            </Button>
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
