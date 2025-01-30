import React from 'react';

import {MediaPostModel} from '../../types';

import cn from './MediaPostCard.module.css';

export const MediaPostCard = (props: MediaPostModel) => {
    const {sources} = props;
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
                        <strong>hashtags:</strong>{' '}
                        {sources.instagramReel.originalHashtags.join(' ')}
                    </div>
                </div>
                {/* <pre>{JSON.stringify(props.sources, null, 3)}</pre> */}
            </div>
            <div>system data</div>
            {/* <pre>{JSON.stringify(props)}</pre> */}
        </div>
    );
};
