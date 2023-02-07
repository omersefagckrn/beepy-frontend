import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelInactivate {
	status: boolean;
	requirement: string;
}

export interface IChannelInactivateRequest {
	channel: string | undefined;
}

export type ChannelInactivateState = BaseState & {
	data?: IChannelInactivate | IDataFail;
	request?: IChannelInactivateRequest;
};

export type ChannelInactivateAction = {
	type: string;
	data?: IChannelInactivate | IDataFail;
	request?: IChannelInactivateRequest;
};

export type ChannelInactivateDispatchType = (args: ChannelInactivateAction) => ChannelInactivateAction;
