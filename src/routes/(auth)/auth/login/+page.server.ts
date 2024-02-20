import { loginFormSchema } from '$lib/types/forms';
import { easeValidate } from '$lib/validation';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await easeValidate(loginFormSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await easeValidate(loginFormSchema, request);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: err } = await supabase.auth.signInWithPassword(form.data);

		if (err) {
			if (err.status === 400) {
				return fail(401, {
					message: 'Authentication failed...try again'
				});
			}
			throw error(500, {
				...err
			});
		}

		return redirect(302, '/');
	}
};
