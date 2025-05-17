/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreatePreparedVideoParamsSchema: any;
export declare const GetPreparedVideoByIdParamsSchema: z.ZodObject<
    {
        id: z.ZodNumber;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
    },
    {
        id?: number;
    }
>;
export declare const GetAllPreparedVideosParamsSchema: z.ZodObject<
    {
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodString>;
    },
    'strict',
    z.ZodTypeAny,
    {
        limit?: string;
        page?: string;
        sortBy?: string;
        sortOrder?: string;
    },
    {
        limit?: string;
        page?: string;
        sortBy?: string;
        sortOrder?: string;
    }
>;
export declare const UpdatePreparedVideoParamsSchema: any;
export declare const DeletePreparedVideoParamsSchema: z.ZodObject<
    {
        id: z.ZodNumber;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
    },
    {
        id?: number;
    }
>;
export declare const GetOnePreparedVideoParamsSchema: z.ZodObject<
    {
        hasFirebaseUrl: z.ZodOptional<z.ZodBoolean>;
        firebaseUrl: z.ZodOptional<z.ZodString>;
        duration: z.ZodOptional<z.ZodNumber>;
        scenarioId: z.ZodOptional<z.ZodNumber>;
        sourceId: z.ZodOptional<z.ZodNumber>;
        accountId: z.ZodOptional<z.ZodNumber>;
        random: z.ZodOptional<z.ZodBoolean>;
        notInInstagramMediaContainers: z.ZodOptional<z.ZodBoolean>;
        fetchGraphAccount: z.ZodOptional<z.ZodBoolean>;
        fetchGraphScenario: z.ZodOptional<z.ZodBoolean>;
        fetchGraphSource: z.ZodOptional<z.ZodBoolean>;
    },
    'strict',
    z.ZodTypeAny,
    {
        random?: boolean;
        accountId?: number;
        hasFirebaseUrl?: boolean;
        firebaseUrl?: string;
        duration?: number;
        scenarioId?: number;
        sourceId?: number;
        notInInstagramMediaContainers?: boolean;
        fetchGraphAccount?: boolean;
        fetchGraphScenario?: boolean;
        fetchGraphSource?: boolean;
    },
    {
        random?: boolean;
        accountId?: number;
        hasFirebaseUrl?: boolean;
        firebaseUrl?: string;
        duration?: number;
        scenarioId?: number;
        sourceId?: number;
        notInInstagramMediaContainers?: boolean;
        fetchGraphAccount?: boolean;
        fetchGraphScenario?: boolean;
        fetchGraphSource?: boolean;
    }
>;
