export interface IDataFail {
	code: number | null;
	message: string;
	requirement: string | null;
}

export type BaseState = {
	isLoading: boolean;
	error: boolean;
	success: boolean;
	data?: {};
};
