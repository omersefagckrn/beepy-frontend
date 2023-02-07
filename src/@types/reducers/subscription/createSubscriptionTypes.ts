import { BaseState, IDataFail } from '../rootReducer';

export interface ICreateSubscription {
    status: boolean;
    requirement: string | null;
}
export interface ICreateSubscriptionRequest {
    _package: string;
    payment_method: string;
}
export type CreateSubscriptionState = BaseState & {
    data?: ICreateSubscription | IDataFail;
    request?: ICreateSubscriptionRequest;
}
export type CreateSubscriptionAction = {
    type: string;
    data?: ICreateSubscription | IDataFail;
    request?: ICreateSubscriptionRequest;
}
export type CreateSubscriptionDispatchType = (args: CreateSubscriptionAction) => CreateSubscriptionAction;