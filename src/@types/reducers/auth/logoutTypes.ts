import { BaseState, IDataFail } from '../rootReducer';

export interface LogoutResponse {
    status: boolean;
    requirement: string | null;
}

export type LogoutState = BaseState & {
    data?: LogoutResponse | IDataFail ;
}

export type LogoutAction = {
    type: string;
    data?: LogoutResponse | IDataFail ;
}

export type LogoutDispatchType = (args: LogoutAction) => LogoutAction