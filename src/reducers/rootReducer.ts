export const initialState = {
	isLoading: false,
	error: false,
	success: false
};

export const request = () => ({
	isLoading: true,
	error: false,
	success: false
});

export const success = () => ({
	isLoading: false,
	error: false,
	success: true
});

export const failure = () => ({
	isLoading: false,
	error: true,
	success: false
});
