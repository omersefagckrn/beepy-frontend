import { BaseState, IDataFail } from '../rootReducer';

export type IFeedbacks = {
	subjects: {
		[key: string]: string;
	};
	types: {
		[key: string]: string;
	};
};

export type FeedBacksState = BaseState & {
	data?: IFeedbacks | IDataFail;
};

export type FeedBacksAction = {
	type: string;
	data?: IFeedbacks | IDataFail;
};

export type FeedBacksDispatchType = (args: FeedBacksAction) => FeedBacksAction;
