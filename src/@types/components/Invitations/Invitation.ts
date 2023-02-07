import { accountTypes } from '../../reducers';

export type InvitationProps = {
	data: accountTypes.IInvitation;
	index: number;
	datasLength: number;
	onAccepted: ({ guid }: { guid: string }) => void;
	onRejected: ({ guid }: { guid: string }) => void;
};

export type InvitationStates = {};
