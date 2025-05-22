/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreateInstagramMediaContainerParamsSchema: any;
export declare const GetInstagramMediaContainerByIdParamsSchema: z.ZodObject<
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
export declare const GetAllInstagramMediaContainersParamsSchema: z.ZodObject<
    {
        page: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodString>;
        sortBy: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodOptional<z.ZodString>;
    },
    'strict',
    z.ZodTypeAny,
    {
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: string;
    },
    {
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: string;
    }
>;
export declare const UpdateInstagramMediaContainerParamsSchema: any;
export declare const DeleteInstagramMediaContainerParamsSchema: z.ZodObject<
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
export declare const GetLimitedInstagramMediaContainersParamsSchema: z.ZodObject<
    {
        accountId: z.ZodOptional<z.ZodNumber>;
        limit: z.ZodOptional<z.ZodNumber>;
        notPublished: z.ZodOptional<z.ZodBoolean>;
        random: z.ZodOptional<z.ZodBoolean>;
        isBlocked: z.ZodOptional<z.ZodBoolean>;
    },
    'strict',
    z.ZodTypeAny,
    {
        random?: boolean;
        limit?: number;
        accountId?: number;
        notPublished?: boolean;
        isBlocked?: boolean;
    },
    {
        random?: boolean;
        limit?: number;
        accountId?: number;
        notPublished?: boolean;
        isBlocked?: boolean;
    }
>;
