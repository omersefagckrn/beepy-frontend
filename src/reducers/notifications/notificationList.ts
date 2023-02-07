import { notificationTypes } from "../../@types/reducers"; 
import { initialState, request, success, failure } from '../rootReducer';

export const notificationListReducer = (
    state: notificationTypes.NotificationListState = initialState,
    action: notificationTypes.NotificationListAction
): notificationTypes.NotificationListState => {
    switch(action.type)
    {
        case notificationTypes.actionTypes.NOTIFICATION_LIST_REQUEST:
            return {
                ...state,
                request: action.request,
                ...request()
            }
        case notificationTypes.actionTypes.NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                ...success(),
                data: action.data
            }
        case notificationTypes.actionTypes.NOTIFICATION_LIST_FAILURE:
            return {
                ...state,
                data: action.data,
                ...failure()
            }
    }
    return state;
}