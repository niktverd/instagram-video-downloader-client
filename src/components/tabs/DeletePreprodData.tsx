/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import {Button} from '@gravity-ui/uikit';

import {Routes} from '../../utils/constants';
import {fetchDelete} from '../../utils/fetchHelpers';

export const DeletePreprodData = () => {
    const handleClearClick = async () => {
        await fetchDelete({
            route: Routes.clearPreprodDatabase,
            query: {},
            isProd: false,
        });
    };

    return (
        <div>
            <Button onClick={handleClearClick}>Delete Preprod Data</Button>
        </div>
    );
};
