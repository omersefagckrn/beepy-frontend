import { Formik, FormikProps } from 'formik';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as Yup from 'yup';

import { ProfileTypes } from '../../@types/pages';
import { accountTypes, authTypes } from '../../@types/reducers';

import { alert } from '../../helpers';
import { RootState } from '../../store';
import { accountActions, authActions } from '../../actions';
import { Elements } from '../../components';

const validationSchema = Yup.object({
	message: Yup.string().required('Required').max(255),
	type: Yup.string().required('Required'),
	subject: Yup.string().required('Required')
});

class ProfileFeedback extends React.Component<ProfileTypes.ProfileFeedbackProps & ConnectedProps<typeof connector>, ProfileTypes.ProfileFeedbackStates> {
	formik: React.RefObject<FormikProps<{ message: string; type: string; subject: string }>>;

	constructor(props: ProfileTypes.ProfileFeedbackProps & ConnectedProps<typeof connector>) {
		super(props);
		this.formik = React.createRef<FormikProps<{ message: string; type: string; subject: string }>>();
	}

	state: ProfileTypes.ProfileFeedbackStates = {
		isLoading: false
	};

	componentDidMount() {
		this.props.getFeedbacks();
	}

	componentDidUpdate(prevProps: ConnectedProps<typeof connector>) {
		if (prevProps.feedback !== this.props.feedback && !this.props.feedback.isLoading) {
			alert.fire({
				message: this.props.feedback.error ? (this.props.feedback.data as unknown as any).message : 'Feedback sent successfully!',
				error: this.props.feedback.error
			});

			this.setState({
				isLoading: false
			});
		}
	}

	onSubmit = (values: { type: string; subject: string; message: string }) => {
		if (!this.state.isLoading) {
			this.formik.current?.resetForm();
			this.setState({ isLoading: true });
			this.props.createFeedback({ type: values.type, subject: values.subject, message: values.message });
		}
	};

	render() {
		return (
			<>
				<Elements.SideDescription type='title' title='Feedback' description='You can share your ideas and well review.' />
				<div className='gap-10 border-gray-400 py-5 sm:flex'>
					<Elements.SideDescription title='Feedback' description='You can write your feedback here.' />

					<div className='xxs:mt-4 sm:basis-3/5 md:mt-0'>
						<Formik
							innerRef={this.formik}
							validateOnBlur={false}
							validateOnChange={false}
							initialValues={{ type: '', subject: '', message: '' }}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								this.onSubmit(values);
							}}>
							{({ handleSubmit, handleChange, values, errors }) => (
								<>
									<form onSubmit={handleSubmit} className='flex flex-col '>
										<div className='flex flex-col pt-5'>
											<Elements.InputLabel for='feedback' label='Type' />
											<Elements.Select value={values.type} onChange={handleChange} id='type'>
												<option value=''>Select feedback type</option>
												{this.props.feedbacks.data &&
													!this.props.feedbacks.isLoading &&
													!this.props.feedbacks.error &&
													Object.entries((this.props.feedbacks.data as authTypes.IFeedbacks).types).map(([key, value]) => (
														<option key={key} value={key}>
															{value}
														</option>
													))}
											</Elements.Select>
											<Elements.FormErrorText error={errors.type} />
										</div>
										<div className='flex flex-col pt-5'>
											<Elements.InputLabel for='subject' label='Subject' />
											<Elements.Select value={values.subject} onChange={handleChange} id='subject'>
												<option value=''>Select feedback subject</option>
												{this.props.feedbacks.data &&
													!this.props.feedbacks.isLoading &&
													!this.props.feedbacks.error &&
													Object.entries((this.props.feedbacks.data as authTypes.IFeedbacks).subjects).map(([key, value]) => (
														<>
															<option key={key} value={key}>
																{value}
															</option>
														</>
													))}
											</Elements.Select>
											<Elements.FormErrorText error={errors.subject} />
										</div>
										<div className='flex flex-col border-b border-gray-400 pt-5'>
											<Elements.Textarea id='message' onChange={handleChange} value={values.message} maxLength={255} rows={4} placeholder='Message' />
											<Elements.FormErrorText error={errors.message} />
											<div className='ml-1 mt-1 mb-5 select-none text-sm text-gray-400'>{255 - values.message.length} characters left</div>
										</div>
										<div className='flex select-none  flex-row-reverse'>
											<Elements.Button loading={this.props.feedback.isLoading} className='mt-8 w-24 p-2 text-white' type='submit' name='Send' />
										</div>
									</form>
								</>
							)}
						</Formik>
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	feedback: state.account.createFeedback,
	feedbacks: state.auth.feedbacks
});

const mapDispatch = {
	createFeedback: ({ type, subject, message }: accountTypes.ICreateFeedBackRequest) => accountActions.createFeedbackAction({ type, subject, message }),
	getFeedbacks: () => authActions.listFeedBacksAction()
};

const connector = connect(mapState, mapDispatch);
export default connector(ProfileFeedback);
