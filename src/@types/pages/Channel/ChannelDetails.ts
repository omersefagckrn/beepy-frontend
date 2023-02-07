import { NavigateFunction, Params } from 'react-router-dom';
import { channelTypes } from '../../reducers';

export type ChannelDetailsProps = {
	params: Params;
	navigate: NavigateFunction;
};

export type ChannelDetailsStates = {
	editProfile: boolean;
	details: channelTypes.IChannelDetails | null;
};
