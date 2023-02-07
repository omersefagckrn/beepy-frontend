import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelSettings {
	display_logo: boolean | null;
	muteable: boolean | null;
	invitations_notify: boolean | null;
}
export interface IChannelSettingsRequest {
	channel: string | undefined;
}
export type ChannelSettingsState = BaseState & {
	data?: IChannelSettings | IDataFail;
	request?: IChannelSettingsRequest;
};
export type ChannelSettingsAction = {
	type: string;
	data?: IChannelSettings | IDataFail;
	request?: IChannelSettingsRequest;
};
export type ChannelSettingsDispatchType = (args: ChannelSettingsAction) => ChannelSettingsAction;
