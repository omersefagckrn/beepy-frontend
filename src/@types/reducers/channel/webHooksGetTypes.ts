import { BaseState, IDataFail } from '../rootReducer';

export interface IWebHooksGet {
	guid: string;
	label: string;
	webhook: string;
	status: string;
	created_at: string;
	date: string;
}
export interface IWebHooksGetRequest {
	channel: string | undefined;
}
export type WebHooksState = BaseState & {
	data?: IWebHooksGet[] | IDataFail;
	request?: IWebHooksGetRequest;
};
export type WebHookAction = {
	type: string;
	data?: IWebHooksGet[] | IDataFail;
	request?: IWebHooksGetRequest;
};
export type WebHookDispatchType = (args: WebHookAction) => WebHookAction;
