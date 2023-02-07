import { NavigateFunction } from 'react-router-dom';

export type ForgotPasswordProps = {
	navigate: NavigateFunction;
};

export type ForgotPasswordStates = {
	email: string;
	emailSent: boolean;
};
