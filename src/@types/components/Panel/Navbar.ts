import { NavigateFunction } from 'react-router-dom';
import { accountTypes } from '../../reducers';

export type NavbarProps = {
	navigate: NavigateFunction;
};

export type NavbarStates = {
	isMobileMenuOpen: boolean;
	isInvitationsOpen: boolean;
	isMessagesOpen: boolean;
	user: accountTypes.IUserProfile | null;
};
