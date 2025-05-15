/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';

import {ScenarioType} from '../../types/enums';
export declare const ScenarioSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        type: z.ZodNativeEnum<typeof ScenarioType>;
        enabled: z.ZodOptional<z.ZodBoolean>;
        onlyOnce: z.ZodOptional<z.ZodBoolean>;
        copiedFrom: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        texts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, any>;
        options?: Record<string, any>;
        type?: ScenarioType;
        copiedFrom?: number;
    },
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, any>;
        options?: Record<string, any>;
        type?: ScenarioType;
        copiedFrom?: number;
    }
>;
