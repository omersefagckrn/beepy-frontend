import { NavigateFunction } from 'react-router-dom';
import { channelTypes } from '../../reducers';

export enum ChannelsStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	PENDING = 'PENDING',
	SUSPENDED = 'SUSPENDED',
	EXAMINATION = 'EXAMINATION'
}

export type ChannelsProps = {
	type: ChannelsStatus;
	navigate: NavigateFunction;
};

export type ChannelsStates = {
	channels: channelTypes.IChannelList | null;
	focusedChannel: number | null;
};
