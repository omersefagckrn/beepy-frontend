import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import { Tooltip } from '@mui/material';
// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { accountTypes, authTypes, subscriptionTypes } from '../../@types/reducers';
import { ProfileTypes } from '../../@types/pages';

import { RootState } from '../../store';
import { accountActions, authActions, subscriptionActions } from '../../actions';
import { alert, modal } from '../../helpers';
import { Elements as Element } from '../../components';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import { ReactComponent as Check } from '../../assets/check-icon.svg';
import arrowUpRight from '../../assets/arrow-up-right.svg';

import Card from '../../components/Payment/Card';
import BillingAddress from '../../components/Modal/BillingAddress';
import AddPaymentMethod from '../../components/Modal/AddPaymentMethod';
import SubscriptionCancellation from '../../components/Modal/SubscriptionCancellation';
import Warning from '../../components/Modal/Warning';
import ChangePlan from '../../components/Modal/ChangePlan';

import { ReactComponent as PdfImage } from '../../assets/pdf-image.svg';
import Checkout from '../../components/Modal/Checkout';

const stripePromise = loadStripe((process.env.REACT_APP_ENV === 'production' ? process.env.REACT_APP_STRIPE_PROD_KEY : process.env.REACT_APP_STRIPE_DEV_KEY) as string);

class ProfileSubscription extends React.Component<ProfileTypes.ProfileSubscriptionProps & ConnectedProps<typeof connector>, ProfileTypes.ProfileSubscriptionStates> {
	billingAddressModal: React.RefObject<BillingAddress>;
	addPaymentMethodModal: React.RefObject<AddPaymentMethod>;
	subscriptionCancellationModal: React.RefObject<SubscriptionCancellation>;
	changePlanModal: React.RefObject<ChangePlan>;
	checkoutModal: React.RefObject<Checkout>;

	constructor(props: ProfileTypes.ProfileSubscriptionProps & ConnectedProps<typeof connector>) {
		super(props);
		this.billingAddressModal = React.createRef<BillingAddress>();
		this.addPaymentMethodModal = React.createRef<AddPaymentMethod>();
		this.subscriptionCancellationModal = React.createRef<SubscriptionCancellation>();
		this.changePlanModal = React.createRef<ChangePlan>();
		this.checkoutModal = React.createRef<Checkout>();
	}

	state: ProfileTypes.ProfileSubscriptionStates = {
		subscription: null,
		invoices: null,
		paymentMethods: null,
		user: null,
		selectedPlan: null
	};

	componentDidMount() {
		this.props.getProfile();
		this.props.getSubscription();
		this.props.getInvoices();
		this.props.getPaymentMethods();
		this.props.getCountries();
		this.props.getPackages();
	}

	format = (value: number) => {
		return new Intl.NumberFormat(navigator.language, { maximumSignificantDigits: 3 }).format(value);
	};

	loading = () => {
		return (
			<div className='flex items-center justify-center'>
				<CgSpinner className='animate-spin w-8 h-8 self-center' />
			</div>
		);
	};

