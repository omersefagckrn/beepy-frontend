import { channelTypes } from '../../reducers';

export type ChannelWebhookProps = {
	index: number;
	setWebHookActive: () => void;
	showWebhook: (webhook: channelTypes.IWebHooksGet) => void;
	webhook: channelTypes.IWebHooksGet;
	webhooksLength: number;
};

export type ChannelWebhookStates = {};
