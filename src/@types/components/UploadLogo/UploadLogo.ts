export type UploadLogoProps = {
	onSubmit: (file: File & { preview: string }) => void;
	buttonActive: boolean;
};

export type UploadLogoStates = {
	files: (File & { preview: string })[];
};
