import {z} from 'zod';

import {IOrganization, OrganizationSchema} from './../../../schemas/models';

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

// types
export type CreateOrganizationParams = z.infer<typeof CreateOrganizationParamsSchema>;
export type CreateOrganizationResponse = IOrganization;

export type GetOrganizationByIdParams = z.infer<typeof GetOrganizationByIdParamsSchema>;
export type GetOrganizationByIdResponse = IOrganization;

export type GetAllOrganizationsParams = Record<string, never>; // No params for getAll
export type GetAllOrganizationsResponse = IOrganization[];

export type UpdateOrganizationParams = z.infer<typeof UpdateOrganizationParamsSchema>;
export type UpdateOrganizationResponse = IOrganization;

export type DeleteOrganizationParams = z.infer<typeof DeleteOrganizationParamsSchema>;
export type DeleteOrganizationResponse = number;
