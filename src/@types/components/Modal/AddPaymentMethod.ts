import { Stripe } from '@stripe/stripe-js';

export type AddPaymentMethodProps = {
	title?: string;
	description?: string;
	onClose?: () => void;
	onSubmit: (payment_method: string) => void;
	getIntent: () => void;
	intent: string;
	action?: string;
	stripe: Promise<Stripe | null>;
};

export type AddPaymentMethodStates = {};
