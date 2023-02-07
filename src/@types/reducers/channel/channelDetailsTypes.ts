import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelDetails {
	title: string;
	slug: string;
	logo: string;
	description: string;
	category: string;
	status: string;
	type: string;
	members: number;
	date: string;
	isOwner: boolean;
}

export interface IChannelDetailsRequest {
	channel: string | undefined;
}

export type ChannelDetailsState = BaseState & {
	data?: IChannelDetails | IDataFail;
	request?: IChannelDetailsRequest;
};

export type ChannelDetailsAction = {
	type: string;
	data?: IChannelDetails | IDataFail;
	request?: IChannelDetailsRequest;
};

export type ChannelDetailsDispatchType = (args: ChannelDetailsAction) => ChannelDetailsAction;
