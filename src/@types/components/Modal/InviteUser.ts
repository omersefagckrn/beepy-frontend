export type InviteUserProps = {
	title?: string;
	description?: string;
	onClose?: () => void;
	onSubmit: (email: string) => void;
	action?: string;
	membersCount?: number | null;
	membersLimit?: number | null;
};

export type InviteUserStates = {};
