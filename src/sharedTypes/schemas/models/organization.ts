import {z} from 'zod';

import {createEntitySchema} from './base';
import {RoleSchema} from './role';

export const OrganizationSchema = createEntitySchema({
    name: z.string(),

    roles: z.array(RoleSchema).optional(),
    roleIds: z.array(z.number()).optional(),
});

export type IOrganization = z.infer<typeof OrganizationSchema>;
