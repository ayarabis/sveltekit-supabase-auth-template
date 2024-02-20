import type { Readable, Updater, Writable } from 'svelte/store';
import type { ZodSchema } from 'zod';
import z from 'zod';

export type EaseFormData<T extends ZodSchema> = {
	subscribe: Readable<z.infer<T>>['subscribe'];
	set(this: void, value: z.infer<T>): void;
	update(this: void, updater: Updater<z.infer<T>>): void;
};

export type EaseFormValdiated<T extends ZodSchema> = {
	data: z.infer<T>;
	valid: boolean;
	errors: z.infer<T>;
};

export type EaseForm<T extends ZodSchema> = {
	data: EaseFormData<T>;
	options?: EaseFormOption;
};

export type EaseFormOption = {
	resetForm?: boolean;
	validateOnChange?: boolean;
};

export type FormConfig<T extends ZodSchema> = {
	data: Writable<z.infer<T>>;
	errors: Writable<{ [keyof in z.infer<T>]: string }>;
};
