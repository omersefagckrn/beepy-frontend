import { ChannelInvitationsTypes } from '..';

export type ChannelInvitationProps = {
	index: number;
	selectedInvitation: boolean;
	invitation: ChannelInvitationsTypes.InvitationData;
	resendInvitation: () => void;
	cancelInvitation: () => void;
};

export type ChannelInvitationStates = {};
