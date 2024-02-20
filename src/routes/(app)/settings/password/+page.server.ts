import { updatePasswordFormSchema } from '$lib/types/forms';
import type { Database } from '$lib/types/supabase';
import { easeValidate } from '$lib/validation';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

import sbjs from '@supabase/supabase-js';

export const load = async ({ locals: { supabase, getSession } }) => {
	const form = await easeValidate(updatePasswordFormSchema);
	const session = await getSession();
	const user = session?.user;

	const { data: hasPassword } = await supabase.rpc('user_has_password', {
		user_id: user!.id
	});

	return { form, hasPassword };
};

export const actions = {
	async updatePassword({ request, locals: { supabase, getSession } }) {
		const session = await getSession();
		const user = session?.user;

		const { data: hasPassword } = await supabase.rpc('user_has_password', {
			user_id: user!.id
		});

		let schema = updatePasswordFormSchema.superRefine(({ old_password }, context) => {
			if (hasPassword && (!old_password || old_password == '')) {
				return context.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please enter your old password',
					path: ['old_password']
				});
			}
			return context;
		});

		const form = await easeValidate(schema, request);

		if (!form.valid) {
			return fail(400, { form });
		}

		if (hasPassword) {
			const { data: passwordVerified } = await supabase.rpc('verify_user_password', {
				password: form.data.old_password as string
			});
			if (!passwordVerified) {
				return fail(403, {
					message:
						'he old password you entered does not match your current password. Please double-check and try again.'
				});
			}
		}

		await setPassword(supabase, form.data.password);

		return {
			form,
			message:
				'Your password has been successfully updated. You can now log in using your new password.'
		};
	}
};

async function setPassword(supabase: sbjs.SupabaseClient<Database>, password: string) {
	const { error: err } = await supabase.auth.updateUser({
		password
	});
	if (err) {
		throw error(500, {
			message: 'Server error, Try again later.'
		});
	}
}
