import React from 'react';
import { Helmet } from 'react-helmet-async';

import AuthLogo from '../../components/Auth/AuthLogo';

import { ReactComponent as StepCompleted } from '../../assets/step-completed.svg';
import { ReactComponent as ForgotCheckMail } from '../../assets/forgot-check-mail.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { Link } from 'react-router-dom';
import AuthFooter from '../../components/Auth/AuthFooter';
import { alert, auth, router } from '../../helpers';
import OtpInput from 'react-auth-code-input';
import { VerificationProps, VerificationStates } from '../../@types/pages/Auth';
import { Elements } from '../../components';
import { RootState } from '../../store';
import { authActions } from '../../actions';
import { authTypes } from '../../@types/reducers';
import { connect, ConnectedProps } from 'react-redux';

class Verification extends React.Component<VerificationProps & ConnectedProps<typeof connector>, VerificationStates> {
	state: VerificationStates = {
		otp: ''
	};

	componentDidUpdate(prevProps: VerificationProps & ConnectedProps<typeof connector>) {
		if (prevProps.verification !== this.props.verification && !this.props.verification.isLoading) {
			alert.fire({
				message: this.props.verification.error ? (this.props.verification.data as unknown as any).message : 'Verification successfully!',
				error: this.props.verification.error
			});

			if (!this.props.verification.error) this.props.navigate('/channels');
		}
	}

	handleChange = (otp: string) => {
		this.setState({ otp });
	};

	verify = () => {
		const registerData = auth.getRegisterData();
		this.props.verify({ ...registerData, code: this.state.otp });
	};

	render() {
		return (
			<>
				<Helmet>
					<title>Verification | Beepy</title>
				</Helmet>
				<div className='flex h-screen w-full select-none flex-wrap'>
					<div className='xxs:hidden md:flex md:w-2/6 flex-col justify-between bg-dark text-white px-8'>
						<div className='flex flex-col justify-center md:justify-start pt-8'>
							<AuthLogo color='light' />
							<div className='p-4 mt-[8rem]'>
								<div className='flex items-center justify-start'>
									<div className='mr-4'>
										<div className='border-primary border-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg'>
											<div className='bg-primary h-8 w-8 rounded-full'>
												<StepCompleted className='flex items-center justify-center' />
											</div>
										</div>
									</div>
									<div className='flex flex-col items-start justify-start text-white'>
										<div>Your details</div>
										<div className='flex items-center justify-center font-light break-words'>Please provide your name and email</div>
									</div>
								</div>
								<div className='w-8 inline-flex justify-center items-center'>
									<div className='rounded border-2 border-white bg-white text-white h-[2.875rem]'></div>
								</div>
								<div className='flex items-start justify-start'>
									<div className='mr-4'>
										<div className='border-primary border-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg'>
											<div className='bg-primary h-2 w-2 rounded-full'></div>
										</div>
									</div>
									<div className='flex flex-col items-start justify-start text-white'>
										<div>Email Verification</div>
										<div className='flex items-center justify-center font-light'>Verify your e-mail address</div>
									</div>
								</div>
							</div>
						</div>
						<AuthFooter footerType='verification' />
					</div>

					<div className='flex w-full flex-col md:w-4/6'>
						<div className='mt-8 flex items-center justify-center'>
							<AuthLogo color='dark' />
						</div>
						<div className='my-auto mx-auto flex w-1/2 flex-col justify-center items-center text-center'>
							<ForgotCheckMail className='mb-4' />
							<div className='text-dark-grey-blue text-4xl font-semibold'>Email Verification</div>
							<div className='text-bluey-grey m-2 flex flex-col items-center justify-center font-light'>
								<div>Enter the 6-digit verification code we sent to </div>
								<div>{auth.getRegisterData() ? auth.getRegisterData().email : ''}</div>
							</div>

							<div className='flex flex-col'>
								<OtpInput
									containerClassName='mt-5 flex flex-row items-center justify-center px-2 mb-5'
									inputClassName='text-primary form-control xxs:w-10 xxs:h-10 sm:h-15 sm:w-15 sm:h-15 sm:w-15 md:h-18 md:w-18 m-2 flex items-center justify-center rounded-lg border border-primary text-center text-2xl md:text-4xl outline-none focus:ring-[4px] focus:ring-[#ff9b01] lg:h-20 lg:w-20'
									onChange={this.handleChange}
									allowedCharacters={'numeric'}
									length={6}
								/>
								<Elements.Button onClick={this.verify} loading={this.props.verification.isLoading} disabled={this.state.otp.length !== 6} type='button' name='Verify Email' />
							</div>

							<div className='text-bluey-grey flex flex-col items-center justify-center p-8 text-sm'>
								<div>
									Didn't receive the email?
									<Link to='#!' className='text-primary ml-[0.35rem]'>
										Click to resend.
									</Link>
								</div>
								<div className='mt-5 flex items-center justify-center'>
									<ArrowLeft className='mr-1 w-[1rem]' />
									<Link to='/login'>Back to log in</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	verification: state.auth.verificationCode
});

const mapDispatch = {
	verify: ({ name, surname, email, country, password, timezone, code }: authTypes.IVerificationRequest) => authActions.verificationCodeAction({ name, surname, email, country, password, timezone, code })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(Verification));
