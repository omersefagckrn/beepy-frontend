import { BaseState, IDataFail } from '../rootReducer';

export interface IDeleteWhiteList {
	status: boolean;
	requirement: string | null;
}
export interface IDeleteWhiteListRequest {
	channel: string | undefined;
	ip: string;
}
export type DeleteWhiteListState = BaseState & {
	data?: IDeleteWhiteList | IDataFail;
	request?: IDeleteWhiteListRequest;
};
export type DeleteWhiteListAction = {
	type: string;
	data?: IDeleteWhiteList | IDataFail;
	request?: IDeleteWhiteListRequest;
};
export type DeleteWhiteListDispatchType = (args: DeleteWhiteListAction) => DeleteWhiteListAction;
