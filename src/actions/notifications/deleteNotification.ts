import { notificationTypes } from '../../@types/reducers'; 
import { api } from '../../helpers';

export const deleteNotificationAction = ({ guid }: notificationTypes.IDeleteNotificationRequest) => {
    return async(dispatch: notificationTypes.DeleteNotificationDispatchType) => {
        dispatch({type: notificationTypes.actionTypes.NOTIFICATION_DELETE_REQUEST, request: { guid }});
        const response = await api.post({endpoint: 'client/channel/notification/delete', body: { guid }});
        if(response.ok) return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_DELETE_SUCCESS, data: response.data})
        else return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_DELETE_FAILURE, data: response.data});
    }
}