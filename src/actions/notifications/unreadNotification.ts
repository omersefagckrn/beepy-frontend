import { notificationTypes } from '../../@types/reducers'; 
import { api } from '../../helpers';

export const unreadNotificationAction = ({ guid }: notificationTypes.IUnreadNotificationRequest) => {
    return async(dispatch: notificationTypes.UnreadNotificationDispatchType) => {
        dispatch({type: notificationTypes.actionTypes.NOTIFICATION_UNREAD_REQUEST, request: { guid }});
        const response = await api.post({endpoint: 'client/channel/notification/unread', body: { guid }});
        if(response.ok) return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_UNREAD_SUCCESS, data: response.data})
        else return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_UNREAD_FAILURE, data: response.data});
    }
}