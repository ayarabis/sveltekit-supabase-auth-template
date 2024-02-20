import type { Snippet } from 'svelte';

type BaseModal = {
	class?: string;
	title?: string;
	backdropClosable?: boolean;
	noCloseButton?: boolean;
};

export type ModalOption = BaseModal &
	(
		| {
				type: 'info' | 'alert' | 'error' | 'confirm';
				content?: string | Snippet;
				positiveText?: string;
				onPositive?: () => boolean | void;
				negativeText?: string;
				onNegative?: () => boolean | void;
		  }
		| {
				type: 'custom';
				content: Snippet<[any]>;
				data?: any;
		  }
	);
