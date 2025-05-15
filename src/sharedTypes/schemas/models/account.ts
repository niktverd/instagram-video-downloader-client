/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const AccountSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        enabled: z.ZodBoolean;
        token: z.ZodOptional<z.ZodString>;
        userIdIG: z.ZodOptional<z.ZodString>;
        availableScenarios: z.ZodOptional<z.ZodAny>;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        enabled?: boolean;
        token?: string;
        userIdIG?: string;
        availableScenarios?: any;
    },
    {
        id?: number;
        slug?: string;
        enabled?: boolean;
        token?: string;
        userIdIG?: string;
        availableScenarios?: any;
    }
>;
