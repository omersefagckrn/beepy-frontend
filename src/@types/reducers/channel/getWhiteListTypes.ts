import { BaseState, IDataFail } from '../rootReducer';

export interface IWhiteListGet {
	guid: string;
	label: string;
	ip: string;
	date: string;
}
export interface IWhiteListGetRequest {
	channel: string | undefined;
}
export type WhiteListState = BaseState & {
	data?: IWhiteListGet[] | IDataFail | [];
	request?: IWhiteListGetRequest;
};
export type WhiteListAction = {
	type: string;
	data?: IWhiteListGet[] | IDataFail;
	request?: IWhiteListGetRequest;
};
export type WhiteListDispatchType = (args: WhiteListAction) => WhiteListAction;
