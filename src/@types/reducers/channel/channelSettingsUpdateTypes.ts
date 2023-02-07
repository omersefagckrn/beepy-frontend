import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelSettingsUpdate {
	status: boolean;
	requirement: string | null;
}
export interface IChannelSettingsUpdateRequest {
	channel: string | undefined;
	muteable: boolean | null;
	display_logo: boolean | null;
	invitations_notify: boolean | null;
}
export type ChannelSettingsUpdateState = BaseState & {
	data?: IChannelSettingsUpdate | IDataFail;
	request?: IChannelSettingsUpdateRequest;
};
export type ChannelSettingsUpdateAction = {
	type: string;
	data?: IChannelSettingsUpdate | IDataFail;
	request?: IChannelSettingsUpdateRequest;
};
export type ChannelSettingsUpdateDispatchType = (args: ChannelSettingsUpdateAction) => ChannelSettingsUpdateAction;
