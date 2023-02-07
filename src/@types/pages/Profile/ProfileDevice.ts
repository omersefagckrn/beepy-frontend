import { accountTypes } from '../../reducers';

export type ProfileDeviceProps = {
	index: number;
	selectedDevice: boolean;
	data: accountTypes.IDevice;
	onDelete: ({ guid }: { guid: string }) => void;
};

export type ProfileDeviceStates = {};
