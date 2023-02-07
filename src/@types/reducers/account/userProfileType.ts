import { BaseState, IDataFail } from '../rootReducer';

export type IUserProfile = {
	guid: string;
	name: string;
	surname: string;
	email: string;
	country: string;
	billing_address: {
		address: string;
		country: string;
		city: string;
		state: string;
		zip_code: string;
	} | null;
	status: string;
	localization: string;
	subscription: string;
	verification: string;
	timezone: string;
	settings: {
		multiple_device: boolean;
		multiple_device_max: number;
		channel_max: number;
		api_rate_limit_request: number;
		api_rate_limit_time: number;
		members_max_per_channel: number;
		notification_limit: number;
	};
	current: {
		channels: number;
	};
	messages: number;
	invitations: number;
	urls: {
		urls: {
			terms: {
				label: string;
				url: string;
			};
			privacy: {
				label: string;
				url: string;
			};
			cookie: {
				label: string;
				url: string;
			};
		};
	};
};

export type UserProfileState = BaseState & {
	data?: IUserProfile | IDataFail;
};

export type UserProfileAction = {
	type: string;
	data?: IUserProfile | IDataFail;
};

export type UserProfileDispatchType = (args: UserProfileAction) => UserProfileAction;
