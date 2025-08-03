import {baseRoutes} from './base';
import {getFullRoutes} from './utils';

export const rootName = '/organization';

export const routes = {
    ...baseRoutes,
    addUserWithRolesToOrganization: '/add-user-with-roles-to-organization',
    deletUserFromOrganization: '/delete-user-from-organization',
} as const;

export const fullRoutes = getFullRoutes({rootName, routes});
