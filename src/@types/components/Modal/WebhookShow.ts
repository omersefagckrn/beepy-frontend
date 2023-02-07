import { IWebHooksGet } from '../../reducers/channel';

export type WebhookShowProps = {
	title?: string;
	description?: string;
	action?: string;
	onClose?: () => void;
	onDelete: (webhook: IWebHooksGet | null) => void;
	webhook: IWebHooksGet | null;
};

export type WebhookShowStates = {};
