/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';

import {ScenarioType} from '../types/enums';
export declare const scenarioBaseSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        onlyOnce: z.ZodBoolean;
        enabled: z.ZodBoolean;
        texts: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, 'many'>>;
        type: z.ZodNativeEnum<typeof ScenarioType>;
        copiedFrom: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodAny;
        updatedAt: z.ZodAny;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        type?: ScenarioType;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    },
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        type?: ScenarioType;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    }
>;
export declare const scenarioAddBannerAtTheEndUniqueSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        onlyOnce: z.ZodBoolean;
        enabled: z.ZodBoolean;
        texts: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, 'many'>>;
        copiedFrom: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodAny;
        updatedAt: z.ZodAny;
    } & {
        type: z.ZodLiteral<ScenarioType.ScenarioAddBannerAtTheEndUnique>;
        options: z.ZodObject<
            {
                extraBannerUrl: z.ZodString;
                extraBannerUrls: z.ZodArray<z.ZodString, 'many'>;
            },
            'strip',
            z.ZodTypeAny,
            {
                extraBannerUrl?: string;
                extraBannerUrls?: string[];
            },
            {
                extraBannerUrl?: string;
                extraBannerUrls?: string[];
            }
        >;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        options?: {
            extraBannerUrl?: string;
            extraBannerUrls?: string[];
        };
        type?: ScenarioType.ScenarioAddBannerAtTheEndUnique;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    },
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        options?: {
            extraBannerUrl?: string;
            extraBannerUrls?: string[];
        };
        type?: ScenarioType.ScenarioAddBannerAtTheEndUnique;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    }
>;
export declare const scenarioShortifyUniqueSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        onlyOnce: z.ZodBoolean;
        enabled: z.ZodBoolean;
        texts: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, 'many'>>;
        copiedFrom: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodAny;
        updatedAt: z.ZodAny;
    } & {
        type: z.ZodLiteral<ScenarioType.ScenarioShortifyUnique>;
        options: z.ZodObject<
            {
                minDuration: z.ZodNumber;
                maxDuration: z.ZodNumber;
                extraBannerUrls: z.ZodArray<z.ZodString, 'many'>;
            },
            'strip',
            z.ZodTypeAny,
            {
                extraBannerUrls?: string[];
                minDuration?: number;
                maxDuration?: number;
            },
            {
                extraBannerUrls?: string[];
                minDuration?: number;
                maxDuration?: number;
            }
        >;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        options?: {
            extraBannerUrls?: string[];
            minDuration?: number;
            maxDuration?: number;
        };
        type?: ScenarioType.ScenarioShortifyUnique;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    },
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        options?: {
            extraBannerUrls?: string[];
            minDuration?: number;
            maxDuration?: number;
        };
        type?: ScenarioType.ScenarioShortifyUnique;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    }
>;
export declare const scenarioCoverWithGreenUniqueSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        slug: z.ZodString;
        onlyOnce: z.ZodBoolean;
        enabled: z.ZodBoolean;
        texts: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, 'many'>>;
        copiedFrom: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        createdAt: z.ZodAny;
        updatedAt: z.ZodAny;
    } & {
        type: z.ZodLiteral<ScenarioType.ScenarioCoverWithGreenUnique>;
        options: z.ZodObject<
            {
                greenVideoUrls: z.ZodArray<z.ZodString, 'many'>;
                whereToPutGreen: z.ZodEnum<['start', 'middle', 'end']>;
                loopGreen: z.ZodEnum<['once', 'loop', 'random']>;
            },
            'strip',
            z.ZodTypeAny,
            {
                greenVideoUrls?: string[];
                whereToPutGreen?: 'start' | 'middle' | 'end';
                loopGreen?: 'once' | 'loop' | 'random';
            },
            {
                greenVideoUrls?: string[];
                whereToPutGreen?: 'start' | 'middle' | 'end';
                loopGreen?: 'once' | 'loop' | 'random';
            }
        >;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        options?: {
            greenVideoUrls?: string[];
            whereToPutGreen?: 'start' | 'middle' | 'end';
            loopGreen?: 'once' | 'loop' | 'random';
        };
        type?: ScenarioType.ScenarioCoverWithGreenUnique;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    },
    {
        id?: number;
        slug?: string;
        onlyOnce?: boolean;
        enabled?: boolean;
        texts?: Record<string, string[]>;
        options?: {
            greenVideoUrls?: string[];
            whereToPutGreen?: 'start' | 'middle' | 'end';
            loopGreen?: 'once' | 'loop' | 'random';
        };
        type?: ScenarioType.ScenarioCoverWithGreenUnique;
        copiedFrom?: string;
        createdAt?: any;
        updatedAt?: any;
    }
>;
