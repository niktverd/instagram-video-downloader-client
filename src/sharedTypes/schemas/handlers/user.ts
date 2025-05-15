/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreateUserParamsSchema: any;
export declare const GetUserByIdParamsSchema: z.ZodObject<
    {
        id: z.ZodString;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: string;
    },
    {
        id?: string;
    }
>;
export declare const GetUserByEmailParamsSchema: z.ZodObject<
    {
        email: z.ZodString;
    },
    'strict',
    z.ZodTypeAny,
    {
        email?: string;
    },
    {
        email?: string;
    }
>;
export declare const GetAllUsersParamsSchema: z.ZodObject<{}, 'strict', z.ZodTypeAny, {}, {}>;
export declare const UpdateUserParamsSchema: any;
export declare const DeleteUserParamsSchema: z.ZodObject<
    {
        id: z.ZodString;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: string;
    },
    {
        id?: string;
    }
>;
