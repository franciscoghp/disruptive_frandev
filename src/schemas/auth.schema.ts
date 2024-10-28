import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(3, { message: 'Username must be at least 3 characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'invalid email' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, { message: 'min 6 characters' }),
  role: z.string({}).optional().default('readers'),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'invalid email' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, { message: 'min 6 characters' }),
});

