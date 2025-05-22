/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreateInstagramLocationParamsSchema: any;
export declare const GetInstagramLocationByIdParamsSchema: z.ZodObject<
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
export declare const GetAllInstagramLocationsParamsSchema: z.ZodObject<
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
export declare const UpdateInstagramLocationParamsSchema: any;
export declare const DeleteInstagramLocationParamsSchema: z.ZodObject<
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
