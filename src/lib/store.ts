import { writable } from 'svelte/store';
import type { ModalOption } from './types';

export const app = writable(false);

export const modals = writable<ModalOption[]>([]);
