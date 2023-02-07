import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Modal as ModalType } from '../../@types/components';

import { Elements } from '../../components';
import Modal from '../../components/Modal/Modal';

const validationSchema = Yup.object({
	password: Yup.string().required()
});

class SubscriptionCancellation extends React.Component<ModalType.SubscriptionCancellationProps, ModalType.SubscriptionCancellationStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.SubscriptionCancellationProps) {
		super(props);
		this.modal = React.createRef();
	}

	onSubmit = (values: { password: string }) => {
		this.props.onSubmit(values.password);
		this.modal.current?.hide();
	};

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();

	render() {
		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full sm:w-[28rem]' title={this.props.title} description={this.props.description}>
				<Formik
					validateOnBlur={false}
					validateOnChange={false}
					initialValues={{ password: '' }}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						this.onSubmit(values);
					}}>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit} className='flex flex-col pt-5'>
							<Elements.InputLabel for='password' label='Password' />
							<Elements.Input value={values.password} onChange={handleChange} type='password' id='password' placeholder='Password' />
							<Elements.FormErrorText error={errors.password} />
							<div className='mt-4 flex'>
								<Elements.Button onClick={() => this.hide()} type='button' name='Cancel' color='bg-transparent' className='w-1/2 border border-gray-300 p-2' />
								<Elements.Button type='submit' name={this.props.action ?? 'Cancel Subscription'} className='w-1/2 p-2 text-white ml-3' />
							</div>
						</form>
					)}
				</Formik>
			</Modal>
		);
	}
}
export default SubscriptionCancellation;
