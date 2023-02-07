import { BaseState, IDataFail } from '../rootReducer';

export interface IInvitation {
	guid: string;
	channel: string;
	slug: string;
	logo: string;
	invited_by: string;
	invited_at: string;
	status: string;
	resend_count: number;
	created_at: string;
}

export type InvitationsListState = BaseState & {
	data?: IInvitation[] | IDataFail;
};

export type InvitationListAction = {
	type: string;
	data?: IInvitation[] | IDataFail;
};
export type InvitationListDispatchType = (args: InvitationListAction) => InvitationListAction;
