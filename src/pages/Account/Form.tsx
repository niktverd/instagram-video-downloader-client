import React, {useContext, useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import {AddAccount} from '../../components/Account/forms/AddAccount';
import {AppEnvContext} from '../../contexts/AppEnv';
import {IAccount} from '../../sharedTypes';
import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchGet, fetchPatch, fetchPost} from '../../utils/fetchHelpers';
import {deepOmit} from '../../utils/helpers/objectHelpers';

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
                // Recursively remove createdAt and updatedAt fields at all levels
                const cleanedValues = deepOmit(values, ['createdAt', 'updatedAt']);

                if (mode === 'edit' && id) {
                    await fetchPatch({
                        route: ProjectRoutes.patchAccount,
                        body: {...cleanedValues, id},
                        isProd,
                    });
                    navigate(`../${id}`);
                } else {
                    await fetchPost({
                        route: ProjectRoutes.addAccount,
                        body: {...cleanedValues},
                        isProd,
                    });
                    navigate('..');
                }
            }}
        />
    );
};
