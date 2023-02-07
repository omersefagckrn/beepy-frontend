import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Modal as ModalType } from '../../@types/components';

import { Elements } from '../../components';
import Modal from '../../components/Modal/Modal';

const webhookValidation = Yup.object({
	webhookName: Yup.string().required('Required')
});

class CreateWebhook extends React.Component<ModalType.CreateWebhookProps, ModalType.CreateWebhookStates> {
	modal: React.RefObject<Modal>;

	constructor(props: ModalType.CreateWebhookProps) {
		super(props);
		this.modal = React.createRef();
	}

	onSubmit = (values: { webhookName: string }) => {
		this.props.onSubmit(values.webhookName);
		this.modal.current?.hide();
	};

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();

	render() {
		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full sm:w-[28rem]' title={this.props.title} description={this.props.description}>
				<div className='mt-4'>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{ webhookName: '' }}
						validationSchema={webhookValidation}
						onSubmit={(values) => {
							this.onSubmit(values);
						}}>
						{({ handleSubmit, handleChange, values, errors }) => (
							<>
								<form className='flex flex-col' onSubmit={handleSubmit}>
									<div className='mb-2 flex flex-col'>
										<div className='text-slate-blue flex select-none items-center justify-between text-sm'>
											<Elements.InputLabel for='label' label='Label' />
											<div>
												Webhook Limit {this.props.webhooksCount}/{this.props.webhookLimit}
											</div>
										</div>
										<Elements.Input onChange={handleChange} value={values.webhookName} id='webhookName' placeholder='e.g. AWS CloudWatch' />
										<Elements.FormErrorText error={errors.webhookName} />
									</div>
									<div className='mt-4 flex'>
										<Elements.Button onClick={() => this.hide()} type='button' name='Cancel' color='bg-transparent' className='w-1/2 border border-gray-300 p-2' />
										<Elements.Button type='submit' name={this.props.action ?? 'Create Webhook'} className='w-1/2 p-2 text-white ml-3' />
									</div>
								</form>
							</>
						)}
					</Formik>
				</div>
			</Modal>
		);
	}
}
export default CreateWebhook;
