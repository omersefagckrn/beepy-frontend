import { notificationTypes } from '../../@types/reducers'; 
import { api } from '../../helpers';

export const sendNotificationAction = ({channel, title, description }: notificationTypes.ISendNotificationRequest) => {
    return async(dispatch: notificationTypes.SendNotificationDispatchType) => {
        dispatch({type: notificationTypes.actionTypes.NOTIFICATION_SEND_REQUEST, request: { channel, title, description }});
        const response = await api.post({endpoint: 'client/channel/notification/send', body: { channel, title, description }});
        if(response.ok) return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_SEND_SUCCESS, data: response.data})
        else return dispatch({type: notificationTypes.actionTypes.NOTIFICATION_SEND_FAILURE, data: response.data});
    }
}