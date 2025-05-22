import React, {useContext, useEffect, useState} from 'react';

import {omit} from 'lodash';
import {useNavigate, useParams} from 'react-router-dom';

import {AddAccount} from '../../components/Account/forms/AddAccount';
import {AppEnvContext} from '../../contexts/AppEnv';
import {IAccount} from '../../sharedTypes';
import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchGet, fetchPatch, fetchPost} from '../../utils/fetchHelpers';

interface FormProps {
    mode: 'create' | 'edit';
}

export const Form = ({mode}: FormProps) => {
    const {id} = useParams();
    const {isProd} = useContext(AppEnvContext);
    const [initialValues, setInitialValues] = useState<IAccount | undefined>();
    const [loading, setLoading] = useState(mode === 'edit');
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'edit' && id) {
            setLoading(true);
            fetchGet<IAccount>({
                route: ProjectRoutes.getAccountById,
                query: {id},
                isProd,
            })
                .then(setInitialValues)
                .finally(() => setLoading(false));
        }
    }, [mode, id, isProd]);

    if (loading) return <div>Loading...</div>;

    return (
        <AddAccount
            initialValues={mode === 'edit' ? initialValues : undefined}
            onSubmit={async (values: IAccount) => {
                const omittedValues = omit(values, ['createdAt', 'updatedAt']);
                if (mode === 'edit' && id) {
                    await fetchPatch({
                        route: ProjectRoutes.patchAccount,
                        body: {...omittedValues, id},
                        isProd,
                    });
                    navigate(`../${id}`);
                } else {
                    await fetchPost({
                        route: ProjectRoutes.addAccount,
                        body: {...omittedValues},
                        isProd,
                    });
                    navigate('..');
                }
            }}
        />
    );
};
