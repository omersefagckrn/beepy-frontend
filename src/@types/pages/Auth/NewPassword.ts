import { Location, NavigateFunction } from 'react-router-dom';

export type NewPasswordProps = {
	location: Location;
	navigate: NavigateFunction;
};

export type NewPasswordStates = {
	status: boolean;
	email: string;
	password: string;
};
