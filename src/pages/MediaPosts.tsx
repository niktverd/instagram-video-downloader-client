import React, {useCallback, useContext, useState} from 'react';

import {Button, Select} from '@gravity-ui/uikit';

import {MediaPostCard} from '../components/MediaPostCard/MediaPostCard';
import {AppEnvContext} from '../contexts/AppEnv';
import {Routes as ProjectRoutes} from '../utils/constants';
import {fetchGet} from '../utils/fetchHelpers';
import {MediaPostModelFilters, OrderDirection} from '../utils/server.constants';

export const MediaPosts = () => {
    const [mediaPosts, setMediaPosts] = useState([]);
    const [lastDocumnetId, setLastDocumentId] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [limit, setLimit] = useState('3');
    const [orderByField, setOrderByField] = useState(MediaPostModelFilters.CreatedAt);
    const [orderDirection, setOrderDirection] = useState(OrderDirection.Desc);
    const {isProd} = useContext(AppEnvContext);

    const handleLoadClick = useCallback(async () => {
        const json = await fetchGet({
            route: ProjectRoutes.getMediaPosts,
            query: {limit, lastDocumnetId, orderByField, orderDirection},
            isProd,
        });

        setMediaPosts([...mediaPosts, ...json.mediaPosts]);
        setLastDocumentId(json.lastDocumnetId);
        setHasMore(json.hasMore);
    }, [isProd, lastDocumnetId, limit, mediaPosts, orderByField, orderDirection]);

    const handleLimit = useCallback(([value]: string[]) => {
        setLimit(value);
    }, []);

    const handleOrderBy = useCallback(([value]: string[]) => {
        setOrderByField(value as MediaPostModelFilters);
    }, []);

    const handleOrderDirection = useCallback(([value]: string[]) => {
        setOrderDirection(value as OrderDirection);
    }, []);

    return (
        <div>
            <h2>Media posts</h2>
            <Select
                filterable={true}
                label="Order by:"
                onUpdate={handleOrderBy}
                value={[orderByField]}
            >
                {Object.entries(MediaPostModelFilters).map(([key, value]) => {
                    return (
                        <Select.Option key={key} value={value}>
                            {key}
                        </Select.Option>
                    );
                })}
            </Select>
            <Select
                filterable={true}
                label="Direction:"
                onUpdate={handleOrderDirection}
                value={[orderDirection]}
            >
                {Object.entries(OrderDirection).map(([key, value]) => {
                    return (
                        <Select.Option key={key} value={value}>
                            {key}
                        </Select.Option>
                    );
                })}
            </Select>
            <Select filterable={true} label="Page size:" onUpdate={handleLimit} value={[limit]}>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="10">10</Select.Option>
                <Select.Option value="25">25</Select.Option>
            </Select>
            <Button view="action" onClick={handleLoadClick} disabled={!hasMore}>
                Get Data
            </Button>
            {/* <pre style={{width: '100vw'}}>{JSON.stringify(mediaPosts, null, 3)}</pre> */}
            {mediaPosts.map((mediaPost) => {
                return <MediaPostCard key={mediaPost.id} {...mediaPost} />;
            })}
        </div>
    );
};
