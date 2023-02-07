import { SidePaneProps } from 'react-side-pane';
import { accountTypes } from '../../reducers';

export type MessageDetailProps = {
	onClose: SidePaneProps['onClose'];
	open: SidePaneProps['open'];
	data: accountTypes.IMessageList['data'][0] | null;
	refresh: () => void;
	//onActive: SidePaneProps["onActive"]
};

export type MessageDetailStates = {};
