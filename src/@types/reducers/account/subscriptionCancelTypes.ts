import { BaseState, IDataFail } from '../rootReducer';
 
export interface ICancelSubscription {
    requirement: string | null;
    status: boolean;
}
export interface ICancelSubscriptionRequest {
    subscription: string;
    password: string;
}
export type SubscriptionCancelState = BaseState & {
    data?: ICancelSubscription | IDataFail
    request?: ICancelSubscriptionRequest
}

export type SubscriptionCancelAction = {
    type: string;
    data?: ICancelSubscription | IDataFail;
    request?: ICancelSubscriptionRequest 
}

export type SubscriptionCancelDispatchType = (args: SubscriptionCancelAction) => SubscriptionCancelAction