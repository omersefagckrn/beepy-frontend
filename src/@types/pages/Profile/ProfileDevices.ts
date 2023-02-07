import { accountTypes } from '../../reducers';
export type ProfileDevicesProps = {};

export type ProfileDevicesStates = {
	isLoading: boolean;
	selectedDevice: string | null;
	devices: accountTypes.IDevice[] | null;
};
