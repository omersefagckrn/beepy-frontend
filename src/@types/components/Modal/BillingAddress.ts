import { accountTypes, authTypes } from '../../reducers';

export type BillingAddressProps = {
	title?: string;
	description?: string;
	onSubmit: ({ address, country, city, state, zipcode }: accountTypes.IUpdateBillingAddressRequest) => void;
	onClose?: () => void;
	action?: string;
	currentAddress?: {
		address: string | undefined;
		country: string | undefined;
		city: string | undefined;
		state: string | undefined;
		zipcode: string | undefined;
	};
	countries: authTypes.ICountry[];
};
export type BillingAddressStates = {};
