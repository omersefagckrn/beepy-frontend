import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelDetailsUpdate {
	status: boolean;
	requirement: null | string;
}

export interface IChannelDetailsUpdateRequest {
	channel: string | undefined;
	title: string;
	description: string;
	category: string;
}

export type ChannelDetailsUpdateState = BaseState & {
	data?: IChannelDetailsUpdate | IDataFail;
	request?: IChannelDetailsUpdateRequest;
};

export type ChannelDetailsUpdateAction = {
	type: string;
	data?: IChannelDetailsUpdate | IDataFail;
	request?: IChannelDetailsUpdateRequest;
};

export type ChannelDetailsUpdateDispatchType = (args: ChannelDetailsUpdateAction) => ChannelDetailsUpdateAction;
