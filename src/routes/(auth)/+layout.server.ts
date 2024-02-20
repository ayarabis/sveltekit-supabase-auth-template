import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	if (session) {
		redirect(302, url.searchParams.get('redirect_to') ?? '/');
	}
};
