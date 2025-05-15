/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreateAccountParamsSchema: any;
export declare const GetAccountByIdParamsSchema: z.ZodObject<
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
export declare const GetAccountBySlugParamsSchema: z.ZodObject<
    {
        slug: z.ZodString;
    },
    'strict',
    z.ZodTypeAny,
    {
        slug?: string;
    },
    {
        slug?: string;
    }
>;
export declare const GetAllAccountsParamsSchema: z.ZodObject<{}, 'strict', z.ZodTypeAny, {}, {}>;
export declare const UpdateAccountParamsSchema: any;
export declare const DeleteAccountParamsSchema: z.ZodObject<
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
