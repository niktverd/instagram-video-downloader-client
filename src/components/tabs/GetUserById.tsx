/* eslint-disable import/no-extraneous-dependencies */
import React, {useState} from 'react';

import {Button} from '@gravity-ui/uikit';

import {Routes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

export const GetUserById = () => {
    const [userId, setUserId] = useState('');
    const [mediaId, setMediaId] = useState('');

    const handleGetUserByIdClick = async () => {
        await fetchGet({
            route: Routes.getUserById,
            query: {id: 'carcar.kz', userId},
            isProd: false,
        });
    };

    const handleGetOwnerByMediaIdClick = async () => {
        await fetchGet({
            route: Routes.getOwnerByMediaId,
            query: {id: 'carcar.kz', reelVideoId: mediaId},
            isProd: false,
        });
    };

    return (
        <div>
            <div>
                <h2>Get user by userId</h2>
                <input value={userId} onChange={(event) => setUserId(event.target.value)} />
                <Button onClick={handleGetUserByIdClick}>Get user By id</Button>
            </div>
            <div>
                <h2>Get user by userId</h2>
                <input value={mediaId} onChange={(event) => setMediaId(event.target.value)} />
                <Button onClick={handleGetOwnerByMediaIdClick}>Get owner By media id</Button>
            </div>
        </div>
    );
};
