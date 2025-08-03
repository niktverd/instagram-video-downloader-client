import {baseRoutes} from './base';
import {getFullRoutes} from './utils';

export const rootName = '/organization';

export const routes = {
    ...baseRoutes,
} as const;

export const fullRoutes = getFullRoutes({rootName, routes});
