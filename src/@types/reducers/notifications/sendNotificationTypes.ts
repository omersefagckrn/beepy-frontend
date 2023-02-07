import { BaseState, IDataFail } from '../rootReducer';

export interface ISendNotification {
    status: boolean,
    requirement: string | null;
}
export interface ISendNotificationRequest {
    channel: string;
    title: string;
    description: string;
}
export type SendNotificationState = BaseState & {
    data?: ISendNotification | IDataFail;
    request?: ISendNotificationRequest;
}
export type SendNotificationAction = {
    type: string;
    data?: ISendNotification | IDataFail;
    request?: ISendNotificationRequest;

}
export type SendNotificationDispatchType = (args: SendNotificationAction) => SendNotificationAction;