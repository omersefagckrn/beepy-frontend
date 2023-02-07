import { BaseState, IDataFail } from '../rootReducer';

export interface ITimeZone {
	code: string;
	value: string;
}

export type TimeZonesState = BaseState & {
	data?: ITimeZone[] | IDataFail;
};

export type TimeZonesAction = {
	type: string;
	data?: ITimeZone[] | IDataFail;
};
export type TimeZonesDispatchType = (args: TimeZonesAction) => TimeZonesAction;
