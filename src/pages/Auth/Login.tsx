import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';

import { AuthTypes } from '../../@types/pages';

import { RootState } from '../../store';
import { authActions } from '../../actions';
import { alert, router } from '../../helpers';

import AuthSection from '../../components/Auth/AuthSection';
import { Elements } from '../../components';

const validationSchema = Yup.object({
	email: Yup.string().required('Required').email('Invalid e-mail address!'),
	password: Yup.string().required('Required')
});

class Login extends React.Component<AuthTypes.LoginProps & ConnectedProps<typeof connector>, AuthTypes.LoginStates> {
	onSubmit = (values: { email: string; password: string }) => {
		this.props.loginAction(values);
	};

	componentDidUpdate(prevProps: AuthTypes.LoginProps & ConnectedProps<typeof connector>) {
		if (prevProps.login !== this.props.login && !this.props.login.isLoading) {
			alert.fire({
				message: this.props.login.error ? (this.props.login.data as unknown as any).message : 'Login successfully!',
				error: this.props.login.error
			});

			if (!this.props.login.error) this.props.navigate('/channels');
		}
	}

	render() {
		return (
			<>
				<AuthSection title='Login | Beepy' footerType='login'>
					<div className='top-50 xxs:pt-8 bottom-50 my-auto mx-auto flex w-80 flex-col justify-center'>
						<p className='text-dark-grey-blue select-none text-4xl font-semibold'>Sign in to your account</p>
						<p className='text-bluey-grey select-none py-2 font-normal'>Welcome back! Please enter your details.</p>
						<Formik
							validateOnBlur={false}
							validateOnChange={false}
							initialValues={{ email: '', password: '' }}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								this.onSubmit(values);
							}}>
							{({ handleSubmit, handleChange, values, errors }) => (
								<>
									<form onSubmit={handleSubmit} className='flex flex-col'>
										<div className='flex flex-col pt-5'>
											<Elements.InputLabel for='email' label='Email' />
											<Elements.Input id='email' onChange={handleChange} value={values.email} type='email' placeholder='Enter your email' />
											<Elements.FormErrorText error={errors.email} />
										</div>
										<div className='flex flex-col pt-5'>
											<Elements.InputLabel for='password' label='Password' />
											<Elements.Input id='password' onChange={handleChange} value={values.password} type='password' placeholder='Password' />
											<Elements.FormErrorText error={errors.password} />
										</div>
										<div className='flex flex-row justify-center items-center pt-5 text-sm pb-5'>
											<Link to='/forgot-password' className='text-primary'>
												Forgot password
											</Link>
										</div>
										<Elements.Button name='Log In' type='submit' loading={this.props.login.isLoading} />
									</form>
								</>
							)}
						</Formik>
						<div className='flex select-none items-center justify-center pt-8 pb-8 text-sm'>
							<span className='text-bluey-grey'>Don't have an account?</span>
							<Link to='/register' className='text-primary ml-1'>
								Create an account.
							</Link>
						</div>
					</div>
				</AuthSection>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	login: state.auth.login
});

const mapDispatch = {
	loginAction: ({ email, password }: { email: string; password: string }) => authActions.loginAction({ email, password })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(Login));
