import { BaseState, IDataFail } from '../rootReducer';

export interface IUserInvoices {
	id: number | string | null;
	plan: string;
	amount: string;
	reason: string;
	status: string;
	pdf: string | any;
	created: string;
}

export type UserInvoicesState = BaseState & {
	data?: IUserInvoices[] | IDataFail;
};

export type UserInvoicesAction = {
	type: string;
	data?: IUserInvoices[] | IDataFail;
};

export type UserInvoicesDispatchType = (args: UserInvoicesAction) => UserInvoicesAction;
