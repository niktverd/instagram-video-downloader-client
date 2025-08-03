import {z} from 'zod';

import {IUser} from './../../../schemas/models/user';
import {UserSchema} from './../../../types/schemas/models';

export const CreateUserParamsSchema = UserSchema.omit({id: true});

export const GetUserByIdParamsSchema = z
    .object({
        id: z.string(),
    })
    .strict();

export const GetUserByEmailParamsSchema = z
    .object({
        email: z.string(),
    })
    .strict();

export const GetAllUsersParamsSchema = z.object({}).strict();

export const UpdateUserParamsSchema = CreateUserParamsSchema.partial()
    .extend({
        id: z.number(),
    })
    .strict();

export const DeleteUserParamsSchema = z
    .object({
        id: z.string(),
    })
    .strict();

// user

export type CreateUserParams = z.infer<typeof CreateUserParamsSchema>;
export type CreateUserResponse = IUser;

export type GetUserByIdParams = z.infer<typeof GetUserByIdParamsSchema>;
export type GetUserByIdResponse = IUser;

export type GetUserByEmailParams = z.infer<typeof GetUserByEmailParamsSchema>;
export type GetUserByEmailResponse = IUser;

export type GetAllUsersParams = z.infer<typeof GetAllUsersParamsSchema>;
export type GetAllUsersResponse = IUser[];

export type UpdateUserParams = z.infer<typeof UpdateUserParamsSchema>;
export type UpdateUserResponse = IUser;

export type DeleteUserParams = z.infer<typeof DeleteUserParamsSchema>;
export type DeleteUserResponse = number;
