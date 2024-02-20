import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals: { getSession }, depends }) => {
	depends('app:main');
	const session = await getSession();
	if (!session) {
		redirect(302, '/auth/login?redirect_to=' + url.pathname);
	}

	return {
		user: session.user
	};
};
