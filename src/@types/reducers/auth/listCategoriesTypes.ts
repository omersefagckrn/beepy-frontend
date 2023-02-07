import { BaseState, IDataFail } from '../rootReducer';

export type ICategories = {
	[key: string]: {
		title: string;
		description: string;
	};
};

export type CategoriesState = BaseState & {
	data?: ICategories[] | IDataFail;
};

export type CategoriesAction = {
	type: string;
	data?: ICategories[] | IDataFail;
};

export type CategoriesDispatchType = (args: CategoriesAction) => CategoriesAction;
