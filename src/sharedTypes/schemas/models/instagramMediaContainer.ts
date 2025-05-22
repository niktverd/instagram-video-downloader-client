/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const InstagramMediaContainerSchema: z.ZodObject<
    {
        id: z.ZodNumber;
        preparedVideoId: z.ZodNumber;
        accountId: z.ZodNumber;
        lastCheckedIGStatus: z.ZodOptional<z.ZodString>;
        isPublished: z.ZodOptional<z.ZodBoolean>;
        attempts: z.ZodOptional<z.ZodNumber>;
        error: z.ZodOptional<z.ZodString>;
        containerId: z.ZodOptional<z.ZodString>;
        mediaId: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
        audioName: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodAny>;
        hashtags: z.ZodOptional<z.ZodArray<z.ZodString, 'many'>>;
        isBlocked: z.ZodOptional<z.ZodBoolean>;
        blockedReason: z.ZodOptional<z.ZodString>;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
        accountId?: number;
        isBlocked?: boolean;
        preparedVideoId?: number;
        lastCheckedIGStatus?: string;
        isPublished?: boolean;
        attempts?: number;
        error?: string;
        containerId?: string;
        mediaId?: string;
        caption?: string;
        audioName?: string;
        location?: any;
        hashtags?: string[];
        blockedReason?: string;
    },
    {
        id?: number;
        accountId?: number;
        isBlocked?: boolean;
        preparedVideoId?: number;
        lastCheckedIGStatus?: string;
        isPublished?: boolean;
        attempts?: number;
        error?: string;
        containerId?: string;
        mediaId?: string;
        caption?: string;
        audioName?: string;
        location?: any;
        hashtags?: string[];
        blockedReason?: string;
    }
>;
