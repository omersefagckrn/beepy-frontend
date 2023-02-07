import { BaseState, IDataFail } from '../rootReducer';

export interface ICredentialsGet {
	id: number;
	guid: string;
	belongs_to: string;
	apikey: string;
	status: string;
	created_at: string;
	updated_at: string;
}
export interface ICredentialsGetRequest {
	channel: string | undefined;	
}
export type CredentialsGetState = BaseState & {
	data?: ICredentialsGet | IDataFail;
	request?: ICredentialsGetRequest;
};
export type CredentialsGetAction = {
	type: string;
	data?: ICredentialsGet | IDataFail;
	request?: ICredentialsGetRequest;
};
export type CredentialsGetDispatchType = (args: CredentialsGetAction) => CredentialsGetAction;
