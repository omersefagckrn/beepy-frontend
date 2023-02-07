import { Params } from 'react-router-dom';
import { channelTypes } from '../../reducers';
export type ChannelCredentialsProps = {
	params: Params;
};

export type ChannelCredentialsStates = {
	showApiKey: boolean;
	whiteLists: channelTypes.IWhiteListGet[] | null;
	credentials: channelTypes.ICredentialsGet | null;
	limits: channelTypes.IChannelLimits | null;
};
