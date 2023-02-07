import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { accountTypes } from '../../@types/reducers';
import { ProfileTypes } from '../../@types/pages';

import { modal, router } from '../../helpers';
import { accountActions, authActions } from '../../actions';
import { RootState } from '../../store';

import { ReactComponent as Locations } from '../../assets/location.svg';
import { ReactComponent as Message } from '../../assets/message.svg';
import { Elements } from '../../components';

class Profile extends React.Component<ProfileTypes.ProfileProps & ConnectedProps<typeof connector>, ProfileTypes.ProfileStates> {
	state: ProfileTypes.ProfileStates = {
		user: null
	};

	links = [
		{ to: '/profile', text: 'Profile' },
		{ to: '/profile/devices', text: 'Devices' },
		{ to: '/profile/feedback', text: 'Feedback' },
		{ to: '/profile/subscription', text: 'Subscription' },
		{ to: '/profile/more', text: 'More' }
	];

	componentDidMount() {
		this.props.getUserProfile();
	}

	componentDidUpdate(prevProps: ProfileTypes.ProfileProps & ConnectedProps<typeof connector>) {
		if (prevProps.user !== this.props.user && !this.props.user.isLoading && !this.props.user.error && this.props.user.success) {
			this.setState({
				user: this.props.user.data as accountTypes.IUserProfile
			});
		}
	}

	render() {
		const { user } = this.state;

		if (!user) return null;

		return (
			<>
				<Helmet>
					<title>Profile | Beepy</title>
				</Helmet>
				<div className='mx-auto w-full max-w-[75rem]'>
					<div className='p-1 mt-4 md:p-2'>
						<div className='text-dark-grey-blue text-3xl font-[500] select-none'>Profile</div>
						<div className='text-bluey-grey py-1 font-light select-none'>Update your settings and details such as subscription, profile, devices etc.</div>
					</div>
					<div className='bg-white-50 mt-4 rounded-lg p-6'>
						<div className='mb-8 md:flex select-none flex-col md:flex-row items-start justify-between'>
							<div className='flex items-start justify-start'>
								<div className='relative'>
									<div className='text-dark h-16 w-16 flex items-center justify-center rounded-lg bg-[#c1c7d8] p-6 text-2xl font-extrabold uppercase'>{user.name[0].toUpperCase() + user.surname[0].toUpperCase()}</div>
								</div>
								<div className='ml-3'>
									<div className='xxs:max-w-[8rem] flex w-full items-center justify-start sm:max-w-sm'>
										<div className='text-dark-grey-blue truncate text-lg font-semibold'>{user.name + ' ' + user.surname}</div>
										<div className='ml-3'>
											<Elements.Status text={user.subscription} />
										</div>
									</div>
									<div className='flex items-center'>
										<div className='flex items-center'>
											<Locations />
											<div className='text-bluey-grey font-normal'>{user.country}</div>
										</div>
										<div className='items-center md:flex hidden'>
											<Message />
											<div className='text-bluey-grey font-normal'>{user.email}</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<button
									onClick={() =>
										modal.confirmModal({
											title: 'Logout',
											description: 'Are you sure you want to logout?',
											actionName: 'Logout',
											onClick: () => {
												this.props.logout();
											},
											color: 'bg-red-600'
										})
									}
									className='text-dark-grey-blue bg-transparent shadow-sm mt-2 md:mt-0 flex items-start justify-start rounded-lg border-[1px] px-5 py-2 text-base font-semibold'>
									<svg className='flex max-h-8 w-8 items-center justify-center pr-2' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M8.219 14c.14 0 .281-.117.281-.281v-.938c0-.14-.14-.281-.281-.281H6.25a.74.74 0 0 1-.75-.75v-4.5c0-.398.328-.75.75-.75h1.969c.14 0 .281-.117.281-.281V5.28c0-.14-.14-.281-.281-.281H6.25A2.25 2.25 0 0 0 4 7.25v4.5A2.25 2.25 0 0 0 6.25 14h1.969zm2.742-7.102 1.828 1.665H8.313a.555.555 0 0 0-.563.562v.75c0 .328.234.563.563.563h4.476l-1.828 1.687a.54.54 0 0 0 0 .797l.516.515c.21.211.562.235.773 0l3.563-3.539c.234-.21.234-.562 0-.796l-3.54-3.516c-.234-.234-.585-.234-.796 0l-.516.516a.54.54 0 0 0 0 .796z'
											fill='#1E2B3B'
										/>
									</svg>
									Logout
								</button>
							</div>
						</div>
						<nav className='scrollbar flex select-none items-center border-b gray-400 pb-2.5 text-[#667085]'>
							{this.links.map((link, index) => (
								<Link to={link.to} key={index} className={`mr-3 pb-1 md:mr-6 ${this.props.location.pathname === link.to ? 'active border-primary text-primary border-b-2' : ''}`}>
									{link.text}
								</Link>
							))}
						</nav>
						<Outlet />
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	user: state.account.userProfile,
	loggedOut: state.auth.logout
});

const mapDispatch = {
	getUserProfile: () => accountActions.userProfileAction(),
	logout: () => authActions.logoutAction()
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(Profile));
