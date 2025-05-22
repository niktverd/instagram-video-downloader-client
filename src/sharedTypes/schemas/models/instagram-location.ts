import {z} from 'zod';
export declare const InstagramLocationSchema: z.ZodObject<
    {
        id: z.ZodOptional<z.ZodNumber>;
        externalId: z.ZodString;
        externalIdSource: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        lat: z.ZodOptional<z.ZodNumber>;
        lng: z.ZodOptional<z.ZodNumber>;
        group: z.ZodOptional<z.ZodString>;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        externalId?: string;
        externalIdSource?: string;
        name?: string;
        address?: string;
        lat?: number;
        lng?: number;
        group?: string;
    },
    {
        id?: number;
        externalId?: string;
        externalIdSource?: string;
        name?: string;
        address?: string;
        lat?: number;
        lng?: number;
        group?: string;
    }
>;
