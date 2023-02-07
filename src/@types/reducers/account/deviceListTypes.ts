import { BaseState, IDataFail } from '../rootReducer';

export interface IDevice {
	guid: string;
	os: string;
	os_version: string;
	ip_address: string;
	date: string;
	created_at: string;
	current: boolean;
	location: {
		ip: string;
		city: string;
		lang: number;
		long: number;
		region: string;
		country: string;
		continent: string;
		country_code: string;
	};
}

export type DeviceListState = BaseState & {
	data?: IDevice[] | IDataFail;
};

export type DeviceListAction = {
	type: string;
	data?: IDevice[] | IDataFail;
};

export type DeviceListDispatchType = (args: DeviceListAction) => DeviceListAction;
