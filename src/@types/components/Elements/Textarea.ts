export type TextareaProps = {
	id?: string;
	placeholder?: string;
	autoComplete?: React.InputHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	maxLength?: number;
	name?: string;
	hidden?: boolean;
	rows?: number;
	value?: string;
};

export type TextareaStates = {};
