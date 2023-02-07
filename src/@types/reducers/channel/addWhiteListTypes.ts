import { BaseState, IDataFail } from '../rootReducer';

export interface IAddWhiteList {
	status: boolean;
	requirement: string | null;
}
export interface IAddWhiteListRequest {
	channel: string | undefined;
	ip: string;
	label: string;
}
export type AddWhiteListState = BaseState & {
	data?: IAddWhiteList | IDataFail;
	request?: IAddWhiteListRequest;
};
export type AddWhiteListAction = {
	type: string;
	data?: IAddWhiteList | IDataFail;
	request?: IAddWhiteListRequest;
};
export type AddWhiteListDispatchType = (args: AddWhiteListAction) => AddWhiteListAction;
