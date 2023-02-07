import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type ButtonProps = {
	loading?: boolean;
	name: string;
	type: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];
	className?: string;
	color?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
};

export type ButtonStates = {};
