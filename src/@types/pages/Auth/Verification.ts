import { NavigateFunction } from 'react-router-dom';

export type VerificationProps = {
	navigate: NavigateFunction;
};

export type VerificationStates = {
	otp: string;
};
