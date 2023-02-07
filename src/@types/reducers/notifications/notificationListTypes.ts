import { StringMappingType } from 'typescript';
import { string } from 'yup';
import { BaseState, IDataFail } from '../rootReducer';


export interface notificationData {
    guid: string;
    title: string;
    description: string | null;
    label: {
        text: string;
        bg_color: string;
        text_color: string;
    } | null;
    date: string;
    unread: boolean;
    created_at: string;
}
interface link {
    url: string | null;
    label: string;
    active: boolean;
}
export interface INotificationList {
    data: notificationData[] | [];
    links: {
        first: string;
        last: string;
        prev: string;
        next: string;
    };
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: link[],
        path: string;
        per_page: number;
        to: number;
        total: number;
    }


}
export interface INotificationRequest {
    channel: string | undefined;
    page?: number,
}
export type NotificationListState = BaseState & {
    data?: INotificationList | IDataFail;
    request?: INotificationRequest;
}
export type NotificationListAction = {
    type: string;
    data?: INotificationList | IDataFail;
    request?: INotificationRequest;
};
export type NotificationListDispatchType = (args: NotificationListAction) => NotificationListAction;
