/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const SourceSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        firebaseUrl: z.ZodOptional<z.ZodString>;
        sources: z.ZodRecord<z.ZodString, z.ZodAny>;
        bodyJSONString: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        duration: z.ZodOptional<z.ZodNumber>;
        attempt: z.ZodOptional<z.ZodNumber>;
        lastUsed: z.ZodOptional<z.ZodString>;
        sender: z.ZodOptional<z.ZodString>;
        recipient: z.ZodOptional<z.ZodString>;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        firebaseUrl?: string;
        duration?: number;
        sources?: Record<string, any>;
        bodyJSONString?: Record<string, any>;
        attempt?: number;
        lastUsed?: string;
        sender?: string;
        recipient?: string;
    },
    {
        id?: number;
        firebaseUrl?: string;
        duration?: number;
        sources?: Record<string, any>;
        bodyJSONString?: Record<string, any>;
        attempt?: number;
        lastUsed?: string;
        sender?: string;
        recipient?: string;
    }
>;
