import { notificationTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const readNotificationReducer = (
    state: notificationTypes.ReadNotificationState = initialState,
    action: notificationTypes.ReadNotificationAction
): notificationTypes.ReadNotificationState => {
    switch(action.type)
    {
        case notificationTypes.actionTypes.NOTIFICATION_READ_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case notificationTypes.actionTypes.NOTIFICATION_READ_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case notificationTypes.actionTypes.NOTIFICATION_READ_FAILURE:
            return {
                ...state,
                data: action.data,
                ...failure()
            }
    }
    return state;
}