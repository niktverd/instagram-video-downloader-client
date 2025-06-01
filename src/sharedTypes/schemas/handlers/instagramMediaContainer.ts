import {z} from 'zod';

import {InstagramMediaContainerSchema} from './../models';

export const CreateInstagramMediaContainerParamsSchema = InstagramMediaContainerSchema.omit({
    id: true,
});

export const GetInstagramMediaContainerByIdParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();

export const GetAllInstagramMediaContainersParamsSchema = z
    .object({
        page: z.string().optional(),
        limit: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.string().optional(),
    })
    .strict();

export const UpdateInstagramMediaContainerParamsSchema =
    CreateInstagramMediaContainerParamsSchema.partial()
        .extend({
            id: z.number(),
        })
        .strict();

export const DeleteInstagramMediaContainerParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();

export const GetLimitedInstagramMediaContainersParamsSchema = z
    .object({
        accountId: z.number().optional(),
        limit: z.number().optional(),
        notPublished: z.boolean().optional(),
        random: z.boolean().optional(),
        isBlocked: z.boolean().optional(),
    })
    .strict();

export const InstagramMediaContainersStatisticsParamsSchema = z
    .object({
        days: z.array(z.string()),
    })
    .strict();
