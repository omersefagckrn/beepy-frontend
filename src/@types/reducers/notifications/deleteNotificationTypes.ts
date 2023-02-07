import { BaseState, IDataFail } from '../rootReducer';

export interface IDeleteNotification {
    status: boolean;
    requirement: null | string;
}
export interface IDeleteNotificationRequest {
    guid: string;
}
export type DeleteNotificationState = BaseState & {
    data?: IDeleteNotification | IDataFail;
    request?: IDeleteNotificationRequest;
}
export type DeleteNotificationAction = {
    type: string;
    data?: IDeleteNotification | IDataFail;
    request?: IDeleteNotificationRequest;
}
export type DeleteNotificationDispatchType = (args: DeleteNotificationAction) => DeleteNotificationAction