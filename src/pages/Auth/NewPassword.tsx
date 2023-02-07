import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

import AuthSection from '../../components/Auth/AuthSection';

import { ReactComponent as NewPasswordImage } from '../../assets/forgot-password.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { Elements } from '../../components';
import { alert, router } from '../../helpers';

import { NewPasswordProps, NewPasswordStates } from '../../@types/pages/Auth';
import { connect, ConnectedProps } from 'react-redux';
import { authActions } from '../../actions';
import { RootState } from '../../store';
import { authTypes } from '../../@types/reducers';
import PasswordSuccess from './PasswordSuccess';

const validationSchema = Yup.object({
	newPassword: Yup.string().required('Required').min(8, 'You must enter a minimum of 8 characters.'),
	confirmPassword: Yup.string()
		.required('Required')
		.min(8, 'You must enter a minimum of 8 characters.')
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

class NewPassword extends React.Component<NewPasswordProps & ConnectedProps<typeof connector>, NewPasswordStates> {
	state: NewPasswordStates = {
		status: false,
		email: '',
		password: ''
	};

	componentDidUpdate(prevProps: NewPasswordProps & ConnectedProps<typeof connector>) {
		if (prevProps.newPassword !== this.props.newPassword && !this.props.newPassword.isLoading) {
			alert.fire({
				message: this.props.newPassword.error ? (this.props.newPassword.data as unknown as any).message : 'Password changed!',
				error: this.props.newPassword.error
			});

			if (!this.props.newPassword.error) this.setState({ status: true });
		}
	}

	onSubmit = (values: { newPassword: string; confirmPassword: string }) => {
		const query = new URLSearchParams(this.props.location.search);
		const accessToken = query.get('access');
		const email = query.get('email');

		this.setState({ email: email as string, password: values.newPassword });
		this.props.resetPassword({ password: values.newPassword, password_confirmation: values.confirmPassword, access: accessToken as string, email: email as string });
	};

	render() {
		return (
			<>
				{!this.state.status ? (
					<AuthSection title='New Password | Beepy' footerType='newPassword'>
						<div className='my-auto mx-auto flex w-80 flex-col justify-center pt-8 md:justify-start'>
							<div className='flex items-center justify-center flex-col text-center'>
								<NewPasswordImage className='w-80' />
								<div className='text-dark-grey-blue text-3xl font-semibold'>Set new password</div>
								<div className='text-bluey-grey py-3 font-light'>Your new password must be different to previously used password.</div>
							</div>
							<Formik
								validateOnBlur={false}
								validateOnChange={false}
								initialValues={{ newPassword: '', confirmPassword: '' }}
								validationSchema={validationSchema}
								onSubmit={(values) => {
									this.onSubmit(values);
								}}>
								{({ handleSubmit, handleChange, values, errors }) => (
									<form onSubmit={handleSubmit} className='flex flex-col'>
										<div className='flex flex-col pt-5'>
											<Elements.InputLabel for='email' label='Password' />
											<Elements.Input autoComplete='off' id='newPassword' type='password' value={values.newPassword} onChange={handleChange} placeholder='New password' />
											<Elements.FormErrorText error={errors.newPassword} />
										</div>
										<div className='flex flex-col pt-5'>
											<Elements.InputLabel for='password' label='Confirm password' />
											<Elements.Input autoComplete='off' id='confirmPassword' type='password' value={values.confirmPassword} onChange={handleChange} placeholder='Confirm password' />
											<Elements.FormErrorText error={errors.confirmPassword} />
										</div>
										<Elements.Button loading={this.props.newPassword.isLoading} name='Change Password' className='mt-4 text-white p-2' type='submit' />
									</form>
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
					// @ts-ignore
					<PasswordSuccess email={this.state.email} password={this.state.password} />
				)}
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	newPassword: state.auth.resetPassword
});

const mapDispatch = {
	resetPassword: ({ access, email, password, password_confirmation }: authTypes.ResetPasswordRequest) => authActions.resetPasswordAction({ access, email, password, password_confirmation })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(NewPassword));
