import { BaseState, IDataFail } from '../rootReducer';

export interface IMessageRead {
	status: boolean;
	requirement: string | null;
}
export interface IMessageReadReuquest {
	message: string;
}

export type MessageReadState = BaseState & {
	data?: IMessageRead | IDataFail;
	request?: IMessageReadReuquest 
};

export type MessageReadAction = {
	type: string;
	data?: IMessageRead | IDataFail;
	request?: IMessageReadReuquest
};

export type MessageReadDispatchType = (args: MessageReadAction) => MessageReadAction;