	componentDidUpdate(prevProps: ProfileTypes.ProfileSubscriptionStates & ConnectedProps<typeof connector>) {
		if (prevProps.user !== this.props.user && !this.props.user.isLoading && !this.props.user.error && this.props.user.success) {
			this.setState({
				user: this.props.user.data as accountTypes.IUserProfile
			});
		}

		if (prevProps.subscription !== this.props.subscription && !this.props.subscription.isLoading && !this.props.subscription.error && this.props.subscription.success) {
			this.setState({
				subscription: this.props.subscription.data as accountTypes.IUserSubscriptionResponse
			});
		}

		if (prevProps.invoices !== this.props.invoices && !this.props.invoices.isLoading && !this.props.invoices.error && this.props.invoices.success) {
			this.setState({
				invoices: this.props.invoices.data as accountTypes.IUserInvoices[]
			});
		}

		if (prevProps.paymentMethods !== this.props.paymentMethods && !this.props.paymentMethods.isLoading && !this.props.paymentMethods.error && this.props.paymentMethods.success) {
			this.setState({
				paymentMethods: this.props.paymentMethods.data as accountTypes.IPaymentMethods[]
			});
		}

		if (prevProps.resumedSubscription !== this.props.resumedSubscription && !this.props.resumedSubscription.isLoading) {
			this.props.getSubscription();
			this.props.getInvoices();

			alert.fire({
				message: this.props.resumedSubscription.error ? (this.props.resumedSubscription.data as unknown as any).message : 'Subscription resumed successfully!',
				error: this.props.resumedSubscription.error
			});
		}

		if (prevProps.cancelledSubscription !== this.props.cancelledSubscription && !this.props.cancelledSubscription.isLoading) {
			this.props.getSubscription();
			this.props.getInvoices();

			alert.fire({
				message: this.props.cancelledSubscription.error ? (this.props.cancelledSubscription.data as unknown as any).message : 'Subscription cancelled successfully!',
				error: this.props.cancelledSubscription.error
			});
		}

		if (prevProps.updatedPaymentMethod !== this.props.updatedPaymentMethod && !this.props.updatedPaymentMethod.isLoading) {
			this.props.getPaymentMethods();

			alert.fire({
				message: this.props.updatedPaymentMethod.error ? (this.props.updatedPaymentMethod.data as unknown as any).message : 'Payment method updated successfully!',
				error: this.props.updatedPaymentMethod.error
			});
		}

		if (prevProps.deletedPaymentMethod !== this.props.deletedPaymentMethod && !this.props.deletedPaymentMethod.isLoading) {
			this.props.getPaymentMethods();

			alert.fire({
				message: this.props.deletedPaymentMethod.error ? (this.props.deletedPaymentMethod.data as unknown as any).message : 'Payment method deleted successfully!',
				error: this.props.deletedPaymentMethod.error
			});
		}

		if (prevProps.updatedBillingAddress !== this.props.updatedBillingAddress && !this.props.updatedBillingAddress.isLoading) {
			this.props.getProfile();

			alert.fire({
				message: this.props.updatedBillingAddress.error ? (this.props.updatedBillingAddress.data as unknown as any).message : 'Billing address updated successfully!',
				error: this.props.updatedBillingAddress.error
			});
		}

		if (prevProps.changedSubscription !== this.props.changedSubscription && !this.props.changedSubscription.isLoading) {
			this.props.getSubscription();
			this.props.getInvoices();

			alert.fire({
				message: this.props.changedSubscription.error ? (this.props.changedSubscription.data as unknown as any).message : 'Plan updated successfully!',
				error: this.props.changedSubscription.error
			});

			setTimeout(() => {
				this.props.getPackages();
			}, 1 * 1000);
		}

		if (prevProps.addedPaymentMethod !== this.props.addedPaymentMethod && !this.props.addedPaymentMethod.isLoading) {
			this.props.getPaymentMethods();

			alert.fire({
				message: this.props.addedPaymentMethod.error ? (this.props.addedPaymentMethod.data as unknown as any).message : 'Payment method added successfully!',
				error: this.props.addedPaymentMethod.error
			});
		}

		if (prevProps.createdSubscription !== this.props.createdSubscription) {
			this.checkoutModal.current?.loading(this.props.createdSubscription.isLoading);

			if (!this.props.createdSubscription.isLoading) {
				this.props.getProfile();
				this.props.getSubscription();
				this.props.getInvoices();
				this.props.getPaymentMethods();
				setTimeout(() => {
					this.props.getPackages();
				}, 1 * 1000);

				this.checkoutModal.current?.hide();

				alert.fire({
					message: this.props.createdSubscription.error ? (this.props.createdSubscription.data as unknown as any).message : 'Subscribed successfully!',
					error: this.props.createdSubscription.error
				});
			}
		}
	}

	planDetailDescription = (text: string, photoOrText: string | number | React.SVGProps<SVGSVGElement>) => (
		<div className='m-4 flex items-center justify-between'>
			<div>{text}</div>
			<div>{photoOrText}</div>
		</div>
	);

