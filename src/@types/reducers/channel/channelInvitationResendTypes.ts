import { BaseState, IDataFail } from '../rootReducer';

export interface IInvitationResend {
	status: boolean;
	requirement: string | null;
}
export interface IInvitationResendRequest {
	guid: string;
}

export type InvitationResendState = BaseState & {
	data?: IInvitationResend | IDataFail;
	request?: IInvitationResendRequest;
};
export type InvitationResendAction = {
	type: string;
	data?: IInvitationResend | IDataFail;
	request?: IInvitationResendRequest;
};

export type InvitationResendDispatchType = (args: InvitationResendAction) => InvitationResendAction;
