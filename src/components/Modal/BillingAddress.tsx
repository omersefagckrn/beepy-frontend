import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Modal as ModalType } from '../../@types/components';
import { Elements } from '..';

import Modal from './Modal';

const validationSchema = Yup.object({
	address: Yup.string().required('Required'),
	country: Yup.string().required('Required'),
	city: Yup.string().required('Required'),
	state: Yup.string(),
	zipcode: Yup.string().required('Required')
});

class BillingAddress extends React.Component<ModalType.BillingAddressProps, ModalType.BillingAddressStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.BillingAddressProps) {
		super(props);
		this.modal = React.createRef();
	}

	onSubmit = (values: { address: string; country: string; city: string; state: string; zipcode: string }) => {
		this.props.onSubmit(values);
		this.modal.current?.hide();
	};

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();

	render() {
		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full sm:w-[30rem]' title={this.props.title} description={this.props.description}>
				<div className='h-[30rem] md:h-auto'>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{ address: this.props.currentAddress?.address ?? '', country: this.props.currentAddress?.country ?? '', city: this.props.currentAddress?.city ?? '', state: this.props.currentAddress?.state ?? '', zipcode: this.props.currentAddress?.zipcode ?? '' }}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							this.onSubmit(values);
						}}>
						{({ handleSubmit, handleChange, values, errors }) => (
							<div>
								<form onSubmit={handleSubmit}>
									<div>
										<div className='text-xl font-semibold'>Billing Address</div>
									</div>
									<div>
										<div className='mt-4'>
											<Elements.InputLabel for='country' label='Country' />
											<Elements.Select onChange={handleChange} value={values.country} id='country'>
												<option disabled>Choose country</option>
												{this.props.countries.map((country, index) => {
													return (
														<option key={index} value={country.code}>
															{country.value}
														</option>
													);
												})}
											</Elements.Select>
											<Elements.FormErrorText error={errors.country} />
										</div>
										<div className='flex flex-col sm:grid sm:grid-cols-2 space-y-4'>
											<div className='grid sm:pr-2 sm:block mt-4'>
												<Elements.InputLabel for='city' label='City' />
												<Elements.Input onChange={handleChange} value={values.city} id='city' placeholder='e.g. New York City' />
												<Elements.FormErrorText error={errors.city} />
											</div>
											<div className='grid sm:pl-2 sm:block mt-4'>
												<Elements.InputLabel for='state' label='State/Province' />
												<Elements.Input onChange={handleChange} value={values.state} id='state' placeholder='e.g. New York' />
												<Elements.FormErrorText error={errors.state} />
											</div>
										</div>
										<div className='mt-4'>
											<Elements.InputLabel for='address' label='Address' />
											<Elements.Textarea onChange={handleChange} value={values.address} id='address' placeholder='e.g. 123 Main St' />
											<Elements.FormErrorText error={errors.address} />
										</div>
										<div className='mt-4'>
											<Elements.InputLabel for='zipcode' label='Zipcode' />
											<Elements.Input onChange={handleChange} value={values.zipcode} id='zipcode' placeholder='e.g. 123456' />
											<Elements.FormErrorText error={errors.zipcode} />
										</div>
										<div className='flex mt-4'>
											<Elements.Button onClick={this.hide} type='button' name='Cancel' color='bg-transparent' className='w-1/2 border border-gray-300 p-2' />
											<Elements.Button name={this.props.currentAddress?.country ? 'Edit' : 'Add'} type='submit' className='w-1/2 p-2 text-white ml-3' />
										</div>
									</div>
								</form>
							</div>
						)}
					</Formik>
				</div>
			</Modal>
		);
	}
}
export default BillingAddress;
