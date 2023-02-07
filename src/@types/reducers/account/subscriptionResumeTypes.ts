import { BaseState, IDataFail } from '../rootReducer';
 

export interface IUserSubscriptionResumeResponse {
    status: boolean;
    requirement: string | null;
}
export interface ISubscriptionResumeRequest {
    subscription: string;
}
export type UserSubscriptionResumeState = BaseState & {
    data?:  IDataFail | IUserSubscriptionResumeResponse;
    request?: ISubscriptionResumeRequest
}

export type UserSubscriptionResumeAction = {
    type: string;
    data?:  IDataFail | IUserSubscriptionResumeResponse;
    request?: ISubscriptionResumeRequest 
}

export type UserSubscriptionResumeDispatchType = (args: UserSubscriptionResumeAction) => UserSubscriptionResumeAction