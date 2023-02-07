import { BaseState, IDataFail } from '../rootReducer';

export type IUrls = {
	urls: {
		terms: Url;
		privacy: Url;
		cookie: Url;
	};
};

type Url = {
	label: string;
	url: string;
};

export type UrlsState = BaseState & {
	data?: IUrls | IDataFail;
};

export type UrlsAction = {
	type: string;
	data?: IUrls | IDataFail;
};

export type UrlsDispatchType = (args: UrlsAction) => UrlsAction;
