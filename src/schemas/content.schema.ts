import { z } from 'zod';

export const contentSchema = z.object({
  name_theme: z.string({
    required_error: 'Category name is required',
  }),
  url: z.string().optional().default(''),
  content_text: z.string().optional().default(''),
  credits: z.string().optional().default(''),
});

