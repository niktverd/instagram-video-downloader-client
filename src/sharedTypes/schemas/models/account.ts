/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const AccountSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        enabled: z.ZodBoolean;
        token: z.ZodOptional<z.ZodString>;
        userIdIG: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        availableScenarios: z.ZodOptional<
            z.ZodArray<
                z.ZodObject<
                    {
                        id: z.ZodNumber;
                        slug: z.ZodString;
                        type: z.ZodNativeEnum<typeof import('../../types').ScenarioType>;
                        enabled: z.ZodOptional<z.ZodBoolean>;
                        onlyOnce: z.ZodOptional<z.ZodBoolean>;
                        copiedFrom: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                        texts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                        instagramLocationSource: z.ZodOptional<
                            z.ZodDefault<
                                z.ZodNativeEnum<
                                    typeof import('../../types').InstagramLocationSource
                                >
                            >
                        >;
                        instagramLocations: z.ZodOptional<
                            z.ZodArray<
                                z.ZodObject<
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
                                >,
                                'many'
                            >
                        >;
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
                        type?: import('../../types').ScenarioType;
                        copiedFrom?: number;
                        instagramLocationSource?: import('../../types').InstagramLocationSource;
                        instagramLocations?: {
                            id?: number;
                            externalId?: string;
                            externalIdSource?: string;
                            name?: string;
                            address?: string;
                            lat?: number;
                            lng?: number;
                            group?: string;
                        }[];
                    },
                    {
                        id?: number;
                        slug?: string;
                        onlyOnce?: boolean;
                        enabled?: boolean;
                        texts?: Record<string, any>;
                        options?: Record<string, any>;
                        type?: import('../../types').ScenarioType;
                        copiedFrom?: number;
                        instagramLocationSource?: import('../../types').InstagramLocationSource;
                        instagramLocations?: {
                            id?: number;
                            externalId?: string;
                            externalIdSource?: string;
                            name?: string;
                            address?: string;
                            lat?: number;
                            lng?: number;
                            group?: string;
                        }[];
                    }
                >,
                'many'
            >
        >;
        instagramLocations: z.ZodOptional<
            z.ZodArray<
                z.ZodObject<
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
                >,
                'many'
            >
        >;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        enabled?: boolean;
        instagramLocations?: {
            id?: number;
            externalId?: string;
            externalIdSource?: string;
            name?: string;
            address?: string;
            lat?: number;
            lng?: number;
            group?: string;
        }[];
        token?: string;
        userIdIG?: string;
        availableScenarios?: {
            id?: number;
            slug?: string;
            onlyOnce?: boolean;
            enabled?: boolean;
            texts?: Record<string, any>;
            options?: Record<string, any>;
            type?: import('../../types').ScenarioType;
            copiedFrom?: number;
            instagramLocationSource?: import('../../types').InstagramLocationSource;
            instagramLocations?: {
                id?: number;
                externalId?: string;
                externalIdSource?: string;
                name?: string;
                address?: string;
                lat?: number;
                lng?: number;
                group?: string;
            }[];
        }[];
    },
    {
        id?: number;
        slug?: string;
        enabled?: boolean;
        instagramLocations?: {
            id?: number;
            externalId?: string;
            externalIdSource?: string;
            name?: string;
            address?: string;
            lat?: number;
            lng?: number;
            group?: string;
        }[];
        token?: string;
        userIdIG?: string;
        availableScenarios?: {
            id?: number;
            slug?: string;
            onlyOnce?: boolean;
            enabled?: boolean;
            texts?: Record<string, any>;
            options?: Record<string, any>;
            type?: import('../../types').ScenarioType;
            copiedFrom?: number;
            instagramLocationSource?: import('../../types').InstagramLocationSource;
            instagramLocations?: {
                id?: number;
                externalId?: string;
                externalIdSource?: string;
                name?: string;
                address?: string;
                lat?: number;
                lng?: number;
                group?: string;
            }[];
        }[];
    }
>;
