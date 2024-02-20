import { modals } from './store';
import type { ModalOption } from './types';

export async function pushModal(modal: ModalOption): Promise<boolean> {
	return new Promise((res) => {
		if (modal.type != 'custom') {
			const onPositive = modal.onPositive?.bind({});
			modal.onPositive = () => {
				res(true);
				return onPositive?.call(null) ?? true;
			};
			const onNegative = modal.onNegative?.bind({});
			modal.onNegative = () => {
				res(false);
				return onNegative?.call(null) ?? true;
			};
		}
		modals.update((value) => {
			value.push(modal);
			return value;
		});
	});
}

export function popModal() {
	modals.update((value) => {
		value.pop();
		return value;
	});
}
