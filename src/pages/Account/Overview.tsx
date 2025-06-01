import React, {useContext, useEffect, useState} from 'react';

import {
    Binoculars,
    ChartAreaStackedNormalized,
    Display,
    Filmstrip,
    Globe,
    MapPin,
    Pin,
} from '@gravity-ui/icons';
import {useParams} from 'react-router-dom';

import {InstagramConnect} from '../../components/Account/InstagramConnect';
import {CardConfig, CardTemplate} from '../../components/CardTemplate/CardTemplate';
import {AppEnvContext} from '../../contexts/AppEnv';
import {IAccount, IScenario} from '../../sharedTypes';
import {FetchRoutes} from '../../utils/constants';
import {fetchGet} from '../../utils/fetchHelpers';

import cn from '../../components/Account/Account.module.css';

export const Overview = () => {
    const {id} = useParams();
    const {isProd} = useContext(AppEnvContext);
    const [account, setAccount] = useState<IAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [showJson, setShowJson] = useState(false);
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetchGet<IAccount>({
            route: FetchRoutes.getAccountById,
            query: {id},
            isProd,
        })
            .then(setAccount)
            .finally(() => setLoading(false));
    }, [id, isProd]);

    const handleGetInsights = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await fetchGet<any>({
            route: FetchRoutes.getInsights,
            query: {id: account?.id},
            isProd,
        });
    };

    if (loading) return <div>Loading...</div>;
    if (!account) return <div>Not found</div>;

    const {
        token,
        id: accId,
        availableScenarios = [],
        instagramLocations = [],
        slug,
        token: instagramToken,
        userIdIG,
    } = account;

    // Config for account info card
    const accountInfoConfig: CardConfig[] = [
        {
            title: 'Account Info',
            description: 'Below are the account details',
            icon: <Globe />,
            actions: [],
            colSpan: 1,
            children: (
                <div>
                    <p>{accId}</p>
                    {token && <p className={cn.token}>Token: {token.slice(0, 3)}****</p>}
                    {userIdIG && <p className={cn.token}>IG User ID: {userIdIG}</p>}
                </div>
            ),
        },
        {
            title: 'Edit',
            description: 'Edit this account',
            icon: <MapPin />,
            colSpan: 1,
            actions: [
                {
                    text: 'Edit',
                    link: `/account/${accId}/edit`,
                },
            ],
        },
        {
            title: 'Get Insights',
            description: 'Fetch account insights',
            icon: <ChartAreaStackedNormalized />,
            actions: [
                {
                    text: 'Get Insights',
                    onClick: handleGetInsights,
                },
            ],
            colSpan: 1,
        },
        {
            title: 'Scenarios',
            description:
                'Below are the scenarios connected to this account. You can see the details of each scenario by clicking on the scenario name.',
            icon: <Filmstrip />,
            actions:
                availableScenarios?.map((scenario: IScenario) => ({
                    text: `See: ${scenario.slug}`,
                    link: `/scenario/${scenario.id}`,
                })) || [],
            colSpan: 1,
        },
        {
            title: 'Instagram Locations',
            description: 'Locations linked to this account',
            icon: <Pin />,
            actions:
                instagramLocations?.map((location) => ({
                    text: `${location.name || location.externalId || location.id}`,
                    link: `/instagram-location/${location.id}`,
                })) || [],
            colSpan: 1,
        },
        {
            title: 'Prepared Videos',
            description: 'Click the Button to see all prepared videos',
            icon: <Binoculars />,
            actions: [
                {
                    text: `Go to Prepared Videos`,
                    link: `/prepared-videos/?accountIds=${accId}`,
                },
            ],
            colSpan: 1,
        },
        {
            title: 'JSON',
            description: 'Show entire account data in JSON format',
            icon: <Display />,
            actions: [
                {
                    text: showJson ? 'Hide JSON' : 'Show JSON',
                    onClick: () => {
                        setShowJson(!showJson);
                    },
                    view: 'outlined',
                },
            ],
            children: showJson ? <pre>{JSON.stringify(account, null, 2)}</pre> : null,
            colSpan: 3,
        },
    ];

    return (
        <div className={cn.container}>
            <div className={cn.headerRow}>
                <h1>{slug}</h1>
                <InstagramConnect accountId={String(accId)} token={instagramToken} slug={slug} />
            </div>
            <div className={cn.cardsContainer}>
                {accountInfoConfig.map((cfg, idx) => (
                    <CardTemplate key={idx} {...cfg} />
                ))}
            </div>
        </div>
    );
};
