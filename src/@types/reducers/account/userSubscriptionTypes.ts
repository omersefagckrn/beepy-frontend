import { BaseState, IDataFail } from '../rootReducer';
 
export interface IUserSubscriptionResponse {
    id: string;
    code: string;
    status: string;
    date: number;
    cancelled: boolean;
    end_date: number;
    renewal_date: number;
    current_channels: number;
    package: {
        name: string,
        code: string,
        desciprtion: string,
        price: number,
        price_id: string,
        billing_type: string,
        currency: string,
        features: {
            channel_max: number;
            notification_limit: number,
            members_max_per_channel: number;
            multiple_device: boolean;
            multiple_device_limit: number;
            api_services: boolean;
            api_rate_limit_request: number;
            webhooks_limit: number;
            ip_whitelist_limit: number;
            otp_numbers_limit: number;
        }
        recommended: boolean
    }
}

export type UserSubscriptionState = BaseState & {
    data?: IUserSubscriptionResponse | IDataFail
}

export type UserSubscriptionAction = {
    type: string;
    data?: IUserSubscriptionResponse | IDataFail; 
}

export type UserSubscriptionDispatchType = (args: UserSubscriptionAction) => UserSubscriptionAction