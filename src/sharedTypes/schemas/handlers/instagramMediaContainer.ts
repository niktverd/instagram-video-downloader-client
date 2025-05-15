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
    {},
    'strict',
    z.ZodTypeAny,
    {},
    {}
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
    },
    'strict',
    z.ZodTypeAny,
    {
        random?: boolean;
        accountId?: number;
        limit?: number;
        notPublished?: boolean;
    },
    {
        random?: boolean;
        accountId?: number;
        limit?: number;
        notPublished?: boolean;
    }
>;
