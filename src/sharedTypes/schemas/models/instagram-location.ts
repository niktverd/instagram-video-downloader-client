import {z} from 'zod';
export declare const InstagramLocationSchema: z.ZodObject<
    {
        id: z.ZodOptional<z.ZodNumber>;
        externalId: z.ZodString;
        externalIdSource: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        lat: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        lng: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        group: z.ZodNullable<z.ZodOptional<z.ZodString>>;
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
