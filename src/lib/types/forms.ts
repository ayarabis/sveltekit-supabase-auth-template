import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().min(1, 'Email is required').email(),
	password: z.string().min(6, 'Password must be at lease 6 characters')
});

export const registerFormSchema = z
	.object({
		email: z.string().min(1, 'Email is required').email(),
		first_name: z.string().min(1, 'Firstname is required'),
		last_name: z.string().min(1, 'Lastname is required'),
		company: z.string(),
		password: z.string().min(6, 'Password must be at lease 6 characters'),
		confirm_password: z.string().min(1, 'Password confirmation is required')
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Password does not match',
		path: ['confirm_password']
	});

export const updatePasswordFormSchema = z
	.object({
		old_password: z.string().optional(),
		password: z.string().min(6, 'Password must be at lease 6 characters'),
		confirm_password: z.string().min(1, 'Password confirmation is required')
	})
	.refine((data) => data.password === data.confirm_password, {
		message: 'Password does not match',
		path: ['confirm_password']
	});

export const deleteAccountFormSchema = z.object({
	confirm_text: z.string().min(1, 'Plase type the following text to confirm'),
	password: z.string().min(1, 'Please confirm your password')
});
