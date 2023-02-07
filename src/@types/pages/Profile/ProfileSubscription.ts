import { accountTypes } from '../../reducers';

export type ProfileSubscriptionProps = {};

export type ProfileSubscriptionStates = {
	invoices: accountTypes.IUserInvoices[] | null;
	subscription: accountTypes.IUserSubscriptionResponse | null;
	paymentMethods: accountTypes.IPaymentMethods[] | null;
	user: accountTypes.IUserProfile | null;
	selectedPlan: string | null;
};
