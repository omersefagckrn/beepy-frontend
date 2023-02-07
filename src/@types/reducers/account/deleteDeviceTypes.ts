import { BaseState, IDataFail } from '../rootReducer';

export interface IDeleteDevice {
	status: boolean;
	requirement: string | null;
}
export interface IDeleteDeviceRequest {
    guid: string;
}
export type DeleteDeviceState = BaseState & {
	data?: IDeleteDevice | IDataFail;
    request?: IDeleteDeviceRequest
};

export type DeleteDeviceAction = {
	type: string;
	data?: IDeleteDevice | IDataFail;
    request?: IDeleteDeviceRequest
};

export type DeleteDeviceDispatchType = (args: DeleteDeviceAction) => DeleteDeviceAction;
