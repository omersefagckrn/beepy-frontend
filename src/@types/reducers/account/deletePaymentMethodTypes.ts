import { BaseState, IDataFail } from '../rootReducer';

export interface IDeletePaymentMethods {
	requirement: string | null;
	status: boolean;
}
export interface IDeletePaymentMethodsRequest {
	payment_method: string;
}
export type DeletePaymentMethodState = BaseState & {
	data?: IDeletePaymentMethods | IDataFail;
	request?: IDeletePaymentMethodsRequest
};

export type DeletePaymentMethodAction = {
	type: string;
	data?: IDeletePaymentMethods | IDataFail;
	request?: IDeletePaymentMethodsRequest;
};

export type DeletePaymentMethodsDispatchType = (args: DeletePaymentMethodAction) => DeletePaymentMethodAction;
