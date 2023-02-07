import { BaseState, IDataFail } from '../rootReducer';

export interface IUnreadNotification {
    status: boolean,
    requirement: string | null;
}
export interface IUnreadNotificationRequest {
    guid: string;
}
export type UnreadNotificationState = BaseState & {
    data?: IUnreadNotification | IDataFail;
    request?: IUnreadNotificationRequest;
}
export type UnreadNotificationAction = {
    type: string;
    data?: IUnreadNotification | IDataFail;
    request?: IUnreadNotificationRequest;

}
export type UnreadNotificationDispatchType = (args: UnreadNotificationAction) => UnreadNotificationAction;