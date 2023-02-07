import { BaseState, IDataFail } from '../rootReducer';

export interface IPaymentKey {
    key: string;
}

export type PaymentKeyState = BaseState & {
    data?: IPaymentKey | IDataFail;   
}
export type PaymentKeyAction = {
    type: string;
    data?: IPaymentKey | IDataFail;
}
export type PaymentKeyDispatchType = (args: PaymentKeyAction) => PaymentKeyAction;