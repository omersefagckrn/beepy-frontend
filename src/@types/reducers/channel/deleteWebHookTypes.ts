import { BaseState, IDataFail } from '../rootReducer';

export interface IDeleteWebHooks {
	status: boolean;
	requirement: string;
}
export interface IDeleteWebHooksRequest {
	webhook: string;
}
export type DeleteWebHooksState = BaseState & {
	data?: IDeleteWebHooks | IDataFail;
	request?: IDeleteWebHooksRequest;
};
export type DeleteWebHooksAction = {
	type: string;
	data?: IDeleteWebHooks | IDataFail;
	request?: IDeleteWebHooksRequest;
};
export type DeleteWebHookDispatchType = (args: DeleteWebHooksAction) => DeleteWebHooksAction;
