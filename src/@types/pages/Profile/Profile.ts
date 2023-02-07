import { Location, NavigateFunction } from 'react-router-dom';
import { accountTypes } from '../../reducers';
export type ProfileProps = {
	location: Location;
	navigate: NavigateFunction;
};

export type ProfileStates = {
	user: accountTypes.IUserProfile | null;
};
