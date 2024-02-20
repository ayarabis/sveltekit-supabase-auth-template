import type { EaseForm, EaseFormValdiated } from '$lib/validation/types';
import { SupabaseClient, Session } from '@supabase/supabase-js';
import { User } from '@supabase/gotrue-js';
import type { ZodObject } from 'zod';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {}
		interface PageState {}
		// interface Error {}
		// interface Platform {}
	}
}
