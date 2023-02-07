import { BaseState, IDataFail } from '../rootReducer';

export interface ICredentialsRenew {
	status: true;
	requirement: string;
}
export interface ICredentialsRenewRequest {
	channel: string;
	password: string;
}
export type CredentialsRenewState = BaseState & {
	data?: ICredentialsRenew | IDataFail;
	request?: ICredentialsRenewRequest;
};
export type CredentialsRenewAction = {
	type: string;
	data?: ICredentialsRenew | IDataFail;
	request?: ICredentialsRenewRequest;
};
export type CredentialsRenewDispatchType = (args: CredentialsRenewAction) => CredentialsRenewAction;
