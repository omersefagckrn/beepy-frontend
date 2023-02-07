import React from 'react';
import { Link } from 'react-router-dom';

import AuthSection from '../../components/Auth/AuthSection';

import { ReactComponent as ForgotCheckMail } from '../../assets/forgot-check-mail.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { CheckMailProps, CheckMailStates } from '../../@types/pages/Auth';

class CheckMail extends React.Component<CheckMailProps, CheckMailStates> {
	render() {
		return (
			<AuthSection title='Check Email | Beepy' footerType='checkMail'>
				<div className='my-auto mx-auto flex w-80 flex-col justify-center md:justify-start'>
					<div className='flex items-center justify-center flex-col text-center'>
						<ForgotCheckMail className='w-80' />
						<div className='text-dark-grey-blue text-3xl font-semibold'>Check your email</div>
						<div className='text-bluey-grey py-4 flex flex-col items-center justify-center font-light'>
							We sent a password reset link to: <div className='font-[500]'>{this.props.email}</div>
						</div>
						<div className='text-bluey-grey font-light'>If you don't receive an email, please check your spam folder.</div>
					</div>
					<div className='flex items-center justify-center pt-8 pb-8 text-sm'>
						<Link to='/login' className='flex flex-row justify-center items-center'>
							<ArrowLeft className='pr-1' />
							<div className='text-sm text-bluey-grey'>Back to log in</div>
						</Link>
					</div>
				</div>
			</AuthSection>
		);
	}
}
export default CheckMail;
