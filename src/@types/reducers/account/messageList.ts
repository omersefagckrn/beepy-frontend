import { BaseState, IDataFail } from '../rootReducer';

interface Label {
	text: string;
	bg_color: string;
	text_color: string;
}

interface Datum {
	guid: string;
	title: string;
	description: string;
	tag: string;
	read: boolean;
	status: string;
	custom?: any;
	image?: any;
	data?: any;
	created_at: Date;
	date: string;
	label: Label;
}

interface Links {
	first: string;
	last: string;
	prev?: any;
	next?: any;
}

interface Link {
	url: string;
	label: string;
	active: boolean;
}

interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}

export interface IMessageList {
	data: Datum[];
	links: Links;
	meta: Meta;
}

export type MessageListState = BaseState & {
	data?: IMessageList | IDataFail;
};

export type MessageListAction = {
	type: string;
	data?: IMessageList | IDataFail;
};

export type MessageListDispatchType = (args: MessageListAction) => MessageListAction;
