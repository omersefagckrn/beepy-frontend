import { BaseState, IDataFail } from '../rootReducer';

export interface ICreateWebHooks {
	status: boolean;
	requirement: null | string;
}
export interface ICreateWebHooksRequest {
	channel: string;
	label: string;
}
export type CreateWebHooksState = BaseState & {
	data?: ICreateWebHooks[] | IDataFail;
	request?: ICreateWebHooksRequest;
};
export type CreateWebHooksAction = {
	type: string;
	data?: ICreateWebHooks[] | IDataFail;
	request?: ICreateWebHooksRequest;
};
export type CreateWebHookDispatchType = (args: CreateWebHooksAction) => CreateWebHooksAction;
