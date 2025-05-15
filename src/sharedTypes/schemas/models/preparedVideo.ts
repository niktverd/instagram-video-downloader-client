/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const PreparedVideoSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        firebaseUrl: z.ZodString;
        duration: z.ZodOptional<z.ZodNumber>;
        scenarioId: z.ZodNumber;
        sourceId: z.ZodNumber;
        accountId: z.ZodNumber;
        scenario: z.ZodOptional<
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
                }
            >
        >;
        source: z.ZodOptional<
            z.ZodObject<
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
            >
        >;
        account: z.ZodOptional<
            z.ZodObject<
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
            >
        >;
    },
    'strip',
    z.ZodTypeAny,
    {
        id?: number;
        accountId?: number;
        firebaseUrl?: string;
        duration?: number;
        scenarioId?: number;
        sourceId?: number;
        scenario?: {
            id?: number;
            slug?: string;
            onlyOnce?: boolean;
            enabled?: boolean;
            texts?: Record<string, any>;
            options?: Record<string, any>;
            type?: import('../../types').ScenarioType;
            copiedFrom?: number;
        };
        source?: {
            id?: number;
            firebaseUrl?: string;
            duration?: number;
            sources?: Record<string, any>;
            bodyJSONString?: Record<string, any>;
            attempt?: number;
            lastUsed?: string;
            sender?: string;
            recipient?: string;
        };
        account?: {
            id?: number;
            slug?: string;
            enabled?: boolean;
            token?: string;
            userIdIG?: string;
            availableScenarios?: any;
        };
    },
    {
        id?: number;
        accountId?: number;
        firebaseUrl?: string;
        duration?: number;
        scenarioId?: number;
        sourceId?: number;
        scenario?: {
            id?: number;
            slug?: string;
            onlyOnce?: boolean;
            enabled?: boolean;
            texts?: Record<string, any>;
            options?: Record<string, any>;
            type?: import('../../types').ScenarioType;
            copiedFrom?: number;
        };
        source?: {
            id?: number;
            firebaseUrl?: string;
            duration?: number;
            sources?: Record<string, any>;
            bodyJSONString?: Record<string, any>;
            attempt?: number;
            lastUsed?: string;
            sender?: string;
            recipient?: string;
        };
        account?: {
            id?: number;
            slug?: string;
            enabled?: boolean;
            token?: string;
            userIdIG?: string;
            availableScenarios?: any;
        };
    }
>;
