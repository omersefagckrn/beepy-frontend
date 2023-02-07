import { Params } from "react-router-dom";
import { channelTypes } from '../../reducers';
export type ChannelSettingsProps = {
	params: Params;
};

export type ChannelSettingsStates = {
	channelSettings: channelTypes.IChannelSettings | null;
	muteable: boolean | null;
	invitations_notify: boolean | null;
	
};
