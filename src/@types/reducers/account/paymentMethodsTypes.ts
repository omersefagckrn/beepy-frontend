import { BaseState, IDataFail } from '../rootReducer';

export interface IPaymentMethods {
	id: string;
	card_brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'cartes_bancaires';
	expiry_month: number;
	expiry_year: number;
	last_four: string;
	primary: boolean;
}

export type PaymenMethodsState = BaseState & {
	data?: IPaymentMethods[] | IDataFail;
};

export type PaymentMethodsAction = {
	type: string;
	data?: IPaymentMethods[] | IDataFail;
};
export type PaymentMethodsDispatchType = (args: PaymentMethodsAction) => PaymentMethodsAction;
