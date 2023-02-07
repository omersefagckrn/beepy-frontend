import React from 'react';
import { Route, Routes, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { ChannelsListTypes } from './@types/pages';

import Page from './components/Panel/Page';
import { auth } from './helpers';
import { Login, Register, ForgotPassword, NewPassword, ProfileFeedback, ProfileInformation, ProfileMore, ChannelNotifications, ProfileDevices, Profile, ChannelMembers, Channel, ChannelInvitations, ChannelDetails, ChannelSettings, Verification, ChannelCredentials, ChannelWebhooks, ChannelsList } from './pages';
import CreateChannel from './pages/Channels/CreateChannel';
import ProfileSubscription from './pages/Profile/ProfileSubscription';

class PublicRoute extends React.Component {
	render() {
		return auth.isLoggedIn() ? <Navigate to='/channels' replace /> : <Outlet />;
	}
}
class PrivateRoute extends React.Component {
	render() {
		return auth.isLoggedIn() ? this.props.children : <Navigate to='/login' replace />;
	}
}
class Router extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					{/*  */}
					<Route element={<PublicRoute />}>
						<Route index element={<Navigate to='login' replace />} />
						<Route path='/login' element={<Login />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/password/reset' element={<NewPassword />} />
						{/*  */}
						<Route path='/register' element={<Register />} />
						<Route path='/verification' element={<Verification />} />
					</Route>
					{/*  */}
					<Route
						element={
							<PrivateRoute>
								<Page />
							</PrivateRoute>
						}>
						<Route index element={<Navigate to='channels' replace />} />
						<Route path='profile' element={<Profile />}>
							<Route index element={<ProfileInformation />} />
							<Route path='devices' element={<ProfileDevices />} />
							<Route path='feedback' element={<ProfileFeedback />} />
							<Route path='subscription' element={<ProfileSubscription />} />
							<Route path='more' element={<ProfileMore />} />
						</Route>
						<Route path='channels/:id' element={<Channel />}>
							<Route index element={<Navigate to='notifications' replace />} />
							<Route path='notifications' element={<ChannelNotifications />} />
							<Route path='members' element={<ChannelMembers />} />
							<Route path='invitations' element={<ChannelInvitations />} />
							<Route path='details' element={<ChannelDetails />} />
							<Route path='settings' element={<ChannelSettings />} />
							<Route path='credentials' element={<ChannelCredentials />} />
							<Route path='webhooks' element={<ChannelWebhooks />} />
						</Route>
						<Route path='/channels'>
							<Route
								index
								element={
									// @ts-ignore
									<ChannelsList type={ChannelsListTypes.ChannelsStatus.ACTIVE} />
								}
							/>
							<Route
								path='inactive'
								element={
									// @ts-ignore
									<ChannelsList type={ChannelsListTypes.ChannelsStatus.INACTIVE} />
								}
							/>
							<Route path='create' element={<CreateChannel />} />
						</Route>
					</Route>
					<Route path='*' element={<Navigate to='/' replace />} />
					{/*  */}
				</Routes>
			</BrowserRouter>
		);
	}
}

export default Router;
