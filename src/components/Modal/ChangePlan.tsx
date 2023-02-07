import React from 'react';

import { Modal as ModalType } from '../../@types/components';

import Modal from '../../components/Modal/Modal';

import { ReactComponent as Close } from '../../assets/x.svg';
import Check from '../../assets/check-icon.svg';

const getCurrencySymbol = (currency: string) => (0).toLocaleString(navigator.language, { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim();
class ChangePlan extends React.Component<ModalType.ChangePlanProps, ModalType.ChangePlanStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.ChangePlanProps) {
		super(props);
		this.modal = React.createRef();
	}

	state: ModalType.ChangePlanStates = {
		packages: this.props.packages
	};

	componentDidUpdate(prevProps: ModalType.ChangePlanProps) {
		if (prevProps.packages !== this.state.packages) {
			this.setState({
				packages: this.state.packages
			});
		}
	}

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();

	planDescription = (title: string, description: string | number | boolean) => (
		<div className='m-4 text-[#667085] flex items-center justify-between'>
			<div>{title}</div>
			<div>{typeof description === 'string' || typeof description === 'number' ? description : description ? <img className='h-auto w-[1rem]' src={Check} alt={''} /> : '-'}</div>
		</div>
	);

	render() {
		if (!this.state.packages || this.state.packages.length === 0) return null;

		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full md:w-[88rem]' title={this.props.title} description={this.props.description}>
				<div className='h-[35rem] md:h-auto'>
					<div className='flex items-center justify-evenly'>
						<div className='flex flex-1 items-center justify-center'>
							<div className='text-primary text-4xl'>Pricing</div>
						</div>
						<Close className='cursor-pointer' onClick={() => this.hide()} />
					</div>
					<div className='flex items-center justify-center'>
						<div className='text-4xl font-semibold text-[#1e2b3b]'>Choose Your Plan</div>
					</div>
					{/*  */}
					<div className='content-center md:grid md:grid-cols-3 mt-2'>
						{this.state.packages.map((_package, index) => {
							if (_package.code === 'FREE') return null;

							return (
								<div key={index}>
									<div className='w-full rounded-lg border gray-400 shadow-lg md:max-w-md mb-2'>
										<div className='m-4 flex items-start justify-between'>
											<div className='text-md text-[#667085]'>{_package.name}</div>
											{_package.current && <div className='text-primary text-md ml-4 rounded-full bg-[#ff9b01] bg-opacity-10 px-2 py-1 text-xs'>Current</div>}
										</div>

										<div className='m-4'>
											<div className='flex items-end'>
												<span className='text-6xl font-bold text-[#101828]'>
													{getCurrencySymbol(_package.currency)}
													{_package.price}
												</span>
												<div className='text-[#667085] text-[1rem] font-[500] mb-1'>per month</div>
											</div>
										</div>

										<div className='m-4'>
											<div className='text-[#8290b0]'>{_package.description}</div>
											{_package.current === true ? (
												<div className='flex w-full cursor-not-allowed items-center justify-center rounded-lg border-[1px] border-[#d0d5dd] text-[1rem] text-[#344054]'>
													<div className='my-2'>Current Plan</div>
												</div>
											) : this.state.packages.find((p) => p.code === 'FREE')?.current ? (
												<button onClick={() => this.props.getStarted(_package.code)} className='bg-primary flex w-full items-center justify-center rounded-lg border-[1px] border-[#d0d5dd] text-[1rem] text-white'>
													<div className='my-2'>Get Started</div>
												</button>
											) : (
												this.state.packages.map((_plan, _index) => {
													return (
														(this.state.packages[index + _index] && this.state.packages[index + _index].current === true && (
															<button
																key={_index}
																onClick={() => {
																	this.props.changePlan('Downgrade to ' + _package.name, _package.code);
																}}
																className='text-primary flex w-full items-center justify-center rounded-lg border-[1px] border-[#d0d5dd] text-[1rem]'>
																<div className='my-2'>Downgrade to {_package.name}</div>
															</button>
														)) ||
														(this.state.packages[index - _index] && this.state.packages[index - _index].current === true && (
															<button
																key={_index}
																onClick={() => {
																	this.props.changePlan('Upgrade to ' + _package.name, _package.code);
																}}
																className='bg-primary flex w-full items-center justify-center rounded-lg border-[1px] border-[#d0d5dd] text-[1rem] text-white'>
																<div className='my-2'>Upgrade to {_package.name}</div>
															</button>
														))
													);
												})
											)}{' '}
										</div>

										<div className='border border-[#eaecf0]'></div>

										<div className='font-semibold m-4 text-[#101828]'>{_package.name}</div>
										{this.planDescription('Channel', _package.features.channel_max)}
										{this.planDescription('Member', _package.features.members_max_per_channel)}
										{this.planDescription('Notifications', _package.features.notification_limit)}
										{this.planDescription('API Services', _package.features.api_services)}
										{this.planDescription('API Rate Limit', _package.features.api_rate_limit_request)}
										{this.planDescription('Multiple Device', _package.features.multiple_device)}
										{this.planDescription('Multiple Device Limit', _package.features.multiple_device_limit)}
										{this.planDescription('Whitelist', _package.features.ip_whitelist_limit)}
										{this.planDescription('Webhooks', _package.features.webhooks_limit)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</Modal>
		);
	}
}
export default ChangePlan;
