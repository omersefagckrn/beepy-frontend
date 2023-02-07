import { BaseState, IDataFail } from '../rootReducer';

export interface IUpdateBillingAddress {
	requirement: string | null;
	status: boolean;
}
export interface IUpdateBillingAddressRequest {
	address: string;
	country: string;
	city: string;
	state: string;
	zipcode: string;
}
export type UpdateBillingAddressState = BaseState & {
	data?: IUpdateBillingAddress | IDataFail;
	request?: IUpdateBillingAddressRequest
};

export type UpdateBillingAddressAction = {
	type: string;
	data?: IUpdateBillingAddress | IDataFail;
	request?: IUpdateBillingAddressRequest
};

export type UpdateBillingAddressDispatchType = (args: UpdateBillingAddressAction) => UpdateBillingAddressAction;
