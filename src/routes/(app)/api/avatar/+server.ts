import { error, json } from '@sveltejs/kit';

export const POST = async ({ request, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session || !session.user) {
		throw error(403, 'Unauthorized');
	}

	const formData = await request.formData();
	const file = formData.get('file') as File;

	if (!file) {
		throw error(500, 'Invalid file');
	}

	// generate new name
	const ext = file.name.split('.').pop();
	const filename = `${session.user.id}.${ext}`;

	// upload the file
	const { data, error: err } = await supabase.storage.from('avatars').upload(filename, file, {
		upsert: true
	});
	if (err) {
		console.error(err);
		throw error(500, {
			message: 'Internal server error'
		});
	}

	const {
		data: { publicUrl }
	} = supabase.storage.from('avatars').getPublicUrl(data.path);

	const time = new Date().getTime();
	const avatarUrl = publicUrl + `?${time}`;

	const newData = session.user.user_metadata ?? {};
	newData.avatar = avatarUrl;

	// update user meta daata with the new avatar
	await supabase.auth.updateUser({
		data: newData
	});

	const {
		data: { session: newSession }
	} = await supabase.auth.refreshSession();
	newSession && (await supabase.auth.setSession(newSession));

	return json({
		url: avatarUrl
	});
};
