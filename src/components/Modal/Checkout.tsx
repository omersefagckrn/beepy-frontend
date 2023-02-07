import React from 'react';

import { Modal as ModalType } from '../../@types/components';

import Modal from '../../components/Modal/Modal';

import poweredByStripe from '../../assets/powered_by_stripe.svg';
import arrowUpRight from '../../assets/arrow-up-right.svg';

import { CardElement, Elements as PaymentElements, ElementsConsumer } from '@stripe/react-stripe-js';
import { Elements } from '..';
import { accountTypes, subscriptionTypes } from '../../@types/reducers';
import { alert, payment } from '../../helpers';
import { Stripe, StripeElements } from '@stripe/stripe-js';

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

const getCurrencySymbol = (currency: string) => (0).toLocaleString(navigator.language, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim();

class Checkout extends React.Component<ModalType.CheckoutProps, ModalType.CheckoutStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.CheckoutProps) {
		super(props);
		this.modal = React.createRef();
	}

	state: ModalType.CheckoutStates = {
		termsAccepted: false,
		stripe: null,
		elements: null,
		currentCard: null,
		loading: false
	};

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();
	loading = (loading: boolean) => this.setState({ loading });

	setStripe = (elements: StripeElements | null, stripe: Stripe | null) => {
		if (this.state.stripe !== null && this.state.elements !== null) return;
		if (!elements || !stripe) return;

		this.setState({ elements, stripe });
	};

	pay = async (id: string) => {
		this.props.pay(id);
	};

	stripePay = async () => {
		if (!this.state.stripe || !this.state.elements) {
			this.hide();
			return;
		}

		// @ts-ignore
		const cardElement = this.state.elements.getElement(CardElement) as CardElement;

		const { error, paymentMethod } = await this.state.stripe?.createPaymentMethod({
			type: 'card',
			card: cardElement
		});

		if (error) {
			this.loading(false);
			return alert.fire({
				message: error.message ?? 'An error occurred while processing your payment.',
				error: true
			});
		}

		if (paymentMethod) this.pay(paymentMethod.id);
	};

	handleChangeCard = (id: string) => {
		if (id === this.state.currentCard) return this.setState({ currentCard: null });

		this.setState({
			currentCard: id
		});
	};

	isCardBlank() {
		return document.querySelector('.StripeElement--empty') ? true : false;
	}

	clearCard() {
		if (this.state.elements) {
			// @ts-ignore
			this.state.elements.getElement(CardElement).clear();
		}
	}

	render() {
		const { selectedPlan } = this.props;

		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full md:w-[88rem]' title={this.props.title} description={this.props.description}>
				<div className='p-4'>
					<div className='xxs:m-2 flex flex-col items-start gap-x-16 gap-y-10 md:m-0 md:flex-row'>
						<div className='flex w-full flex-col rounded-lg bg-[white] shadow-lg ring-2 ring-gray-500/20'>
							<div className='space-y-8 p-6'>
								{this.props.user?.billing_address && (
									<>
										<div>
											<h3 className='text-lg font-medium'>Billing address</h3>
											<p className='opacity-50'>Your card details.</p>
										</div>
										<hr className='text-[#e4e7ec]' />
										<div className='rounded-lg border-[1px] border-[#e4e7ec]'>
											<div className='m-4 flex items-center justify-between'>
												<div className='flex flex-col items-start justify-start'>
													<div className='text-sm font-semibold text-[#1e2b3b]'>Billing Address</div>
													<div className='mt-2 text-sm font-semibold text-[#1e2b3b80]'>
														{this.props.user.billing_address.address} <br /> {this.props.user.billing_address.city} {this.props.user.billing_address.state}
													</div>
													<div className='text-sm font-semibold text-[#1e2b3b80]'>
														{this.props.user.billing_address.country} - {this.props.user.billing_address.zip_code}
													</div>
												</div>
												<button onClick={() => this.props.editAddress()} className='rounded-lg border border-[#d0d5dd] text-sm font-semibold text-[#1e2b3b]'>
													<div className='m-2'>Edit</div>
												</button>
											</div>
										</div>
									</>
								)}
								<section>
									<div>
										<h3 className='text-lg font-medium'>Payment Method</h3>
										<p className='opacity-50'>Your card details.</p>
									</div>
									{!this.props.intent?.paymentMethods || (Array.isArray(this.props.intent.paymentMethods) && this.props.intent.paymentMethods.length === 0) ? (
										<div className='text-bluey-grey mt-4 mb-4 flex items-start justify-start'>You do not have a payment method.</div>
									) : (
										<>
											<hr className='my-4 text-[#e4e7ec]' />
											<div className='scrollbar h-[15rem]'>
												{this.props.intent.paymentMethods &&
													Array.isArray(this.props.intent.paymentMethods) &&
													this.props.intent.paymentMethods.length > 0 &&
													this.props.intent.paymentMethods.map((card, index) => (
														<div onClick={() => this.handleChangeCard(card.id)} key={index}>
															<div className='mt-3 flex items-start space-x-4 rounded-lg border border-gray-200 p-5 leading-tight text-gray-700'>
																<div className='flex-shrink-0 rounded-lg p-2 ring-1 ring-gray-200/40'>
																	<img className='h-12 w-16 select-none' src={payment.getBrandIcon(card.card_brand)} alt={''} />
																</div>
																<div className='flex flex-grow flex-col items-start'>
																	<span className='font-semibold'>
																		{payment.getBrandName(card.card_brand)} <span className='select-none'>ending in</span> {card.last_four}
																	</span>
																	<span className='flex items-center justify-start text-sm opacity-50'>
																		Expiry {card.expiry_month}/{card.expiry_year}
																	</span>
																</div>
																<div className='flex items-center justify-center'>
																	<input
																		checked={card.id === this.state.currentCard}
																		onChange={() => this.handleChangeCard(card.id)}
																		type='radio'
																		value={card.id}
																		className='focus:ring-primary text-primary rounded-full border-gray-500 ring-[0.5px] ring-transparent transition-all focus:border-transparent'
																	/>
																</div>
															</div>
														</div>
													))}
											</div>
											<hr className='my-8 text-[#e4e7ec]' />
										</>
									)}
									{this.props.intent ? (
										<div className='w-full max-w-full p-2'>
											<PaymentElements stripe={this.props.stripe} options={{ clientSecret: this.props.intent.secret }}>
												<ElementsConsumer>
													{({ elements, stripe }) => {
														this.setStripe(elements, stripe);

														return (
															<form>
																<CardElement options={cardStyle} className='rounded-lg border-2 border-gray-400 bg-[#f1f1f1] w-auto h-10 p-2' />
															</form>
														);
													}}
												</ElementsConsumer>
											</PaymentElements>
										</div>
									) : (
										<div className='p-2'>Loading...</div>
									)}
									<img className='w-36 pt-8' src={poweredByStripe} alt='powered by stripe' />
								</section>
							</div>
						</div>
						{/* Preview Side */}
						<div className='xxs:w-full rounded-lg bg-[white] p-6 shadow-lg ring-2 ring-gray-500/20 md:m-0 md:w-[80%]'>
							<div className='flex flex-col items-start'>
								<h3 className='flex items-center text-lg font-medium'>Order Summary</h3>
								<p className='opacity-50'>Summary of your order.</p>
							</div>
							<hr className='my-8 text-[#e4e7ec]' />
							{selectedPlan && (
								<>
									<div className='mb-4 space-y-4'>
										<Radio
											currentPlan={selectedPlan}
											checked={true}
											onChange={() => {}}
											key={selectedPlan.code}
											id={'plan_' + selectedPlan.code}
											type='radio'
											name='packageId'
											value={selectedPlan.code}
											title={selectedPlan.name}
											price={`${getCurrencySymbol(selectedPlan.currency)}${selectedPlan.price}/${selectedPlan.billing_type}`}
											description={selectedPlan.description}
										/>
									</div>
									<div className='cursor-pointer'>
										<div onClick={() => this.props.changePlan()} className='flex items-center font-semibold text-[#ff9b01]'>
											Change Plan <img src={arrowUpRight} alt={''} />
										</div>
									</div>
									<hr className='my-4 text-[#e4e7ec]' />
									<div className='mb-6 rounded-md bg-gray-200/40 p-6 text-sm text-gray-500'>
										beepy.io Subscription {selectedPlan.name} ({selectedPlan.billing_type[0].toUpperCase() + selectedPlan.billing_type.slice(1)} plan) Billed {selectedPlan.billing_type} at {getCurrencySymbol(selectedPlan.currency)}
										{selectedPlan.price} + local tax
									</div>
									<p className='text-sm font-medium text-gray-500 md:w-3/4'>Your subscription will automatically renew each month at the price below.</p>
									<div className='my-6 space-y-2 text-sm font-medium text-gray-700'>
										<div className='flex items-center justify-between opacity-50'>
											<span>Price</span>
											<span>
												{getCurrencySymbol(selectedPlan.currency)}
												{selectedPlan.price}/{selectedPlan.billing_type}
											</span>
										</div>
										<div className='flex items-center justify-between opacity-50'>
											<span>Tax</span>
											<span>
												{getCurrencySymbol(selectedPlan.currency)}0/{selectedPlan.billing_type}
											</span>
										</div>
										<div className='flex items-center justify-between font-bold'>
											<span>Total</span>
											<span>
												{getCurrencySymbol(selectedPlan.currency)}
												{selectedPlan.price}/{selectedPlan.billing_type}
											</span>
										</div>
									</div>
								</>
							)}
							<hr className='my-4 text-[#e4e7ec]' />
							<div className='pb-8'>
								<Label terms={true} urls={this.props.user?.urls.urls}>
									<input
										id='terms'
										checked={this.state.termsAccepted}
										onChange={() =>
											this.setState({
												termsAccepted: !this.state.termsAccepted
											})
										}
										type='checkbox'
										name='terms'
										className='text-primary rounded border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0'
										required
									/>
								</Label>
							</div>
							<div className='flex items-center justify-end space-x-4'>
								<Elements.Button disabled={this.state.loading} onClick={() => this.hide()} type='button' name='Cancel' color='bg-transparent' className='flex items-center justify-center rounded-lg bg-[white] px-6 py-2 text-sm ring-1 ring-gray-200 transition-all hover:ring-gray-500' />
								<Elements.Button
									name='Complete Order'
									type='submit'
									loading={this.state.loading}
									disabled={!this.props.user?.billing_address?.address || !this.state.termsAccepted}
									className='ring-primary bg-primary flex items-center justify-center rounded-lg px-6 py-2 text-sm text-[white] ring-1 disabled:bg-gray-200 disabled:text-gray-500'
									onClick={async () => {
										if (this.isCardBlank() && !this.state.currentCard)
											return alert.fire({
												message: 'Please select or enter a card to continue.',
												error: true
											});
										else {
											this.setState({
												loading: true
											});

											if (this.isCardBlank() && this.state.currentCard) this.pay(this.state.currentCard);
											else if (!this.isCardBlank() && !this.state.currentCard) this.stripePay();
										}
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

class Radio extends React.Component<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { currentPlan: subscriptionTypes.ISubscriptionPackages; price: string; id: string; value: string; title: string; description: string }> {
	render() {
		const { currentPlan, price, id, value, title, description, ...props } = this.props;

		return (
			currentPlan && (
				<label htmlFor={id} className={`flex cursor-pointer items-center justify-between rounded-lg p-4 text-sm text-gray-700 ring-1 ring-[#ff9b01] transition-all ${currentPlan.code === value ? 'bg-[#ff9b0133]' : 'bg-[white] ring-gray-200'}`}>
					<div className='flex flex-col'>
						<div className='flex items-center space-x-1'>
							<span className={currentPlan.code === value ? 'text-black' : 'ring-primary bg-primary/20'}>{title}</span>
							<span className={`text-xs opacity-50 ${currentPlan.code === value ? 'text-black' : 'ring-primary bg-primary/20'}`}>{price}</span>
						</div>
						<p className='opacity-50'>{description}</p>
					</div>

					<input name={id} {...props} className='focus:ring-primary text-primary rounded-full border-gray-500 ring-[0.5px] ring-transparent transition-all focus:border-transparent' />
				</label>
			)
		);
	}
}

class Label extends React.Component<{ relaxed?: boolean; htmlFor?: string; label?: string; terms?: boolean; urls?: accountTypes.IUserProfile['urls']['urls'] }> {
	render() {
		const { label, htmlFor, terms, children, relaxed, urls } = this.props;

		if (terms === true)
			return (
				<label htmlFor='terms' className='flex items-center space-x-2 font-medium'>
					{children}

					<span className='flex items-center justify-center'>
						<div>I agree to the</div>
						<a href={urls?.terms.url} className='text-primary hover:underline ml-1' target='_blank' rel='noreferrer'>
							{urls?.terms.label}
						</a>
					</span>
				</label>
			);

		return (
			<label htmlFor={htmlFor} className={`flex flex-col space-y-1 ${relaxed && 'md:col-span-2'}`}>
				<span className='text-sm font-medium text-gray-700'>{label}</span>
				{children}
			</label>
		);
	}
}

export default Checkout;
