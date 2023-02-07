import { notificationTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const deleteNotificationReducer = (
    state: notificationTypes.DeleteNotificationState = initialState,
    action: notificationTypes.DeleteNotificationAction
): notificationTypes.DeleteNotificationState => {
    switch(action.type)
    {
        case notificationTypes.actionTypes.NOTIFICATION_DELETE_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case notificationTypes.actionTypes.NOTIFICATION_DELETE_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case notificationTypes.actionTypes.NOTIFICATION_DELETE_FAILURE:
            return {
                ...state,
                data: action.data,
                ...failure()
            }
    }
    return state;
}