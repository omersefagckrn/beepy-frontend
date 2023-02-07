import { notificationTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const sendNotificationReducer = (
    state: notificationTypes.SendNotificationState = initialState,
    action: notificationTypes.SendNotificationAction
): notificationTypes.SendNotificationState => {
    switch(action.type)
    {
        case notificationTypes.actionTypes.NOTIFICATION_SEND_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case notificationTypes.actionTypes.NOTIFICATION_SEND_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case notificationTypes.actionTypes.NOTIFICATION_SEND_FAILURE:
            return {
                ...state,
                data: action.data,
                ...failure()
            }
    }
    return state;
}