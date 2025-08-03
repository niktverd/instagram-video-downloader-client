import {fullRoutes as organizationRoutes} from './../../types/routes/organization';
import {fullRoutes as roleRoutes} from './../../types/routes/role';

export const fetchRoutes = {
    organizations: organizationRoutes,
    roles: roleRoutes,
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
