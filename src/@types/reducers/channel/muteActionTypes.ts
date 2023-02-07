import { BaseState, IDataFail } from '../rootReducer';

export interface IMuteAction {
	status: boolean;
	requirement: null | string;
}
export interface IMuteActionRequest {
	channel: string;
}
export type MuteActionState = BaseState & {
	data?: IMuteAction | IDataFail;
	request?: IMuteActionRequest;
};
export type MuteAction_Action = {
	type: string;
	data?: IMuteAction | IDataFail;
	request?: IMuteActionRequest;
};
export type MuteActionDispatchType = (args: MuteAction_Action) => MuteAction_Action;
