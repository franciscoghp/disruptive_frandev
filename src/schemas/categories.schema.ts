import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, { message: 'Name must be at least 3 characters long' }),
  permissions: z
    .array(z.string({ required_error: 'Permissions is required' }))
    .nonempty({ message: 'Permissions is required' }),
});

