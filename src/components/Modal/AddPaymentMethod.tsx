import { CardElement, Elements as PaymentElements, ElementsConsumer } from '@stripe/react-stripe-js';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import React from 'react';

import { Modal as ModalType } from '../../@types/components';

import { Elements } from '../../components';
import Modal from '../../components/Modal/Modal';
import { alert } from '../../helpers';

const cardStyle = {
	style: {
		base: {
			backgroundColor: '#f1f1f1',
			fontSmoothing: 'antialiased',
			fontSize: '16px'
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a'
		}
	}
};
class AddPaymentMethod extends React.Component<ModalType.AddPaymentMethodProps, ModalType.AddPaymentMethodStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.AddPaymentMethodProps) {
		super(props);
		this.modal = React.createRef();
	}

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();

	handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, stripe: Stripe | null, elements: StripeElements | null) => {
		event.preventDefault();

		if (!stripe || !elements) {
			this.hide();
			return;
		}

		// @ts-ignore
		const cardElement = elements?.getElement(CardElement) as CardElement;

		const { error, paymentMethod } = await stripe?.createPaymentMethod({
			type: 'card',
			card: cardElement
		});

		if (error) {
			alert.fire({
				message: error.message || 'An error occurred while adding payment method.',
				error: true
			});
			this.hide();
			return;
		}

		if (paymentMethod) {
			this.hide();
			this.props.onSubmit(paymentMethod.id);
		}
	};

	render() {
		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full sm:w-[28rem]' title={this.props.title} description={this.props.description}>
				<div className='mt-4 flex'>
					{this.props.intent ? (
						<div className='w-full max-w-full p-2'>
							<PaymentElements stripe={this.props.stripe} options={{ clientSecret: this.props.intent }}>
								<ElementsConsumer>
									{({ elements, stripe }) => {
										return (
											<form>
												<CardElement options={cardStyle} className='rounded-lg border-2 border-gray-400 bg-[#f1f1f1] p-2' />
												<div className='mt-4 flex select-none items-center justify-center'>
													<Elements.Button onClick={() => this.hide()} type='button' name='Cancel' color='bg-transparent' className='w-1/2 border border-gray-300 p-2' />
													<Elements.Button onClick={(e) => this.handleSubmit(e, stripe, elements)} type='submit' name={this.props.action ?? 'Add'} className='w-1/2 p-2 text-white ml-3' />
												</div>
											</form>
										);
									}}
								</ElementsConsumer>
							</PaymentElements>
						</div>
					) : (
						<div className='p-2'>Loading...</div>
					)}
				</div>
			</Modal>
		);
	}
}

export default AddPaymentMethod;
