/* eslint-disable @typescript-eslint/no-explicit-any */
import {z} from 'zod';
export declare const CreateScenarioParamsSchema: any;
export declare const GetScenarioByIdParamsSchema: z.ZodObject<
    {
        id: z.ZodNumber;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
    },
    {
        id?: number;
    }
>;
export declare const GetScenarioBySlugParamsSchema: z.ZodObject<
    {
        slug: z.ZodString;
    },
    'strict',
    z.ZodTypeAny,
    {
        slug?: string;
    },
    {
        slug?: string;
    }
>;
export declare const GetAllScenariosParamsSchema: z.ZodObject<{}, 'strict', z.ZodTypeAny, {}, {}>;
export declare const UpdateScenarioParamsSchema: any;
export declare const DeleteScenarioParamsSchema: z.ZodObject<
    {
        id: z.ZodNumber;
    },
    'strict',
    z.ZodTypeAny,
    {
        id?: number;
    },
    {
        id?: number;
    }
>;
