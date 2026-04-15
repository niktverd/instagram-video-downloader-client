import {fullRoutes as accountRoutes} from '../routes/account';
import {fullRoutes as cloudRunScenarioExecutionRoutes} from '../routes/cloudRunScenarioExecution';
import {fullRoutes as instagramLocationRoutes} from '../routes/instagramLocation';
import {fullRoutes as instagramMediaContainerRoutes} from '../routes/instagramMediaContainer';
import {fullRoutes as organizationRoutes} from '../routes/organization';
import {fullRoutes as organizationSenderRoutes} from '../routes/organizationSender';
import {fullRoutes as preparedVideoRoutes} from '../routes/preparedVideo';
import {fullRoutes as roleRoutes} from '../routes/role';
import {fullRoutes as scenarioRoutes} from '../routes/scenario';
import {fullRoutes as sourceRoutes} from '../routes/source';
import {fullRoutes as userRoutes} from '../routes/user';

export const fetchRoutes = {
    accounts: accountRoutes,
    cloudRunScenarioExecutions: cloudRunScenarioExecutionRoutes,
    instagramLocations: instagramLocationRoutes,
    instagramMediaContainers: instagramMediaContainerRoutes,
    organizations: organizationRoutes,
    preparedVideos: preparedVideoRoutes,
    roles: roleRoutes,
    scenarios: scenarioRoutes,
    sources: sourceRoutes,
    users: userRoutes,
    organizationSenders: organizationSenderRoutes,
} as const;

type RouteType = typeof fetchRoutes;
type LeafValues<T> = T extends object
    ? T extends Record<string, infer V>
        ? V extends string
            ? V
            : LeafValues<V>
        : never
    : never;

export type FetchRoutesType = LeafValues<RouteType>;
