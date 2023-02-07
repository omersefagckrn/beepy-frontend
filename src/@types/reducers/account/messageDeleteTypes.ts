import { BaseState, IDataFail } from '../rootReducer';

export interface IDeleteMessage {
	status: boolean;
	requirement: string | null;
}
export interface IDeleteMessageRequest {
	message: string;
}

export type DeleteMessageState = BaseState & {
	data?: IDeleteMessage | IDataFail;
	request?: IDeleteMessageRequest
};

export type DeleteMessageAction = {
	type: string;
	data?: IDeleteMessage | IDataFail;
	request?: IDeleteMessageRequest
};

export type DeleteMessageDispatchType = (args: DeleteMessageAction) => DeleteMessageAction;
