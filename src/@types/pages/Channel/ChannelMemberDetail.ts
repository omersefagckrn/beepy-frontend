import { NavigateFunction } from 'react-router-dom';
import { channelTypes } from '../../reducers';

export type ChannelDetailMemberProps = {
	navigate: NavigateFunction;
	id: string;
	details: channelTypes.IChannelDetails;
};
export type ChannelDetailMemberStates = {};
