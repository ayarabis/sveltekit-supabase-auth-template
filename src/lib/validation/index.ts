import { writable } from 'svelte/store';
import type { ZodSchema, z } from 'zod';
import type { EaseForm, EaseFormOption, EaseFormValdiated } from './types';

export async function easeValidate<T extends ZodSchema>(
	schema: T,
	values?: Request | any
): Promise<EaseFormValdiated<T>> {
	let data: z.infer<T> = {};
	let errors: z.infer<T> = {};
	if (values && values instanceof Request) {
		const fd = await values.formData();
		fd.forEach((v, k) => {
			data[k] = v;
		});

		const result = schema.safeParse(data);
		if (result.success) {
			return {
				data,
				errors,
				valid: true
			};
		}
		result.error.issues.forEach((v) => {
			errors[v.path[0]] = v.message;
		});
	} else if (values) {
		data = values;
	}
	return {
		data,
		errors,
		valid: false
	};
}

export function easeForm<T extends ZodSchema>(
	form: EaseFormValdiated<T>,
	options?: EaseFormOption
): EaseForm<T> {
	const data = writable(form.data);
	return {
		data,
		options
	};
}
