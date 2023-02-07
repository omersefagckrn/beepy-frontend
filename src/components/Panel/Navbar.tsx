import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { accountActions, authActions } from '../../actions';
import { RootState } from '../../store';
import { accountTypes } from '../../@types/reducers';
import { alert, modal, router } from '../../helpers';

import { Menu, Transition } from '@headlessui/react';
import Tooltip from '@mui/material/Tooltip';
import { AiFillBell } from 'react-icons/ai';
import { Avatar, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BsPersonPlusFill } from 'react-icons/bs';

import Logo from '../../components/Logo/Logo';

import Invitations from '../Invitations/Invitations';
import Messages from '../Messages/Messages';
import { NavbarProps, NavbarStates } from '../../@types/components/Panel/Navbar';

class Navbar extends React.Component<NavbarProps & ConnectedProps<typeof connector>, NavbarStates> {
	state: NavbarStates = {
		isMobileMenuOpen: false,
		isInvitationsOpen: false,
		isMessagesOpen: false,
		user: null
	};

	componentDidMount() {
		this.props.getUserProfile();
	}

	componentDidUpdate(prevProps: NavbarProps & ConnectedProps<typeof connector>) {
		if (prevProps.user !== this.props.user && !this.props.user.isLoading && !this.props.user.error && this.props.user.success) {
			this.setState({
				user: this.props.user.data as accountTypes.IUserProfile
			});
		}

		if (prevProps.loggedOut !== this.props.loggedOut && !this.props.loggedOut.isLoading) {
			alert.fire({
				message: this.props.loggedOut.error ? (this.props.loggedOut.data as unknown as any).message : 'Logged out successfully!',
				error: this.props.loggedOut.error
			});

			if (!this.props.loggedOut.error) this.props.navigate('/login');
		}
	}

	classNames = (...classes: any) => {
		return classes.filter(Boolean).join(' ');
	};

	handleMobileMenu = () => {
		this.setState({
			isMobileMenuOpen: !this.state.isMobileMenuOpen
		});
	};

	handleInvitationsMenu = () => {
		if (this.state.isMobileMenuOpen) {
			this.setState({
				isMobileMenuOpen: false
			});
		}
		this.setState({
			isInvitationsOpen: !this.state.isInvitationsOpen
		});
	};

	handleMessagesMenu = () => {
		if (this.state.isMobileMenuOpen) {
			this.setState({
				isMobileMenuOpen: false
			});
		}
		this.setState({
			isMessagesOpen: !this.state.isMessagesOpen
		});
	};

	render() {
		const StyledBadge = styled(Badge)({
			'& .MuiBadge-badge': {
				color: '#fff',
				backgroundColor: '#ff9b01'
			}
		});

		const StyledBadgeInvitations = styled(Badge)({
			'& .MuiBadge-badge': {
				color: '#fff',
				backgroundColor: '#ff9b01',
				marginLeft: '-0.4rem',
				marginTop: '-0.2rem'
			}
		});
		const StyledBadgeMessages = styled(Badge)({
			'& .MuiBadge-badge': {
				color: '#fff',
				backgroundColor: '#ff9b01',
				marginLeft: '-0.3rem',
				marginTop: '-0.2rem'
			}
		});

		const { user } = this.state;

		if (!user) {
			return null;
		}

		return (
			<>
				<div className='xxs:px-[1rem] bg-[#1e2b3b] sm:px-[1rem] md:px-[2rem] select-none'>
					<div className='flex relative h-[5rem]'>
						<div className='flex items-center justify-between'>
							<Link to='/channels'>
								<Logo color='white' />
							</Link>
							<span className='xxs:hidden ml-8 md:flex items-center justify-center font-semibold text-white'>
								<Link to='/channels'>Channels</Link>
							</span>
							<div className='absolute xxs:hidden md:flex right-0 flex items-center justify-center'>
								<div onClick={this.handleInvitationsMenu} className={`${user.messages && user.messages > 0 ? 'mr-6' : 'mr-4'} flex items-center justify-center cursor-pointer`}>
									{!this.state.isInvitationsOpen ? (
										<Tooltip title='Invitations' arrow>
											<StyledBadgeInvitations
												anchorOrigin={{
													vertical: 'top',
													horizontal: 'left'
												}}
												badgeContent={user.invitations}>
												<BsPersonPlusFill className='h-6 w-6 text-white' />
											</StyledBadgeInvitations>
										</Tooltip>
									) : (
										<StyledBadgeInvitations
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'left'
											}}
											badgeContent={user.invitations}>
											<BsPersonPlusFill className='h-6 w-6 text-white' />
										</StyledBadgeInvitations>
									)}
								</div>
								<div onClick={this.handleMessagesMenu} className='flex items-center justify-center mr-4 cursor-pointer'>
									{!this.state.isMessagesOpen ? (
										<>
											<Tooltip title='Messages' arrow>
												<StyledBadgeMessages
													anchorOrigin={{
														vertical: 'top',
														horizontal: 'left'
													}}
													badgeContent={user.messages}>
													<AiFillBell className='h-6 w-6 text-white' />
												</StyledBadgeMessages>
											</Tooltip>
										</>
									) : (
										<StyledBadgeMessages
											anchorOrigin={{
												vertical: 'top',
												horizontal: 'left'
											}}
											badgeContent={user.messages}>
											<AiFillBell className='h-6 w-6 text-white' />
										</StyledBadgeMessages>
									)}
								</div>

