/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const UserSchema: z.ZodObject<
    {
        id: z.ZodString;
        email: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        photoURL: z.ZodOptional<z.ZodString>;
        providerData: z.ZodOptional<z.ZodAny>;
        providerId: z.ZodOptional<z.ZodAny>;
        password: z.ZodString;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: string;
        email?: string;
        displayName?: string;
        photoURL?: string;
        providerData?: any;
        providerId?: any;
        password?: string;
    },
    {
        id?: string;
        email?: string;
        displayName?: string;
        photoURL?: string;
        providerData?: any;
        providerId?: any;
        password?: string;
    }
>;
