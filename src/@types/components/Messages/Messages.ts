import { accountTypes } from '../../reducers';

export type MessagesProps = {
	isMessagesOpen: boolean;
	handleClose: () => void;
};

export type MessagesStates = {
	selectedMessageGuid: string | null;
	selectedMessage: accountTypes.IMessageList['data'][0] | null;
	currentPage: number;
	totalPages: number | null;
	messageList: accountTypes.IMessageList['data'] | null;
};
