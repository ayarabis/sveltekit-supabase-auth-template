import { deleteAccountFormSchema } from '$lib/types/forms.js';
import { easeValidate } from '$lib/validation/index.js';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const form = await easeValidate(deleteAccountFormSchema, {
		email: 'admin@easephare.com',
		confirm_text: 'delete my account',
		password: '88M$6.zE#k6!wP42'
	});

	return { form };
};

export const actions = {
	deleteAccount: async ({ request, locals: { supabase, getSession } }) => {
		const form = await easeValidate(deleteAccountFormSchema, request);

		if (!form.valid) {
			return fail(400, { form });
		}

		const session = await getSession();
		if (!session) {
			return redirect(302, '/auth/login');
		}

		const user = session.user;

		const { error: err } = await supabase.auth.admin.deleteUser(user.id);
		if (err) {
			console.error(err);
			throw error(500, {
				message: 'Internal server error'
			});
		}

		await supabase.auth.signOut();

		return redirect(302, '/auth/login');
	}
};
