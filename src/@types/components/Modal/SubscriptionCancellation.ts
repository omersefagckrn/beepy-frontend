export type SubscriptionCancellationProps = {
	title?: string;
	description?: string;
	action?: string;
	onSubmit: (password: string) => void;
	onClose?: () => void;
};

export type SubscriptionCancellationStates = {};
