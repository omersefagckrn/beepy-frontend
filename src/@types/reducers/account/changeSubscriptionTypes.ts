import { BaseState, IDataFail } from '../rootReducer';

export interface IChangeSubscription {
	requirement: string | null;
	status: boolean;
}
export interface IChangeSubscriptionRequest {
	packageCode: string;
}

export type ChangeSubscriptionState = BaseState & {
	data?: IChangeSubscription | IDataFail;
	request?: IChangeSubscriptionRequest;
};

export type ChangeSubscriptionAction = {
	type: string;
	data?: IChangeSubscription | IDataFail;
	request?: IChangeSubscriptionRequest;
};

export type SubscriptionChangeDispatchType = (args: ChangeSubscriptionAction) => ChangeSubscriptionAction;
