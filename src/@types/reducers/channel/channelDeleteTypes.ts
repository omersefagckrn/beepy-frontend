import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelDelete {
    status: boolean,
    requirement: string;
}

export interface IChannelDeleteRequest {
	channel: string | undefined;
}

export type ChannelDeleteState = BaseState & {
	data?: IChannelDelete | IDataFail;
	request?: IChannelDeleteRequest;
};

export type ChannelDeleteAction = {
	type: string;
	data?: IChannelDelete | IDataFail;
	request?: IChannelDeleteRequest;
};

export type ChannelDeleteDispatchType = (args: ChannelDeleteAction) => ChannelDeleteAction;
