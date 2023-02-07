import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelActivate {
	status: boolean;
	requirement: string;
}

export interface IChannelActivateRequest {
	channel: string | undefined;
}

export type ChannelActivateState = BaseState & {
	data?: IChannelActivate | IDataFail;
	request?: IChannelActivateRequest;
};

export type ChannelActivateAction = {
	type: string;
	data?: IChannelActivate | IDataFail;
	request?: IChannelActivateRequest;
};

export type ChannelActivateDispatchType = (args: ChannelActivateAction) => ChannelActivateAction;
