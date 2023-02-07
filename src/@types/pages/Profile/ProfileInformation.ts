import { accountTypes, authTypes } from '../../reducers';
export type ProfileInformationProps = {};

export type ProfileInformationStates = {
	showCurrentPassword: boolean;
	showNewPassword: boolean;
	showConfirmPassword: boolean;
	changePassword: boolean;
	editProfile: boolean;
	user: accountTypes.IUserProfile | null;
	updateProfileData: {
		name: string;
		surname: string;
		email: string;
		country: string;
		timezone: string;
	} | null;
};
