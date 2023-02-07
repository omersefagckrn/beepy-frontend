import { BaseState, IDataFail } from '../rootReducer';

export interface IInviteActions {
	status: boolean;
	requirement: string;
}
export interface IInviteActionsRequest {
	guid: string;
	action: string;
}

export type InviteActionState = BaseState & {
	data?: IInviteActions | IDataFail;
	request?: IInviteActionsRequest
};

export type InviteActionAction = {
	type: string;
	data?: IInviteActions | IDataFail;
	request?: IInviteActionsRequest
};

export type InviteActionsDispatchType = (args: InviteActionAction) => InviteActionAction;
