import { notificationTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const unreadNotificationReducer = (
    state: notificationTypes.UnreadNotificationState = initialState,
    action: notificationTypes.UnreadNotificationAction
): notificationTypes.UnreadNotificationState => {
    switch(action.type)
    {
        case notificationTypes.actionTypes.NOTIFICATION_UNREAD_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case notificationTypes.actionTypes.NOTIFICATION_UNREAD_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case notificationTypes.actionTypes.NOTIFICATION_UNREAD_FAILURE:
            return {
                ...state,
                data: action.data,
                ...failure()
            }
    }
    return state;
}