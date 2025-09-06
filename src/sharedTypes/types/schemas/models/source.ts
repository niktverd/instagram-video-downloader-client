import {z} from 'zod';

import {createEntitySchema} from './base';

export const SourceSchema = createEntitySchema({
    firebaseUrl: z.string().optional(),
    sources: z.record(z.string(), z.any()),
    bodyJSONString: z.record(z.string(), z.any()).optional(),
    duration: z.number().optional(),
    attempt: z.number().optional(),
    lastUsed: z.string().optional(),
    sender: z.string().optional(),
    recipient: z.string().optional(),
    organizationId: z.number().optional(),
}).strict();

export type ISource = z.infer<typeof SourceSchema>;
