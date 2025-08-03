import {z} from 'zod';

import {createEntitySchema} from './base';
import {OrganizationSchema} from './organization';
import {RoleSchema} from './role';

export const UserSchema = createEntitySchema({
    email: z.string().email(),
    name: z.string().optional(),
    uid: z.string().optional(),

    roles: z.array(RoleSchema),
    organizations: z.array(OrganizationSchema),
}).strict();

export type IUser = z.infer<typeof UserSchema>;
