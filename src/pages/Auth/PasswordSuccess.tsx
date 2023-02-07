import React from 'react';
import { Link } from 'react-router-dom';

import AuthSection from '../../components/Auth/AuthSection';

import { ReactComponent as CheckImage } from '../../assets/password-success.svg';
import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { Elements } from '../../components';

import { PasswordSuccessProps, PasswordSuccessStates } from '../../@types/pages/Auth';
import { alert, router } from '../../helpers';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { authActions } from '../../actions';
import { authTypes } from '../../@types/reducers';

class PasswordSuccess extends React.Component<PasswordSuccessProps & ConnectedProps<typeof connector>, PasswordSuccessStates> {
	componentDidUpdate(prevProps: PasswordSuccessProps & ConnectedProps<typeof connector>) {
		if (prevProps.loggedIn !== this.props.loggedIn && !this.props.loggedIn.isLoading) {
			alert.fire({
				message: this.props.loggedIn.error ? (this.props.loggedIn.data as unknown as any).message : 'Logged in successfully!',
				error: this.props.loggedIn.error
			});

			if (!this.props.loggedIn.error) this.props.navigate('/channels');
		}
	}

	render() {
		return (
			<AuthSection title='Password Success | Beepy' footerType='passwordSuccess'>
				<div className='my-auto mx-auto flex w-80 flex-col justify-center pt-8 md:justify-start'>
					<div className='flex items-center justify-center flex-col text-center'>
						<CheckImage className='w-80' />
						<div className='text-dark-grey-blue text-3xl font-semibold'>Password reset</div>
						<div className='text-bluey-grey py-3 font-light'>Your password has been successfully reset. Click below to log in magically.</div>
					</div>
					<Elements.Button loading={this.props.loggedIn.isLoading} onClick={() => this.props.login({ email: this.props.email, password: this.props.password })} name='Continue' className='mt-4 text-white p-2' type='button' />
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

const mapState = (state: RootState) => ({
	loggedIn: state.auth.login
});

const mapDispatch = {
	login: ({ email, password }: authTypes.LoginRequest) => authActions.loginAction({ email, password })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(PasswordSuccess));
