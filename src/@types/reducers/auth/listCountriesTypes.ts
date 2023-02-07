import { BaseState, IDataFail } from '../rootReducer';
 
export type ICountry = {
    code: string;
    value: string;
}

export type CountriesState = BaseState & {
    data?: ICountry[] | IDataFail
}

export type CountriesAction = {
    type: string;
    data?: ICountry[] | IDataFail; 
}

export type CountriesDispatchType = (args: CountriesAction) => CountriesAction