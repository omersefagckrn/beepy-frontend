import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelLeave {
	status: boolean;
	requirement: string | null;
}

export interface IChannelLeaveRequest {
	channel: string | undefined;
}

export type ChannelLeaveState = BaseState & {
	data?: IChannelLeave | IDataFail;
	request?: IChannelLeaveRequest;
};

export type ChannelLeaveAction = {
	type: string;
	data?: IChannelLeave | IDataFail;
	request?: IChannelLeaveRequest;
};

export type ChannelLeaveDispatchType = (args: ChannelLeaveAction) => ChannelLeaveAction;
