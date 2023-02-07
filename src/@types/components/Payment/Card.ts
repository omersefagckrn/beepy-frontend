import { accountTypes } from '../../reducers';

export type CardProps = {
	index: number;
	card: accountTypes.IPaymentMethods;
	onDelete: (id: string) => void;
	onSelect: (id: string) => void;
};

export type CardStates = {
	hover: boolean;
};
