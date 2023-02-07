import { notificationTypes } from '../../@types/reducers'; 
import { api } from '../../helpers';

export const readNotificationAction = ({ guid }: notificationTypes.IReadNotificationRequest) => {
    return async(dispatch: notificationTypes.ReadNotificationDispatchType) => {
        dispatch({type: notificationTypes.actionTypes.NOTIFICATION_READ_REQUEST, request: { guid }});
        const response = await api.post({endpoint: 'client/channel/notification/read', body: { guid }});
        if(response.ok) return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_READ_SUCCESS, data: response.data})
        else return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_READ_FAILURE, data: response.data});
    }
}