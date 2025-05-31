import {z} from 'zod';

import {AccountSchema} from './../models';
import {zodOptionalBoolean} from './utils';

export const CreateAccountParamsSchema = AccountSchema.omit({id: true});
export const GetAccountByIdParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();

export const GetAccountBySlugParamsSchema = z
    .object({
        slug: z.string(),
    })
    .strict();

export const GetAllAccountsParamsSchema = z
    .object({
        onlyEnabled: zodOptionalBoolean(),
    })
    .strict();

export const UpdateAccountParamsSchema = CreateAccountParamsSchema.partial()
    .extend({
        id: z.number(),
    })
    .strict();

export const DeleteAccountParamsSchema = z
    .object({
        id: z.number(),
    })
    .strict();
