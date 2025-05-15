/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreateSourceParamsSchema: any;
export declare const GetAllSourcesParamsSchema: z.ZodObject<
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
export declare const GetOneSourceParamsSchema: z.ZodObject<
    {
        id: z.ZodOptional<z.ZodNumber>;
        random: z.ZodOptional<z.ZodBoolean>;
        emptyFirebaseUrl: z.ZodOptional<z.ZodBoolean>;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        random?: boolean;
        emptyFirebaseUrl?: boolean;
    },
    {
        id?: number;
        random?: boolean;
        emptyFirebaseUrl?: boolean;
    }
>;
export declare const UpdateSourceParamsSchema: any;
export declare const DeleteSourceParamsSchema: z.ZodObject<
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
export declare const GetSourceByIdParamsSchema: z.ZodObject<
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
