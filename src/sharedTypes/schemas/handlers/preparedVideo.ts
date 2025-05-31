import {z} from 'zod';

import {PreparedVideoSchema} from './../models';
import {zodOptionalBoolean, zodOptionalNumberArray} from './utils';

export const CreatePreparedVideoParamsSchema = PreparedVideoSchema.omit({id: true});

export const GetPreparedVideoByIdParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();

export const GetAllPreparedVideosParamsSchema = z
    .object({
        page: z.string().optional(),
        limit: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.string().optional(),
        scenarioIds: zodOptionalNumberArray(),
        sourceIds: zodOptionalNumberArray(),
        accountIds: zodOptionalNumberArray(),
        findDuplicates: zodOptionalBoolean(),
    })
    .strict();

export const UpdatePreparedVideoParamsSchema = CreatePreparedVideoParamsSchema.partial()
    .extend({
        id: z.number(),
    })
    .strict();

export const DeletePreparedVideoParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();

export const GetOnePreparedVideoParamsSchema = z
    .object({
        hasFirebaseUrl: z.boolean().optional(),
        firebaseUrl: z.string().optional(),
        duration: z.number().optional(),
        scenarioId: z.number().optional(),
        sourceId: z.number().optional(),
        accountId: z.number().optional(),
        random: z.boolean().optional(),
        notInInstagramMediaContainers: z.boolean().optional(),
        fetchGraphAccount: z.boolean().optional(),
        fetchGraphScenario: z.boolean().optional(),
        fetchGraphSource: z.boolean().optional(),
    })
    .strict();

export const FindPreparedVideoDuplicatesParamsSchema = z
    .object({
        accountId: z.number(),
        sourceId: z.number(),
        scenarioId: z.number(),
    })
    .strict();
