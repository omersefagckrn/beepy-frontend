import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelLimits {
	members: {
		members_count: number;
		invitations_count: number;
		max_limit: number;
	};
	webhooks: {
		webhooks_count: number;
		max_limit: number;
	};
	whitelist: {
		whitelist_count: number;
		max_limit: number;
	};
}

export interface IChannelLimitsRequest {
	channel: string | undefined;
}

export type ChannelLimitsState = BaseState & {
	data?: IChannelLimits | IDataFail;
	request?: IChannelLimitsRequest;
};

export type ChannelLimitsAction = {
	type: string;
	data?: IChannelLimits | IDataFail;
	request?: IChannelLimitsRequest;
};

export type ChannelLimitsDispatchType = (args: ChannelLimitsAction) => ChannelLimitsAction;
