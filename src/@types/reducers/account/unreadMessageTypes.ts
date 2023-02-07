import { BaseState, IDataFail } from '../rootReducer';

export interface IMessageUnread {
	status: boolean;
	requirement: string | null;
}
export interface IMessageUnreadRequest {
	message: string;
}

export type MessageUnreadState = BaseState & {
	data?: IMessageUnread | IDataFail;
	request?: IMessageUnreadRequest
};

export type MessageUnreadAction = {
	type: string;
	data?: IMessageUnread | IDataFail;
	request?: IMessageUnreadRequest;
};

export type MessageUnreadDispatchType = (args: MessageUnreadAction) => MessageUnreadAction;
