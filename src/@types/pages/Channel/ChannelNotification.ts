import {  notificationTypes } from '../../reducers';

export type ChannelNotificationProps = {
	index: number;
	selectedNotification: boolean;
	currentItem: notificationTypes.notificationData;
	onDelete:  ()  => void;
};

export type ChannelNotificationStates = {
	hover: boolean;
};
