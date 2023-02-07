export type PasswordConfirmationProps = {
	title?: string;
	description?: string;
	action?: string;
	onSubmit: (password: string) => void;
	onClose?: () => void;
};
export type PasswordConfirmationStates = {};
