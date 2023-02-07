import { notificationTypes } from '../../@types/reducers'; 
import { api } from '../../helpers';

export const notificationListAction = ({channel , page = 1}: notificationTypes.INotificationRequest) => {
    return async(dispatch: notificationTypes.NotificationListDispatchType) => {
        dispatch({type: notificationTypes.actionTypes.NOTIFICATION_LIST_REQUEST, request: { channel }});
        const response = await api.post({endpoint: 'client/channel/notification/list?page='+page, body: { channel }});
        if(response.ok) return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_LIST_SUCCESS, data: response.data})
        else return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_LIST_FAILURE, data: response.data});
    }
}