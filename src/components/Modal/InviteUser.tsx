import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { Modal as ModalType } from '../../@types/components';

import { Elements } from '../../components';
import Modal from '../../components/Modal/Modal';

const validationSchema = Yup.object({
	email: Yup.string().required().email('Invalid e-mail address!')
});

class InviteUser extends React.Component<ModalType.InviteUserProps, ModalType.InviteUserStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.CreateWebhookProps) {
		super(props);
		this.modal = React.createRef();
	}

	onSubmit = (values: { email: string }) => {
		this.props.onSubmit(values.email);
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
					initialValues={{ email: '' }}
					validationSchema={validationSchema}
					onSubmit={(values) => {
						this.onSubmit(values);
					}}>
					{({ handleSubmit, handleChange, values, errors }) => (
						<form onSubmit={handleSubmit}>
							<div className='mt-4'>
								<div className='flex items-center justify-between'>
									<Elements.InputLabel label='Email Address' for='email' />
									<div className='text-sm text-bluey-grey'>
										Limit {this.props.membersCount}/{this.props.membersLimit}
									</div>
								</div>
								<Elements.Input onChange={handleChange} value={values.email} type='text' id='email' placeholder='e.g. info@beepy.io' />
								<Elements.FormErrorText error={errors.email} />
							</div>
							<div className='mt-4 flex'>
								<Elements.Button onClick={() => this.hide()} type='button' name='Cancel' color='bg-transparent' className='w-1/2 border border-gray-300 p-2' />
								<Elements.Button type='submit' name={this.props.action ?? 'Invite User'} className='w-1/2 p-2 text-white ml-3' />
							</div>
						</form>
					)}
				</Formik>
			</Modal>
		);
	}
}
export default InviteUser;
