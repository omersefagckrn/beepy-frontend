import { BaseState, IDataFail } from '../rootReducer';

export interface ICreateChannel {
	status: boolean;
	channel: string;
	requirement: string | null;
}
export interface ICreateChannelRequest {
	title: string;
	description: string;
	type: string;
	slug: string;
	category: string;
}
export type CreateChannelState = BaseState & {
	data?: ICreateChannel | IDataFail;
	request?: ICreateChannelRequest;
};

export type CreateChannelAction = {
	type: string;
	data?: ICreateChannel | IDataFail;
	request?: ICreateChannelRequest;
};

export type CreateChannelDispatchType = (args: CreateChannelAction) => CreateChannelAction;
