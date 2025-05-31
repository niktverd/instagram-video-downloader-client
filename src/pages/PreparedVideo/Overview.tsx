import React, {useCallback, useContext, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';

import {CardConfig, CardTemplate} from '../../components/CardTemplate/CardTemplate';
import {AppEnvContext} from '../../contexts/AppEnv';
import {GetPreparedVideoByIdResponse, IPreparedVideo} from '../../sharedTypes/types/preparedVideo';
import {Routes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

import cn from '../Scenario/Scenarios.module.css';

const Overview: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [video, setVideo] = useState<IPreparedVideo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {isProd} = useContext(AppEnvContext);

    const loadVideo = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchGet<GetPreparedVideoByIdResponse>({
                route: Routes.getPreparedVideoById,
                query: {id: Number(id)},
                isProd,
            });
            setVideo(data);
        } catch {
            setError('Failed to load prepared video');
        } finally {
            setLoading(false);
        }
    }, [id, isProd]);

    useEffect(() => {
        if (id) loadVideo();
    }, [id, loadVideo]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!video) return <div>Not found</div>;

    const config: CardConfig[] = [
        {
            title: 'Prepared Video',
            description: 'Детали подготовленного видео',
            colSpan: 2 as const,
            actions: [
                video.scenarioId && {
                    text: 'Go to Scenario',
                    link: `/scenario/${video.scenarioId}`,
                },
                video.sourceId && {
                    text: 'Go to Source',
                    link: `/source/${video.sourceId}`,
                },
                video.accountId && {
                    text: 'Go to Account',
                    link: `/account/${video.accountId}`,
                },
            ].filter(Boolean),
            children: (
                <dl
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'max-content 1fr',
                        rowGap: 12,
                        columnGap: 24,
                    }}
                >
                    <dt>ID</dt>
                    <dd>{video.id}</dd>
                    <dt>Firebase URL</dt>
                    <dd>{video.firebaseUrl}</dd>
                    <dt>Duration</dt>
                    <dd>{video.duration ?? '-'}</dd>
                    <dt>Scenario ID</dt>
                    <dd>{video.scenarioId}</dd>
                    <dt>Source ID</dt>
                    <dd>{video.sourceId}</dd>
                    <dt>Account ID</dt>
                    <dd>{video.accountId}</dd>
                    <dt>Scenario (object)</dt>
                    <dd>
                        {video.scenario ? (
                            <pre style={{margin: 0}}>{JSON.stringify(video.scenario, null, 2)}</pre>
                        ) : (
                            '-'
                        )}
                    </dd>
                    <dt>Source (object)</dt>
                    <dd>
                        {video.source ? (
                            <pre style={{margin: 0}}>{JSON.stringify(video.source, null, 2)}</pre>
                        ) : (
                            '-'
                        )}
                    </dd>
                    <dt>Account (object)</dt>
                    <dd>
                        {video.account ? (
                            <pre style={{margin: 0}}>{JSON.stringify(video.account, null, 2)}</pre>
                        ) : (
                            '-'
                        )}
                    </dd>
                </dl>
            ),
        },
        {
            title: 'Preview',
            description: 'Предпросмотр видео',
            colSpan: 1,
            children: video.firebaseUrl ? (
                <video
                    src={video.firebaseUrl}
                    controls
                    style={{width: '100%', maxWidth: 480, borderRadius: 8, background: '#000'}}
                >
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div>No video available</div>
            ),
        },
    ];

    return (
        <div className={cn.container}>
            <div className={cn.cardsContainer}>
                {config.map((cfg) => (
                    <CardTemplate key={cfg.title} {...cfg} />
                ))}
            </div>
        </div>
    );
};

export default Overview;
