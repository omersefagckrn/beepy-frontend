import { BaseState, IDataFail } from '../rootReducer';

export interface IReadNotification {
    status: boolean;
    requirement: null | string;
}
export interface IReadNotificationRequest {
    guid: string;
}
export type ReadNotificationState = BaseState & {
    data?: IReadNotification | IDataFail;
    request?: IReadNotificationRequest;
}
export type ReadNotificationAction = {
    type: string;
    data?: IReadNotification | IDataFail;
    request?: IReadNotificationRequest;
}
export type ReadNotificationDispatchType = (args: ReadNotificationAction) => ReadNotificationAction