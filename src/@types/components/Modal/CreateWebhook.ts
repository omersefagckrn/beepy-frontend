export type CreateWebhookProps = {
	title?: string;
	description?: string;
	action?: string;
	webhooksCount: number;
	webhookLimit: number;
	onSubmit: (webhook: string) => void;
	onClose?: () => void;
};
export type CreateWebhookStates = {};
