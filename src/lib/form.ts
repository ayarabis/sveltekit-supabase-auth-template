import type { Writable } from 'svelte/store';

export type FormFieldContext = {
	name: string;
	error: Writable<string>;
	value: Writable<any>;
};
