import { IPaymentMethods } from '../account';
import { BaseState, IDataFail } from '../rootReducer';

export interface ISubscriptionIntent {
	secret: string;
	customer: string;
	paymentMethods: IPaymentMethods[] | [];
}
export type SubscriptionState = BaseState & {
	data?: ISubscriptionIntent | IDataFail;
};
export type SubscriptionAction = {
	type: string;
	data?: ISubscriptionIntent | IDataFail;
};
export type SubscriptionDispatchType = (args: SubscriptionAction) => SubscriptionAction;
