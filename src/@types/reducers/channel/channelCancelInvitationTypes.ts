import { BaseState, IDataFail } from '../rootReducer';

export interface IInvitationCancel {
	status: boolean;
	requirement: string | null;
}
export interface IInvitationCancelRequest {
	guid: string;
}
export type InvitationCancelState = BaseState & {
	data?: IInvitationCancel | IDataFail;
	request?: IInvitationCancelRequest;
};
export type InvitationCancelAction = {
	type: string;
	data?: IInvitationCancel | IDataFail;
	request?: IInvitationCancelRequest;
};

export type InvitationCancelDispatchType = (args: InvitationCancelAction) => InvitationCancelAction;
