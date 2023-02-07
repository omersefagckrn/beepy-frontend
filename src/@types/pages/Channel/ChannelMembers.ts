import { Params } from 'react-router-dom';
import { channelTypes } from '../../reducers';
export type ChannelMembersProps = {
	params: Params;
};

export type ChannelMembersStates = {
	selectedMember: string | null;
	members: channelTypes.IChannelMembers | null;
	limits: channelTypes.IChannelLimits | null;
};
