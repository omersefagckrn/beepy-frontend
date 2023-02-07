import { NavigateFunction } from 'react-router-dom';
import { channelTypes } from '../../reducers';
import { ChannelDeleteState } from '../../reducers/channel';

export type ChannelProps = {
	index: number;
	channel: channelTypes.Channel;
	channelLength: number;
	isFocused: boolean;
	setFocus: (index: number) => void;
	deleteChannel: (guid: string) => void;
	deletedChannel: ChannelDeleteState;
	activateChannel: (guid: string) => void;
	activateChannelState: channelTypes.ChannelActivateState;
};

export type ChannelStates = {};
