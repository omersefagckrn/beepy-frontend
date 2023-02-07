import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { authReducer, accountReducer, channelReducer, notificationReducer, reportReducer, subscriptionReducer } from './reducers';

const rootReducer = combineReducers({
	auth: combineReducers({
		register: authReducer.registerReducer,
		countries: authReducer.countriesReducer,
		timezones: authReducer.listTimeZonesReducer,
		login: authReducer.loginReducer,
		forgotPassword: authReducer.forgotPasswordReducer,
		logout: authReducer.logoutReducer,
		urls: authReducer.urlsReducer,
		feedbacks: authReducer.feedBacksReducer,
		categories: authReducer.categoriesReducer,
		verificationCode: authReducer.verificationCodeReducer,
		verificationResend: authReducer.verificationCodeResendReducer,
		resetPassword: authReducer.resetPasswordReducer
	}),

	account: combineReducers({
		userProfile: accountReducer.userProfileReducer,
		userSubscription: accountReducer.userSubscriptionReducer,
		subscriptionResume: accountReducer.userSubscriptionResumeReducer,
		subscriptionCancel: accountReducer.subscriptionCancelReducer,
		changeSubscription: accountReducer.changeSubscriptionReducer,
		paymentMethods: accountReducer.paymentMethodsReducer,
		addPaymentMethod: accountReducer.addPaymentMethodReducer,
		deletePaymentMethod: accountReducer.deletePaymentMethodsReducer,
		setPrimaryMethod: accountReducer.setPrimaryPaymentMethodsReducer,
		userInvoices: accountReducer.userInvoicesReducer,
		updateProfile: accountReducer.updateProfileReducer,
		updateBillingAddress: accountReducer.updateBillingAddressReducer,
		changePassword: accountReducer.changePasswordReducer,
		createFeedback: accountReducer.createFeedbackReducer,
		invitationList: accountReducer.invitationListReducer,
		invitationAction: accountReducer.inviteActionReducer,
		deviceList: accountReducer.deviceListReducer,
		deleteDevice: accountReducer.deleteDeviceReducer,
		messageList: accountReducer.messageListReducer,
		readMessage: accountReducer.messageReadReducer,
		unreadMessage: accountReducer.unreadMessageReducer,
		deleteMessage: accountReducer.deleteMessageReducer
	}),

	channel: combineReducers({
		createChannel: channelReducer.createChannelReducer,
		uploadLogo: channelReducer.uploadLogoReducer,
		channelList: channelReducer.channelListReducer,
		channelDetails: channelReducer.channelDetailsReducer,
		channelDetailsUpdate: channelReducer.channelDetailsUpdateReducer,
		channelLimits: channelReducer.channelLimitsReducer,
		channelLeave: channelReducer.channelLeaveReducer,
		channelDelete: channelReducer.channelDeleteReducer,
		channelMembers: channelReducer.channelMembersReducer,
		channelMemberDelete: channelReducer.channelMemberDeleteReducer,
		channelInvitationList: channelReducer.channelInvitationListReducer,
		channelInvitaitonSend: channelReducer.channelInvitationSendReducer,
		channelInvitationResend: channelReducer.channelInvitationResendReducer,
		channelInvitationCancel: channelReducer.channelInvitationCancelReducer,
		channelSettings: channelReducer.channelSettingsReducer,
		channelSettingsUpdate: channelReducer.channelSettingsUpdateReducer,
		muteAction: channelReducer.muteActionReducer,
		credentialsGet: channelReducer.credentialsGetReducer,
		credentialsRenew: channelReducer.credentialsRenewReducer,
		webHooksGet: channelReducer.webHooksGetReducer,
		createWebHook: channelReducer.createWebHookReducer,
		deleteWebHook: channelReducer.deleteWebHookReducer,
		updateWebHook: channelReducer.updateWebHookReducer,
		addWhiteList: channelReducer.addWhiteListReducer,
		deleteWhiteList: channelReducer.deleteWhiteListReducer,
		getWhiteList: channelReducer.getWhiteListReducer,
		channelInactivate: channelReducer.channelInactivateReducer,
		channelActivate: channelReducer.channelActivateReducer
	}),

	notification: combineReducers({
		notificationList: notificationReducer.notificationListReducer,
		sendNotification: notificationReducer.sendNotificationReducer,
		deleteNotification: notificationReducer.deleteNotificationReducer,
		readNotification: notificationReducer.readNotificationReducer,
		unreadNotification: notificationReducer.unreadNotificationReducer
	}),

	report: combineReducers({
		issue: reportReducer.issueReducer
	}),

	subscription: combineReducers({
		subscriptionIntent: subscriptionReducer.subscriptionIntentReducer,
		createSubscription: subscriptionReducer.createSubscriptionReducer,
		packages: subscriptionReducer.subscriptionPackagesReducer,
		paymentKey: subscriptionReducer.paymentKeyReducer
	})
});

// persistlenen reducer (rootReducer)
const logger = createLogger();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type RootActions = any;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

var middlewares: Middleware<any, any, any>[] = [];

if (process.env.NODE_ENV === 'development') {
	middlewares = [thunk as ThunkMiddleware<RootState, RootActions>, logger];
} else {
	middlewares = [thunk as ThunkMiddleware<RootState, RootActions>];
}

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
