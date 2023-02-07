import { BaseState, IDataFail } from '../rootReducer';

export interface ISetPrimaryPaymentMethods {
	requirement: string | null;
	status: boolean;
}
export interface ISetPrimaryPaymentMethodsRequest {
	payment_method: string;
}
export type SetPrimaryPaymentMethodState = BaseState & {
	data?: ISetPrimaryPaymentMethods | IDataFail;
	request?: ISetPrimaryPaymentMethodsRequest
};

export type SetPrimaryPaymentMethodsAction = {
	type: string;
	data?: ISetPrimaryPaymentMethods | IDataFail;
	request?: ISetPrimaryPaymentMethodsRequest
};

export type SetPrimaryPaymentMethodsDispatchType = (args: SetPrimaryPaymentMethodsAction) => SetPrimaryPaymentMethodsAction;
