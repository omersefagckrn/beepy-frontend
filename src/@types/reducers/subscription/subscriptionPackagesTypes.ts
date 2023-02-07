import { stringify } from 'querystring';
import { string } from 'yup';
import { BaseState, IDataFail } from '../rootReducer';



export interface ISubscriptionPackages {
    name: string;
    code: string;
    description: string;
    price: number;
    price_id: string;
    billing_type: string;
    currency: string;
    features: {
        channel_max: number,
        notification_limit: number,
        members_max_per_channel: number,
        multiple_device: boolean,
        multiple_device_limit: number,
        api_services: boolean,
        api_rate_limit_request: number,
        webhooks_limit: number,
        ip_whitelist_limit: number,
        otp_numbers_limit: number
    },
    recommended: boolean;
    current: boolean;
}
export type SubscriptionPackagesState = BaseState & {
    data?: ISubscriptionPackages[] | IDataFail;
}
export type SubscriptionPackagesAction = {
    type: string;
    data?: ISubscriptionPackages[] | IDataFail;
}
export type SubscriptionPackagesDispatchType = (args: SubscriptionPackagesAction) => SubscriptionPackagesAction;