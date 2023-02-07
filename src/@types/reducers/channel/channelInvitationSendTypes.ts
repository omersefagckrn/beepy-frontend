import { BaseState, IDataFail } from '../rootReducer';

export interface IInvitationSend {
	status: boolean;
	requirement: string;
}
export interface IInvitationSendRequest {
	channel: string;
	email: string;
}

export type InvitationSendState = BaseState & {
	data?: IInvitationSend | IDataFail;
	request?: IInvitationSendRequest;
};
export type InvitationSendAction = {
	type: string;
	data?: IInvitationSend | IDataFail;
	request?: IInvitationSendRequest;
};

export type InvitationSendDispatchType = (args: InvitationSendAction) => InvitationSendAction;