								<div className='xxs:hidden md:block'>
									<div className='flex items-center justify-center'>
										<Menu as='div' className='relative flex items-center justify-center text-left'>
											<Menu.Button className='flex items-center justify-center'>
												<Avatar sx={{ bgcolor: '#fff', fontSize: '1rem' }}>
													<div className='text-dark'>{user.name[0].toUpperCase() + user.surname[0].toUpperCase()}</div>
												</Avatar>
											</Menu.Button>
											<Transition enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
												<Menu.Items className='absolute right-0 z-[100] mt-12 w-[15rem] origin-top-right rounded-lg bg-[#1e2b3b] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
													<div>
														<Menu.Item>
															{({ active }) => (
																<Link to='/profile' className={this.classNames(active ? 'text-primary hover:bg-[#283c52]' : 'hover:text-primary text-white', 'flex items-center justify-start rounded-t-lg px-4 py-2 text-sm')}>
																	Profile
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link to='/profile/subscription' className={this.classNames(active ? 'text-primary hover:bg-[#283c52]' : 'hover:text-primary text-white', 'flex items-center justify-start px-4 py-2 text-sm')}>
																	Subscription
																</Link>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<Link to='/profile/devices' className={this.classNames(active ? 'text-primary hover:bg-[#283c52]' : 'hover:text-primary text-white', 'flex items-center justify-start px-4 py-2 text-sm')}>
																	Devices
																</Link>
															)}
														</Menu.Item>
														<Menu.Item
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
															}>
															{({ active }) => <button className={this.classNames(active ? 'text-primary hover:bg-[#283c52]' : 'hover:text-primary text-white', 'flex w-full items-center justify-start rounded-b-lg px-4 py-2 text-sm')}>Logout</button>}
														</Menu.Item>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
							</div>
							<div onClick={this.handleMobileMenu} className='absolute cursor-pointer right-0 inline-flex rounded-md bg-gray-900 p-2 text-white hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:block md:hidden'>
								{!this.state.isMobileMenuOpen ? (
									<svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
									</svg>
								) : (
									<svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
									</svg>
								)}
							</div>
						</div>
					</div>
				</div>
				<Transition className='z-[100]' show={this.state.isMobileMenuOpen} enter='transition ease-out duration-100 transform' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='transition ease-in duration-75 transform' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
					<div className='bg-[#1e2b3b] md:hidden'>
						<div className='space-y-1 px-2 pt-2 pb-3 sm:px-3 flex flex-col'>
							<Link to='/channels' className='block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white'>
								Channels
							</Link>
							<Link to='/profile' className='block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white'>
								Profile
							</Link>
							<div onClick={this.handleMessagesMenu} className='block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white'>
								Messages
								<StyledBadge className='ml-5' anchorOrigin={{ vertical: 'top', horizontal: 'right' }} badgeContent={user.messages}></StyledBadge>
							</div>
							<div onClick={this.handleInvitationsMenu} className='block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white'>
								Invitations
								<StyledBadge className='ml-5' anchorOrigin={{ vertical: 'top', horizontal: 'right' }} badgeContent={user.invitations}></StyledBadge>
							</div>
						</div>
					</div>
				</Transition>
				<Invitations handleClose={this.handleInvitationsMenu} isInvitationsOpen={this.state.isInvitationsOpen} />
				<Messages handleClose={this.handleMessagesMenu} isMessagesOpen={this.state.isMessagesOpen} />
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
export default connector(router.withRouter(Navbar));
