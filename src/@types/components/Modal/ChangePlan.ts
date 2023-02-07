import { subscriptionTypes } from '../../reducers';

export type ChangePlanProps = {
	title?: string;
	description?: string;
	onClose?: () => void;
	action?: string;
	packages: subscriptionTypes.ISubscriptionPackages[];
	changePlan: (plan: string, code: string) => void;
	getStarted: (code: string) => void;
};

export type ChangePlanStates = {
	packages: subscriptionTypes.ISubscriptionPackages[];
};
