import {z} from 'zod';

import {IOrganization, OrganizationSchema} from './../models';

export const CreateOrganizationParamsSchema = OrganizationSchema.omit({id: true});

export const GetOrganizationByIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const UpdateOrganizationParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string().min(1, 'Organization name is required'),
});

export const DeleteOrganizationParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export const GetAllOrganizationsParamsSchema = z.object({});

export const AddUserWithRoleToOrganizationParamsSchema = z
    .object({
        organizationId: z.number(),
        userId: z.number(),
        roleIds: z.array(z.number()),
    })
    .strict();

export const DeleteUserFromOrganizationParamsSchema = z
    .object({
        organizationId: z.number(),
        userId: z.number(),
    })
    .strict();

// types
export type CreateOrganizationParams = z.infer<typeof CreateOrganizationParamsSchema>;
export type CreateOrganizationResponse = IOrganization;

export type GetOrganizationByIdParams = z.infer<typeof GetOrganizationByIdParamsSchema>;
export type GetOrganizationByIdResponse = IOrganization;

export type GetAllOrganizationsParams = z.infer<typeof GetAllOrganizationsParamsSchema>;
export type GetAllOrganizationsResponse = IOrganization[];

export type UpdateOrganizationParams = z.infer<typeof UpdateOrganizationParamsSchema>;
export type UpdateOrganizationResponse = IOrganization;

export type DeleteOrganizationParams = z.infer<typeof DeleteOrganizationParamsSchema>;
export type DeleteOrganizationResponse = number;

export type AddUserWithRoleToOrganizationParams = z.infer<
    typeof AddUserWithRoleToOrganizationParamsSchema
>;
export type AddUserWithRoleToOrganizationResponse = IOrganization;

export type DeleteUserFromOrganizationParams = z.infer<
    typeof DeleteUserFromOrganizationParamsSchema
>;
export type DeleteUserFromOrganizationResponse = IOrganization;
