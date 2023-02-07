import { Stripe, StripeElements } from '@stripe/stripe-js';
import { accountTypes, subscriptionTypes } from '../../reducers';
import { IDataFail } from '../../reducers/rootReducer';

export type CheckoutProps = {
	title?: string;
	description?: string;
	onClose?: () => void;
	action?: string;
	user?: accountTypes.IUserProfile;
	getIntent: () => void;
	intent: subscriptionTypes.ISubscriptionIntent | null;
	stripe: Promise<Stripe | null>;
	selectedPlan?: subscriptionTypes.ISubscriptionPackages;
	editAddress: () => void;
	pay: (paymentMethod: string) => void;
	changePlan: () => void;
};

export type CheckoutStates = {
	termsAccepted: boolean;
	stripe: Stripe | null;
	elements: StripeElements | null;
	currentCard: string | null;
	loading: boolean;
};
