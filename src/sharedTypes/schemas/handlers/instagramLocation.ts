import {z} from 'zod';

import {InstagramLocationSchema} from './../models';

export const CreateInstagramLocationParamsSchema = InstagramLocationSchema.omit({
    id: true,
});

export const GetInstagramLocationByIdParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();

export const GetAllInstagramLocationsParamsSchema = z
    .object({
        page: z.string().optional(),
        limit: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.string().optional(),
        groupTextFilter: z.string().optional(),
        commonTextFilter: z.string().optional(),
    })
    .strict();

export const UpdateInstagramLocationParamsSchema = CreateInstagramLocationParamsSchema.partial()
    .extend({
        id: z.number(),
    })
    .strict();

export const DeleteInstagramLocationParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();
