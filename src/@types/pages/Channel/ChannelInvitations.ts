import { Params } from "react-router-dom";
import { channelTypes } from '../../reducers';
export type ChannelInvitationsProps = {
	params: Params;
};

export type ChannelInvitationsStates = {
	selectedInvitation: string | null;
	invitations: channelTypes.IChannelInvitationList | null;
};

export interface InvitationData {
	guid: string;
	email: string;
	date: string;
	status: string;
}
