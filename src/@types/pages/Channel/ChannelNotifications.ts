import { notificationTypes } from '../../reducers';
import { Params } from 'react-router-dom';
export type ChannelNotificationsProps = {
	params: Params;
};

export type ChannelNotificationsStates = {
	selectedNotification: string | null;
	notifications: notificationTypes.INotificationList | null;
	currentItems: notificationTypes.notificationData[] | [];
	currentPage: number;
	totalPages: number | null;
};

export interface NotificationData {
	guid: string;
	label: {
		text: string;
		bg_color: string;
		text_color: string;
	};
	title: string;
	description: string;
	date: string;
	type: string;
}
