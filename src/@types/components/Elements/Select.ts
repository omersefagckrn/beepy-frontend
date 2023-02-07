export type SelectProps = {
	id?: string;
	value?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	selectArray?: Array<string>;
};

export type SelectStates = {};
