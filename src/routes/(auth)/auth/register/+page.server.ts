import { registerFormSchema } from '$lib/types/forms';
import { easeValidate } from '$lib/validation';
import { error, fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await easeValidate(registerFormSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals: { supabase }, url }) => {
		const form = await easeValidate(registerFormSchema, request);
		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password, first_name, last_name, company } = form.data;

		async function createUser() {
			const { data, error: err } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/auth/callback`,
					data: {
						company,
						first_name,
						last_name,
						full_name: `${first_name} ${last_name}`
					}
				}
			});
			if (err || !data.user) {
				console.error(err);
				throw error(500, {
					message: 'Server error, Try again later.'
				});
			}

			return data.user;
		}

		await createUser();

		return {
			email: form.data.email,
			message:
				'Registration successful! A verification email has been sent to your email address. Please check your inbox and follow the instructions to activate your account.'
		};
	}
};
