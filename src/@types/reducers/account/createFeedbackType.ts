import { BaseState, IDataFail } from '../rootReducer';

export interface ICreateFeedBack {
	status: boolean;
	requirement: string | null;
}
export interface ICreateFeedBackRequest {
	type: string;
	subject: string;
	message: string;
}
export type CreateFeedbackState = BaseState & {
	data?: ICreateFeedBack | IDataFail;
	request?: ICreateFeedBackRequest
};

export type CreateFeedbackAction = {
	type: string;
	data?: ICreateFeedBack | IDataFail;
	request?: ICreateFeedBackRequest;
};

export type CreateFeedbackDispatchType = (args: CreateFeedbackAction) => CreateFeedbackAction;
