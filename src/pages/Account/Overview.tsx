import React, {useContext, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import {Account} from '../../components/Account/Account';
import {AppEnvContext} from '../../contexts/AppEnv';
import {IAccount} from '../../sharedTypes';
import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

export const Overview = () => {
    const {id} = useParams();
    const {isProd} = useContext(AppEnvContext);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchGet<IAccount>({
            route: ProjectRoutes.getAccountById,
            query: {id},
            isProd,
        })
            .then(setAccount)
            .finally(() => setLoading(false));
    }, [id, isProd]);

    if (loading) return <div>Loading...</div>;
    if (!account) return <div>Not found</div>;
    return <Account {...account} />;
};
