import { Params } from 'react-router-dom';
import { channelTypes } from '../../reducers';
export type ChannelWebhooksProps = {
	params: Params;
};

export type ChannelWebhooksStates = {
	webhooks: channelTypes.IWebHooksGet[] | null;
	limits: channelTypes.IChannelLimits | null;
	currentWebhook: channelTypes.IWebHooksGet | null;
};
