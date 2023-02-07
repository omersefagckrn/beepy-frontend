import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ChannelNotificationsTypes } from '../../@types/pages';
import { notificationTypes } from '../../@types/reducers';

import { alert, modal, router } from '../../helpers';
import { ChannelNotification } from '../../pages';
import { RootState } from '../../store';
import { notificationActions } from '../../actions';

import Paginate from '../../components/Paginate/Paginate';
import { Animation } from '../../components';

class ChannelNotifications extends React.Component<ChannelNotificationsTypes.ChannelNotificationsProps & ConnectedProps<typeof connector>, ChannelNotificationsTypes.ChannelNotificationsStates> {
	state: ChannelNotificationsTypes.ChannelNotificationsStates = {
		selectedNotification: null,
		notifications: null,
		currentItems: [],
		totalPages: null,
		currentPage: 1
	};

	setSelectedNotifications = (notification: string) => {
		if (this.state.selectedNotification === notification) this.setState({ selectedNotification: null });
		else this.setState({ selectedNotification: notification });
	};

	componentDidMount() {
		this.props.getNotifications({ channel: this.props.params.id });
	}

	onDeleteNotification = (guid: string) => {
		this.props.deleteNotification({ guid });
	};

	componentDidUpdate(prevProps: ChannelNotificationsTypes.ChannelNotificationsProps & ConnectedProps<typeof connector>) {
		if (prevProps.notifications !== this.props.notifications && !this.props.notifications.isLoading && !this.props.notifications.error && this.props.notifications.success) {
			this.setState({
				notifications: this.props.notifications.data as notificationTypes.INotificationList,
				totalPages: (this.props.notifications.data as notificationTypes.INotificationList).meta.last_page
			});
		}
		// if(prevProps.deleteNotification !== this.props.deleteNotification && !this.props.deleteNotification.isLoading && !this.props.deleteNotification.error && this.props.deleteNotification.success){
		// 	this.props.getNotifications({ channel: this.props.params.id });
		// }
		if (prevProps.deleteNotificationState !== this.props.deleteNotificationState && !this.props.deleteNotificationState.isLoading) {
			alert.fire({
				message: this.props.deleteNotificationState.error ? (this.props.deleteNotificationState.data as unknown as any).message : 'The notification has just been deleted successfully!',
				error: this.props.deleteNotificationState.error
			});
			this.props.getNotifications({ channel: this.props.params.id });
		}
	}

	changePage = (page: number) => {
		this.setState({ currentPage: page });
		this.props.getNotifications({ channel: this.props.params.id, page });
	};

	render() {
		const currentItems = this.props.notifications.data as notificationTypes.INotificationList;
		return (
			<>
				{currentItems && currentItems.data.length !== 0 && Array.isArray(currentItems.data) ? (
					<div className='mt-6'>
						{currentItems.data &&
							currentItems.data.length > 0 &&
							currentItems.data.map((currentItem, index) => (
								<div
									key={index}
									onClick={() => {
										this.setSelectedNotifications(currentItem.guid);
									}}>
									<ChannelNotification
										onDelete={() => {
											modal.confirmModal({
												title: 'Delete Notification',
												actionName: 'Delete',
												description: 'Are you sure you want to delete this notification?',
												onClick: () => {
													this.onDeleteNotification(currentItem.guid);
												},
												color: 'bg-red-600'
											});
										}}
										selectedNotification={this.state.selectedNotification === currentItem.guid}
										currentItem={currentItem}
										index={index}
									/>
								</div>
							))}
					</div>
				) : (
					<Animation.NoNotification />
				)}
				{this.state.totalPages && currentItems && currentItems.meta.total > 20 && <Paginate onPageChange={(page) => this.changePage(page)} pageCount={this.state.totalPages} />}
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	notifications: state.notification.notificationList,
	deleteNotificationState: state.notification.deleteNotification
});
const mapDispatch = {
	getNotifications: ({ channel, page }: notificationTypes.INotificationRequest) => notificationActions.notificationListAction({ channel, page }),
	deleteNotification: ({ guid }: notificationTypes.IDeleteNotificationRequest) => notificationActions.deleteNotificationAction({ guid })
};
const connector = connect(mapState, mapDispatch);
export default connector(router.withParams(ChannelNotifications));
