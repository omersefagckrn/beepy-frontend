import { accountTypes } from '../../reducers';

export type MessageProps = {
	data: accountTypes.IMessageList['data'][0];
	index: number;
	datasLength: number;
	selectMessage: (guid: string) => void;
};

export type MessageStates = {};