	render() {
		const { subscription, invoices, paymentMethods, user } = this.state;

		return (
			<>
				{subscription && <SubscriptionCancellation title='Cancel Subscription' description='To cancel your subscription please enter your password' ref={this.subscriptionCancellationModal} onSubmit={(password) => this.props.cancelSubscription({ subscription: subscription?.id, password })} />}
				{subscription && this.props.packages.data && !this.props.packages.isLoading && (
					<ChangePlan
						ref={this.changePlanModal}
						changePlan={(plan, code) => {
							modal.confirmModal({
								title: plan,
								description: 'Are you sure you want to ' + plan.split(' ')[0].toLowerCase() + ' your plan?',
								actionName: plan.split(' ')[0] + ' Plan',
								color: 'bg-primary',
								onClick: () => {
									this.changePlanModal.current?.hide();
									this.props.changeSubscription({ packageCode: code });
								}
							});
						}}
						packages={this.props.packages.data as subscriptionTypes.ISubscriptionPackages[]}
						getStarted={(code) => {
							this.setState({
								selectedPlan: code
							});

							this.changePlanModal.current?.hide();
							this.props.getIntent();
							this.checkoutModal.current?.show();
						}}
					/>
				)}
				{user && subscription && this.props.countries && this.props.countries.data && (
					<BillingAddress
						ref={this.billingAddressModal}
						countries={this.props.countries.data as authTypes.ICountry[]}
						currentAddress={{ address: user.billing_address?.address, country: user.billing_address?.country, city: user.billing_address?.city, state: user.billing_address?.state, zipcode: user.billing_address?.zip_code }}
						onSubmit={({ address, country, city, state, zipcode }) => this.props.updateBillingAddress({ address, country, city, state, zipcode })}
					/>
				)}
				<AddPaymentMethod
					ref={this.addPaymentMethodModal}
					title='Add Payment Method'
					description='Please enter your card details for adding payment method'
					stripe={stripePromise}
					getIntent={() => this.props.getIntent()}
					intent={this.props.intent.data ? (this.props.intent.data as subscriptionTypes.ISubscriptionIntent).secret : ''}
					onSubmit={(payment_method) => this.props.addPaymentMethod({ payment_method })}
				/>
				{this.props.packages.data && !this.props.packages.isLoading && this.props.user.data && (
					<Checkout
						ref={this.checkoutModal}
						title='Checkout'
						stripe={stripePromise}
						getIntent={() => this.props.getIntent()}
						intent={(this.props.intent && (this.props.intent.data as subscriptionTypes.ISubscriptionIntent)) ?? null}
						// @ts-ignore
						selectedPlan={this.props.packages.data.find((plan) => plan.code === this.state.selectedPlan)}
						user={this.props.user.data as accountTypes.IUserProfile}
						editAddress={() => this.billingAddressModal.current?.show()}
						pay={(payment_method) => {
							this.props.createSubscription({ payment_method, _package: this.state.selectedPlan as string });
							//this.checkoutModal.current?.hide();
						}}
						changePlan={() => {
							this.checkoutModal.current?.hide();
							this.changePlanModal.current?.show();
						}}
					/>
				)}

				<div className='text-bluey-grey mt-4'>
					{user && !user.billing_address && (
						<div className='mb-4'>
							<Warning
								message={
									<>
										Please add your billing address before checkout.{' '}
										<span className='underline' onClick={() => this.billingAddressModal.current?.show()}>
											Click here
										</span>{' '}
										to add your billing address.
									</>
								}
							/>
						</div>
					)}
					<Element.SideDescription type='title' title='Subscription' description='Manage your billing and payment details.' />

					{/* Plan Details */}
					<section className='mt-6 items-start border-b gray-400 md:flex md:space-x-16'>
						<Element.SideDescription title='Plan Details' description='Check your plan, upgrade or downgrade, cancel or switch billing frequency.' />

						<div className={`xxs:mt-2 gray-400 mb-4 rounded-lg ${subscription && 'border'} md:mt-0 md:w-3/5`}>
							{subscription ? (
								<>
									<div className='m-4 flex items-start justify-between'>
										<div className='flex flex-col items-start justify-start space-y-2'>
											<div className='text-[1.5rem] font-normal text-[#1e2b3b]'>{subscription.package.name}</div>
											<div>
												{subscription.renewal_date && <div className='text-sm md:text-md px-2 text-center rounded-full bg-gray-300 font-normal text-[#1e2b3b]'>Renewal date {new Date(subscription.renewal_date * 1000).toLocaleDateString()}</div>}
												{subscription.end_date && <div className='text-sm md:text-md px-2 text-center rounded-full bg-red-300 font-normal text-[#1e2b3b]'>End date {new Date(subscription.end_date * 1000).toLocaleDateString()}</div>}
											</div>
										</div>
										<div className='text-md font-normal text-[#667085]'>
											<div className='flex items-center justify-start'>
												<div className='ml-4 flex items-center justify-center rounded-full px-2 py-1 text-xs'>
													<div className='flex flex-col'>
														<div className='text-xl sm:text-3xl font-bold text-[#344054]'>${subscription.package.price}</div>
														<div className='text-bluey-grey text-sm font-normal'>per month</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='m-4 mb-4 flex items-start justify-start'>
										<div className='text-[1rem] font-normal text-[#8290b0]'>{subscription.package.desciprtion}</div>
									</div>
									<div className='gray-400 mx-4 border-[0.5px]'></div>
									<div className='text-[#667085]'>
										{this.planDetailDescription('Channel', subscription.package.features.channel_max > 0 ? this.format(subscription.package.features.channel_max) : '-')}
										{this.planDetailDescription('Members', subscription.package.features.members_max_per_channel > 0 ? this.format(subscription.package.features.members_max_per_channel) : '-')}
										{this.planDetailDescription('Notifications', subscription.package.features.notification_limit > 0 ? this.format(subscription.package.features.notification_limit) : '-')}
										{this.planDetailDescription('API Services', subscription.package.features.api_services ? <Check className='w-[1rem]' /> : '-')}
										{this.planDetailDescription('API Rate Limit', subscription.package.features.api_rate_limit_request > 0 ? this.format(subscription.package.features.api_rate_limit_request) : '-')}
										{this.planDetailDescription('Multiple Device', subscription.package.features.multiple_device ? <Check className='w-[1rem]' /> : '-')}
										{this.planDetailDescription('Multiple Device Limit', subscription.package.features.multiple_device_limit > 0 ? subscription.package.features.multiple_device_limit : '-')}
										{this.planDetailDescription('Whitelist Limit', subscription.package.features.ip_whitelist_limit > 0 ? subscription.package.features.ip_whitelist_limit : '-')}
										{this.planDetailDescription('Webhooks', subscription.package.features.webhooks_limit > 0 ? subscription.package.features.webhooks_limit : '-')}
									</div>
									<div className='gray-400 mx-4 mb-2 mt-2 border-[0.5px]'></div>
									<div className='m-4 mt-4 flex flex-col space-y-3'>
										<span className='text-primary flex items-center justify-between text-sm font-semibold text-black/70'>
											<div className='text-sm text-[#1e2b3b]'>
												{subscription.current_channels} of {subscription.package.features.channel_max} channels
											</div>
											{!subscription.end_date && user?.billing_address?.country && !this.props.changedSubscription.isLoading && !this.props.createdSubscription.isLoading && !this.props.subscription.isLoading && !this.props.resumedSubscription.isLoading && !this.props.cancelledSubscription.isLoading && (
												<div className='cursor-pointer'>
													<div onClick={() => this.changePlanModal.current?.show()} className='text-primary flex items-center justify-center'>
														Change Plan <img src={arrowUpRight} alt={''} />
													</div>
												</div>
											)}
										</span>
										{subscription && subscription.package.features.channel_max > 0 && subscription.current_channels >= 0 && (
											<div className='h-2.5 w-full rounded-full bg-gray-200'>
												<div className={`h-2.5 rounded-full bg-[#1e2b3b]`} style={{ width: `${Number((100 / subscription.package.features.channel_max) * subscription.current_channels).toFixed(2)}%` }}></div>
											</div>
										)}
									</div>
									{subscription.code !== 'FREE' &&
										(!subscription.end_date ? (
											<>
												<div className='gray-400 mx-4 mb-2 mt-2 border-[0.5px]'></div>
												<div className='m-4 mt-4 flex flex-col space-y-3'>
													<span className='flex items-center justify-between text-sm font-semibold'>
														<div className='relative text-sm text-gray-400 pb-6'>
															If you cancel your current subscription, your plan will be downgraded to Free package plan and it's features. Your current channels will be Disabled and you will not receive any notifications from your integrations unless you change your plan to any
															paid plan back to activate your channels to keep receiving notifications.
															<button
																disabled={this.props.cancelledSubscription.isLoading || this.props.subscription.isLoading || this.props.resumedSubscription.isLoading}
																onClick={() => this.subscriptionCancellationModal.current?.show()}
																className='absolute right-0 font-sm font-semibold pt-2 text-red-500 flex items-center justify-center'>
																Cancel Plan
															</button>
														</div>
													</span>
												</div>
											</>
										) : (
											<>
												<div className='gray-400 mx-4 mb-2 mt-2 border-[0.5px]'></div>
												<div className='m-4 mt-4 flex flex-col space-y-3'>
													<span className='flex items-center justify-between text-sm font-semibold'>
														<div className='relative text-sm text-gray-400 pb-6'>
															Your plan will be downgraded to Free package plan and it's features. Your current channels will be Disabled and you will not receive any notifications from your integrations unless you change your plan to any paid plan back to activate your channels
															to keep receiving notifications.
															<button
																disabled={this.props.cancelledSubscription.isLoading || this.props.subscription.isLoading || this.props.resumedSubscription.isLoading}
																onClick={() =>
																	modal.confirmModal({
																		title: 'Resume Subscription',
																		description: 'Are you sure you want to resume your subscription?',
																		actionName: 'Resume',
																		onClick: () => {
																			this.props.resumeSubscription(subscription.id);
																		},
																		color: 'bg-primary'
																	})
																}
																className='absolute right-0 font-sm font-semibold pt-2 text-primary flex items-center justify-center'>
																Resume Plan
															</button>
														</div>
													</span>
												</div>
											</>
										))}
								</>
							) : (
								this.loading
							)}
						</div>
					</section>

					{/* Payment Method */}
					<section className='mt-8 border-b gray-400 md:flex md:space-x-16'>
						<Element.SideDescription title='Payment Method' description='You can see the card information, manage your cards and add new card.' />

						<div className='mt-2 mb-5 space-y-6 md:mt-0 md:w-3/5'>
							{paymentMethods && paymentMethods.length > 0 ? (
								paymentMethods.map((card, index) => (
									<Card
										key={index}
										index={index}
										card={card}
										onDelete={(id) => {
											modal.confirmModal({
												title: 'Delete Payment Method',
												description: 'Are you sure you want to delete this payment method?',
												actionName: 'Delete',
												onClick: () => {
													this.props.deletePaymentMethod(id);
												},
												color: 'bg-red-600'
											});
										}}
										onSelect={(id) => {
											modal.confirmModal({
												title: 'Change Payment Method',
												description: 'Are you sure you want to change your payment method?',
												actionName: 'Change',
												onClick: () => {
													this.props.setAsPrimaryCard(id);
												},
												color: 'bg-primary'
											});
										}}
									/>
								))
							) : this.props.paymentMethods.isLoading ? (
								<section className='flex flex-col items-center justify-center'>{this.loading}</section>
							) : (
								<div className='text-bluey-grey'>No cards added yet.</div>
							)}
							{subscription && subscription.code !== 'FREE' && (
								<div className='flex cursor-pointer items-center justify-start'>
									<Plus stroke='gray' />
									<div
										className='text-md ml-1 select-none'
										onClick={() => {
											this.props.getIntent();
											this.addPaymentMethodModal.current?.show();
										}}>
										Add Card
									</div>
								</div>
							)}
						</div>
					</section>

					{/* Billing Address */}
					<section className='mt-6 mb-2 items-start border-b gray-400 md:flex md:space-x-16'>
						<Element.SideDescription title='Billing Address' description='Add your billing address information.' />

						{/* Address Card */}
						<div className='space-y-6 md:w-3/5 mt-4 sm:mt-0'>
							<div className='xxs:flex-col flex items-start justify-start'>
								{user && user.billing_address ? (
									<>
										<div className='mb-5 flex w-full items-start rounded-lg p-5 leading-tight text-gray-700 ring-[1px] ring-gray-200'>
											<div className='flex flex-grow flex-col items-start'>
												<span className='font-semibold'>Billing Address</span>
												<span>
													{user.billing_address.address} <br /> {user.billing_address.city} {user.billing_address.state}
												</span>
												<span className='mt-1 opacity-50'>
													{user.billing_address.country} - {user.billing_address.zip_code}
												</span>
											</div>
											<button onClick={() => this.billingAddressModal.current?.show()} className='select-none rounded-md px-4 py-2 font-medium ring-1 ring-gray-200 transition-colors hover:bg-gray-100'>
												Edit
											</button>
										</div>
									</>
								) : (
									<span>
										Please create a billing address.{' '}
										<span onClick={() => this.billingAddressModal.current?.show()} className='text-primary cursor-pointer underline'>
											Please click to create.
										</span>
									</span>
								)}
							</div>
						</div>
					</section>
					{/* Payment History */}
					<section className='mt-6 md:flex items-start md:space-x-16'>
						<Element.SideDescription title='Payment History' description='You can check your payments and plans.' />
						<div className='mt-4 sm:mt-0 md:w-3/5'>
							{invoices ? (
								<>
									<div className='sm:hidden border rounded-lg'>
										<table className='w-full'>
											<tbody>
												<tr className='select-none bg-gray-100 text-xs sm:text-sm font-medium text-battleship-grey'>
													<td className='px-5 p-3 sm:p-5'>Date</td>
													<td>Amount</td>
													<td>Status</td>
													<td></td>
												</tr>
											</tbody>
											{invoices.length > 0 &&
												invoices.map((invoice, index) => (
													<tbody key={index}>
														<tr className={`${index !== invoices.length - 1 && 'border-b'} text-xs font-medium sm:text-sm text-battleship-grey`}>
															<td className='p-5'>{invoice.created}</td>
															<td>{invoice.amount}</td>
															<td>
																{invoice.status === 'Paid' ? (
																	<span className='rounded-2xl select-none text-xs px-2 py-1 text-[#027a48] bg-green-400/20'>Paid</span>
																) : (
																	<span className='rounded-2xl select-none text-xs px-2 py-1 bg-red-400/20 text-red-600'>{invoice.status}</span>
																)}
															</td>
															<td className='sm:pr-5 transition-colors hover:text-gray-700'>
																{invoice.pdf && (
																	<a href={invoice.pdf} target='_blank' rel='noreferrer'>
																		<Tooltip title='Download PDF' placement='bottom' arrow>
																			<PdfImage strokeWidth={2} className='h-6 w-6' />
																		</Tooltip>
																	</a>
																)}
															</td>
														</tr>
													</tbody>
												))}
										</table>
									</div>

									<div className='hidden sm:block border rounded-lg'>
										<table className='w-full'>
											<tbody>
												<tr className='select-none bg-gray-100 text-xs sm:text-sm font-medium text-battleship-grey'>
													<td className='sm:px-5 p-3 sm:p-5'>Date</td>
													<td>Plan</td>
													<td>Amount</td>
													<td>Reason</td>
													<td>Status</td>
													<td></td>
												</tr>
											</tbody>
											{invoices.length > 0 &&
												invoices.map((invoice, index) => (
													<tbody key={index}>
														<tr className={`${index !== invoices.length - 1 && 'border-b'} text-xs font-medium sm:text-sm text-battleship-grey`}>
															<td className='p-5'>{invoice.created}</td>
															<td>{invoice.plan}</td>
															<td>{invoice.amount}</td>
															<td>{invoice.reason}</td>
															<td>
																{invoice.status === 'Paid' ? (
																	<span className='rounded-2xl select-none text-xs px-2 py-1 text-[#027a48] bg-green-400/20'>Paid</span>
																) : (
																	<span className='rounded-2xl select-none text-xs px-2 py-1 bg-red-400/20 text-red-600'>{invoice.status}</span>
																)}
															</td>
															<td className='sm:pr-5 transition-colors hover:text-gray-700'>
																{invoice.pdf && (
																	<a href={invoice.pdf} target='_blank' rel='noreferrer'>
																		<Tooltip title='Download PDF' placement='bottom' arrow>
																			<PdfImage strokeWidth={2} className='h-6 w-6' />
																		</Tooltip>
																	</a>
																)}
															</td>
														</tr>
													</tbody>
												))}
										</table>
									</div>
								</>
							) : (
								this.loading
							)}
						</div>
					</section>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	countries: state.auth.countries,
	user: state.account.userProfile,

	invoices: state.account.userInvoices,
	paymentMethods: state.account.paymentMethods,
	subscription: state.account.userSubscription,
	packages: state.subscription.packages,

	resumedSubscription: state.account.subscriptionResume,
	cancelledSubscription: state.account.subscriptionCancel,
	changedSubscription: state.account.changeSubscription,

	updatedBillingAddress: state.account.updateBillingAddress,

	addedPaymentMethod: state.account.addPaymentMethod,
	updatedPaymentMethod: state.account.setPrimaryMethod,
	deletedPaymentMethod: state.account.deletePaymentMethod,

	createdSubscription: state.subscription.createSubscription,

	intent: state.subscription.subscriptionIntent
});

const mapDispatch = {
	getCountries: () => authActions.listCountriesAction(),
	getProfile: () => accountActions.userProfileAction(),

	getSubscription: () => accountActions.userSubscriptionAction(),
	getInvoices: () => accountActions.userInvoicesAction(),
	getPaymentMethods: () => accountActions.paymentMethodsAction(),
	getPackages: () => subscriptionActions.subscriptionPackagesAction(),

	changeSubscription: ({ packageCode }: accountTypes.IChangeSubscriptionRequest) => accountActions.changeSubscriptionAction({ packageCode }),
	resumeSubscription: (id: string) => accountActions.userSubscriptionResumeAction({ subscription: id }),
	cancelSubscription: ({ subscription, password }: { subscription: string; password: string }) => accountActions.subscriptionCancelAction({ subscription, password }),

	updateBillingAddress: ({ address, country, city, state, zipcode }: accountTypes.IUpdateBillingAddressRequest) => accountActions.updateBillingAddressAction({ address, country, city, state, zipcode }),

	addPaymentMethod: (paymentMethod: accountTypes.IAddPaymentMethodsRequest) => accountActions.addPaymentMethodsAction(paymentMethod),
	setAsPrimaryCard: (id: string) => accountActions.setPrimaryPaymentMethodsAction({ payment_method: id }),
	deletePaymentMethod: (id: string) => accountActions.deletePaymentMethodsAction({ payment_method: id }),

	createSubscription: ({ _package, payment_method }: subscriptionTypes.ICreateSubscriptionRequest) => subscriptionActions.createSubscriptionAction({ _package, payment_method }),

	getIntent: () => subscriptionActions.subscriptionIntentAction()
};

const connector = connect(mapState, mapDispatch);
export default connector(ProfileSubscription);
