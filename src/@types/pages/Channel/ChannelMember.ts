import { channelTypes } from '../../reducers';

export type ChannelMemberProps = {
	index: number;
	selectedMember: boolean;
	member: channelTypes.memberList;
	onDelete: () => void;
};

export type ChannelMemberStates = {
	hover: boolean;
};
