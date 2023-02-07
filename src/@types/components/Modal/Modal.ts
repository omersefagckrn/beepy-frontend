export type ModalProps = {
	title?: string;
	description?: string;
	modalBodyClass?: string;
	onClose?: () => void;
	hideOnBackgroundClick?: boolean;
};

export type ModalStates = {
	isOpen: boolean;
};
