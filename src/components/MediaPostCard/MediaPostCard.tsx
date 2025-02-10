import React, {useCallback, useContext} from 'react';

import {Button, useToaster} from '@gravity-ui/uikit';

import {AppEnvContext} from '../../contexts/AppEnv';
import {MediaPostModel} from '../../types';
import {Routes as ProjectRoutes} from '../../utils/constants';
import {fetchPost} from '../../utils/fetchHelpers';

import cn from './MediaPostCard.module.css';

const actionAllowed = process.env.REACT_APP_ACTION_ALLOWED;

export const MediaPostCard = (props: MediaPostModel) => {
    const {sources, id} = props;
    const {add} = useToaster();
    const {isProd} = useContext(AppEnvContext);

    const handleSplit = useCallback(async () => {
        try {
            const json = await fetchPost({
                route: ProjectRoutes.splitVideoInTheMiddle,
                // query: {limit, lastDocumnetId, orderByField, orderDirection},
                body: {id},
                isProd,
            });

            if (json.status === 'ok') {
                add({
                    name: id + '-split',
                    title: 'Split is started',
                });
            } else {
                throw new Error('Split problem is on server');
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            add({
                name: id + '-split-error',
                title: 'Split errro. Look at console',
                theme: 'danger',
            });
        }
    }, [add, id, isProd]);
    const handleTestGreen = useCallback(async () => {
        try {
            const json = await fetchPost({
                route: ProjectRoutes.testGreenScreen,
                // query: {limit, lastDocumnetId, orderByField, orderDirection},
                body: {id},
                isProd,
            });

            if (json.status === 'ok') {
                add({
                    name: id + '-split',
                    title: 'Test Green is started',
                });
            } else {
                throw new Error('Test Green problem is on server');
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            add({
                name: id + '-split-error',
                title: 'Test green errro. Look at console',
                theme: 'danger',
            });
        }
    }, [add, id, isProd]);
    return (
        <div className={cn.container}>
            <div className={cn.sourceContainer}>
                <div className={cn.videoContainer}>
                    <video className={cn.video} src={sources.instagramReel.url} controls={true} />
                </div>
                <div className={cn.users}>
                    <h2>users</h2>
                    <div className={cn.senderContainer}>
                        <h3>sender</h3>
                        senderId: {sources.instagramReel.senderId}
                        <br />
                        <br />
                        no data available about message sender, before app verification is
                        incomplete. we can only answer to him with thanks-message by id
                    </div>
                    <div className={cn.ownerContainer}>
                        <h3>owner</h3>
                        no data available about author of the video, before app verification is
                        incomplete
                    </div>
                </div>
                <div className={cn.data}>
                    <h2>video data</h2>
                    <div className={cn.field}>
                        <strong>title: </strong>
                        {sources.instagramReel.title}
                    </div>
                    <div className={cn.field}>
                        <strong>hashtags: </strong>
                        {sources.instagramReel.originalHashtags.join(' ')}
                    </div>
                    {actionAllowed ? (
                        <div className={cn.field}>
                            <h3>Actions</h3>
                            <Button onClick={handleSplit}>Split & Preproc</Button>
                            <Button onClick={handleTestGreen}>Test green</Button>
                        </div>
                    ) : null}
                </div>
                {/* <pre>{JSON.stringify(props.sources, null, 3)}</pre> */}
            </div>
            <div>system data</div>
            {/* <pre>{JSON.stringify(props)}</pre> */}
        </div>
    );
};
