import { BaseState, IDataFail } from '../rootReducer';

export interface IUpdateWebHooks {
	status: boolean;
	requirement: string;
}
export interface IUpdateWebHooksRequest {
	webhook: string;
}
export type UpdateWebHooksState = BaseState & {
	data?: IUpdateWebHooks | IDataFail;
	request?: IUpdateWebHooksRequest;
};
export type UpdateWebHooksAction = {
	type: string;
	data?: IUpdateWebHooks | IDataFail;
	request?: IUpdateWebHooksRequest;
};
export type UpdateWebHookDispatchType = (args: UpdateWebHooksAction) => UpdateWebHooksAction;
