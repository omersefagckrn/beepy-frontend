import { BaseState, IDataFail } from '../rootReducer';

export interface IAddPaymentMethods {
	requirement: string | null;
	status: boolean;
}
export interface IAddPaymentMethodsRequest {
	payment_method: string;
}
export type AddPaymentMethodState = BaseState & {
	data?: IAddPaymentMethods | IDataFail;
	request?: IAddPaymentMethodsRequest
};

export type AddPaymentMethodsAction = {
	type: string;
	data?: IAddPaymentMethods | IDataFail;
	request?: IAddPaymentMethodsRequest
};

export type AddPaymentMethodsDispatchType = (args: AddPaymentMethodsAction) => AddPaymentMethodsAction;
