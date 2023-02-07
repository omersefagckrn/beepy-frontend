import { NavigateFunction } from 'react-router-dom';

export type PasswordSuccessProps = {
	email: string;
	password: string;
	navigate: NavigateFunction;
};

export type PasswordSuccessStates = {};
