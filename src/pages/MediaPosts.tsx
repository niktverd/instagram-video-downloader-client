import React, {useCallback, useState} from 'react';

import {MediaPostCard} from '../components/MediaPostCard/MediaPostCard';
import {Routes as ProjectRoutes} from '../utils/constants';
import {fetchGet} from '../utils/fetchHelpers';

export const MediaPosts = () => {
    const [mediaPosts, setMediaPosts] = useState([]);
    const [lastDocumnetId, setLastDocumentId] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.getMediaPosts,
            query: {limit: 3, lastDocumnetId},
        });

        setMediaPosts([...mediaPosts, ...json.mediaPosts]);
        setLastDocumentId(json.lastDocumnetId);
        setHasMore(json.hasMore);
    }, [lastDocumnetId, mediaPosts]);

    return (
        <div>
            <h2>Media posts</h2>
            <button onClick={handleLoadClick} disabled={!hasMore}>
                load
            </button>
            {/* <pre style={{width: '100vw'}}>{JSON.stringify(mediaPosts, null, 3)}</pre> */}
            {mediaPosts.map((mediaPost) => {
                return <MediaPostCard key={mediaPost.id} {...mediaPost} />;
            })}
        </div>
    );
};
