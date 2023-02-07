import { ChannelsStatus } from '../../pages/Channels';
import { BaseState, IDataFail } from '../rootReducer';

export interface IChannelList {
	own_channels: number;
	channels_max_limit: number;
	invitations: number;
	unread_total: number;
	inactive_channels_count: number;
	list: Channel[];
}
export interface Channel {
	guid: string;
	slug: string;
	title: string;
	description: string;
	type: string;
	status: ChannelsStatus;
	isOwner: boolean;
	members: number;
	category: string;
	unread: boolean;
	unread_count: number;
	discovery: string;
	logo: string;
	muteable: boolean;
	isMuted: boolean;
	created_at: string;
	date: string;
	last_notification: {
		guid: string;
		title: string;
		description: string;
		data: null | string;
		label: {
			text: string;
			bg_color: string;
			text_color: string;
		};
		date: null | string;
		unread: null | boolean;
		created_at: string;
	} | null;
}
export type ChannelListState = BaseState & {
	data?: IChannelList | IDataFail;
};

export type ChannelListAction = {
	type: string;
	data?: IChannelList | IDataFail;
};

export type ChannelListDispatchType = (args: ChannelListAction) => ChannelListAction;
