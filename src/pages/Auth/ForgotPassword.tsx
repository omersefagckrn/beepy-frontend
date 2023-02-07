import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import { Elements } from '../../components';
import AuthSection from '../../components/Auth/AuthSection';

import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as ForgotImage } from '../../assets/forgot-password.svg';
import { alert, router } from '../../helpers';
import { connect, ConnectedProps } from 'react-redux';
import { authActions } from '../../actions';
import { RootState } from '../../store';
import { ForgotPasswordProps, ForgotPasswordStates } from '../../@types/pages/Auth';
import CheckMail from './CheckMail';

const validationSchema = Yup.object({
	email: Yup.string().required('Required').email('Invalid e-mail address!')
});

class ForgotPassword extends React.Component<ForgotPasswordProps & ConnectedProps<typeof connector>, ForgotPasswordStates> {
	state: ForgotPasswordStates = {
		email: '',
		emailSent: false
	};

	componentDidUpdate(prevProps: ConnectedProps<typeof connector>) {
		if (prevProps.forgotPassword !== this.props.forgotPassword && !this.props.forgotPassword.isLoading) {
			alert.fire({
				message: this.props.forgotPassword.error ? (this.props.forgotPassword.data as unknown as any).message : 'Reset password link sent!',
				error: this.props.forgotPassword.error
			});

			if (!this.props.forgotPassword.error) this.setState({ emailSent: true });
		}
	}

	onSubmit = (values: { email: string }) => {
		this.setState({ email: values.email });
		this.props.forgotPasswordAction(values);
	};

	render() {
		return !this.state.emailSent ? (
			<AuthSection title='Forgot Password | Beepy' footerType='forgotPassword'>
				<div className='my-auto mx-auto flex w-80 flex-col justify-center pt-8 md:justify-start'>
					<div className='flex items-center justify-center flex-col text-center'>
						<ForgotImage className='w-80' />
						<div className='text-dark-grey-blue text-3xl font-semibold'>Forgot password?</div>
						<div className='text-bluey-grey py-3 font-light'>No worries, we'll send you reset instructions.</div>
					</div>
					<Formik
						validateOnBlur={false}
						validateOnChange={false}
						initialValues={{ email: '' }}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							this.onSubmit(values);
						}}>
						{({ handleSubmit, handleChange, values, errors }) => (
							<>
								<form onSubmit={handleSubmit} className='flex flex-col'>
									<div className='flex flex-col pt-5'>
										<Elements.InputLabel for='email' label='Email' />
										<Elements.Input value={values.email} onChange={handleChange} type='email' id='email' placeholder='Enter your email' />
										<Elements.FormErrorText error={errors.email} />
									</div>
									<Elements.Button loading={this.props.forgotPassword.isLoading} name='Reset password' className='mt-8 text-white p-2' type='submit' />
								</form>
							</>
						)}
					</Formik>
					<div className='flex items-center justify-center pt-8 pb-8 text-sm'>
						<Link to='/login' className='flex flex-row justify-center items-center'>
							<ArrowLeft className='pr-1' />
							<div className='text-sm text-bluey-grey'>Back to log in</div>
						</Link>
					</div>
				</div>
			</AuthSection>
		) : (
			<CheckMail email={this.state.email} />
		);
	}
}

const mapState = (state: RootState) => ({
	forgotPassword: state.auth.forgotPassword
});

const mapDispatch = {
	forgotPasswordAction: ({ email }: { email: string }) => authActions.forgotPasswordAction({ email })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(ForgotPassword));
