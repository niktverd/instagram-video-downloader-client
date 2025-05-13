/* eslint-disable import/no-extraneous-dependencies */
import React, {useContext} from 'react';

import {Button} from '@gravity-ui/uikit';

import {AppEnvContext} from '../../contexts/AppEnv';
import {Routes} from '../../utils/constants';
import {fetchDelete} from '../../utils/fetchHelpers';

export const DeletePreprodData = () => {
    const {isProd} = useContext(AppEnvContext);

    const handleClearClick = async () => {
        await fetchDelete({
            route: Routes.clearPreprodDatabase,
            query: {},
            isProd,
        });
    };

    return (
        <div>
            <Button onClick={handleClearClick}>Delete Preprod Data</Button>
        </div>
    );
};
