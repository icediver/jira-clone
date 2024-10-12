import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, 'Required'),
});

export const registerSchema = z.object({
	name: z.string().trim().min(1, 'Required'),
	email: z.string().trim().min(1, 'Required').email(),
	password: z.string().min(8, 'Minimum 8 characters').max(256, 'Maximum 256 characters'),
});
