import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';

import { ProfileTypes } from '../../@types/pages';
import { accountTypes, authTypes } from '../../@types/reducers';

import { RootState } from '../../store';
import { alert, router } from '../../helpers';
import { accountActions, authActions } from '../../actions';

import { Elements } from '../../components';
import PasswordConfirmation from '../../components/Modal/PasswordConfirmation';

const passwordValidationSchema = Yup.object({
	currentPassword: Yup.string().required('Required').min(8, 'You must enter a minimum of 8 characters.'),
	newPassword: Yup.string().required('Required').min(8, 'You must enter a minimum of 8 characters.'),
	confirmPassword: Yup.string()
		.required('Required')
		.min(8, 'You must enter a minimum of 8 characters.')
		.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

const profileValidationSchema = Yup.object({
	name: Yup.string().required('Required'),
	surname: Yup.string().required('Required'),
	email: Yup.string().required('Required').email('Invalid e-mail address!')
});

class ProfileInformation extends React.Component<ProfileTypes.ProfileInformationProps & ConnectedProps<typeof connector>, ProfileTypes.ProfileInformationStates> {
	modal: React.RefObject<PasswordConfirmation>;

	constructor(props: ProfileTypes.ProfileInformationProps & ConnectedProps<typeof connector>) {
		super(props);
		this.modal = React.createRef<PasswordConfirmation>();
	}

	state: ProfileTypes.ProfileInformationStates = {
		showCurrentPassword: true,
		showNewPassword: true,
		showConfirmPassword: true,
		changePassword: false,
		editProfile: false,
		user: null,
		updateProfileData: null
	};

	componentDidMount() {
		this.props.getUserProfile();
		this.props.getCountries();
		this.props.getTimeZones();
	}

	componentDidUpdate(prevProps: ProfileTypes.ProfileInformationProps & ConnectedProps<typeof connector>) {
		if (prevProps.user !== this.props.user && !this.props.user.isLoading && !this.props.user.error && this.props.user.success) {
			this.setState({
				user: this.props.user.data as accountTypes.IUserProfile
			});
		}

		if (prevProps.changePassword !== this.props.changePassword && !this.props.changePassword.isLoading) {
			alert.fire({
				message: this.props.changePassword.error ? (this.props.changePassword.data as unknown as any).message : 'Password changed successfully!',
				error: this.props.changePassword.error
			});

			this.setState({
				changePassword: false
			});
		}

		if (prevProps.updatedProfile !== this.props.updatedProfile && !this.props.updatedProfile.isLoading) {
			alert.fire({
				message: this.props.updatedProfile.error ? (this.props.updatedProfile.data as unknown as any).message : 'Profile updated successfully!',
				error: this.props.updatedProfile.error
			});

			this.props.getUserProfile();

			this.setState({
				updateProfileData: null,
				editProfile: false
			});
		}
	}

	showEditProfile = () => {
		this.setState({
			editProfile: !this.state.editProfile
		});
	};

	editProfileSubmit = (values: { name: string; surname: string; email: string; country: string; timezone: string }) => {
		this.setState({
			updateProfileData: values
		});

		this.modal.current?.show();
	};

	showChangePassword = () => {
		this.setState({
			changePassword: !this.state.changePassword
		});
	};

	showCurrentPassword = () => {
		this.setState({
			showCurrentPassword: !this.state.showCurrentPassword
		});
	};

	showNewPassword = () => {
		this.setState({
			showNewPassword: !this.state.showNewPassword
		});
	};

	showConfirmPassword = () => {
		this.setState({
			showConfirmPassword: !this.state.showConfirmPassword
		});
	};

	changePasswordSubmit = (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
		this.props.changePasswordAction({ current_password: values.currentPassword, password: values.newPassword });
	};

	render() {
		const { user } = this.state;

		if (!user) return null;

		return (
			<>
				<PasswordConfirmation
					ref={this.modal}
					onSubmit={(password) => {
						if (this.state.updateProfileData) {
							this.props.updateUserProfile({
								name: this.state.updateProfileData?.name,
								surname: this.state.updateProfileData?.surname,
								email: this.state.updateProfileData?.email,
								country: this.state.updateProfileData?.country,
								timezone: this.state.updateProfileData?.timezone,
								password
							});
						}
					}}
					onClose={() => {
						this.setState({
							editProfile: false,
							updateProfileData: null
						});
					}}
					title='Profile Update'
					description='Please enter your password for updating your profile.'
				/>
				<Elements.SideDescription description='Update your personal information.' type='title' title='Personal info' />
				<div className='gap-8 border-b gray-400 py-5 sm:flex'>
					<Elements.SideDescription description='Change your account information.' title='Profile' />
					<div className='mt-3 basis-3/5'>
						{!this.state.editProfile && (
							<>
								<Elements.UserInfo title='Full Name' description={user.name + ' ' + user.surname} />
								<Elements.UserInfo title='Email' description={user.email} />
								<Elements.UserInfo title='Country' description={user.country} />
								<Elements.UserInfo title='Timezone' description={user.timezone} />
								<Elements.UserInfo title='Subscription' description={user.subscription} />
								<div onClick={this.showEditProfile} className='text-primary flex cursor-pointer select-none flex-row-reverse'>
									Edit Profile
								</div>
							</>
						)}

						{this.state.editProfile && (
							<Formik
								validateOnBlur={false}
								validateOnChange={false}
								initialValues={{ name: user.name, surname: user.surname, email: user.email, country: user.country, timezone: user.timezone }}
								validationSchema={profileValidationSchema}
								onSubmit={(values) => {
									this.editProfileSubmit(values);
								}}>
								{({ handleSubmit, handleChange, values, errors }) => (
									<>
										<form onSubmit={handleSubmit} className='flex select-none flex-col xxs:mt-2 md:mt-0'>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='name' label='First Name' />
												<Elements.Input value={values.name} onChange={handleChange} type='text' id='name' placeholder={user.name} />
												<Elements.FormErrorText error={errors.name} />
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='surname' label='Last Name' />
												<Elements.Input value={values.surname} onChange={handleChange} type='text' id='surname' placeholder={user.surname} />
												<Elements.FormErrorText error={errors.surname} />
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='email' label='Email' />
												<Elements.Input value={values.email} onChange={handleChange} type='email' id='email' placeholder={user.email} />
												<Elements.FormErrorText error={errors.email} />
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='country' label='Country' />
												<Elements.Select value={values.country} onChange={handleChange} id='country'>
													<option disabled>Choose country</option>
													{this.props.countries.data &&
														!this.props.countries.isLoading &&
														!this.props.countries.error &&
														(this.props.countries.data as authTypes.ICountry[]).map((country, index) => {
															return (
																<option key={index} value={country.code}>
																	{country.value}
																</option>
															);
														})}
												</Elements.Select>
											</div>
											<div className='flex flex-col pt-5'>
												<Elements.InputLabel for='timezone' label='Timezone' />
												<Elements.Select value={values.timezone} onChange={handleChange} id='timezone'>
													<option disabled>Choose timezone</option>
													{this.props.timezones.data &&
														!this.props.timezones.isLoading &&
														!this.props.timezones.error &&
														(this.props.timezones.data as authTypes.ITimeZone[]).map((timezone, index) => {
															return (
																<option key={index} value={timezone.code}>
																	{timezone.value}
																</option>
															);
														})}
												</Elements.Select>
											</div>
											<div className='flex select-none flex-row-reverse space-x-4 space-x-reverse'>
												<Elements.Button className='mt-8 w-24 text-white' name='Update' type='submit' />
												<Elements.Button onClick={this.showEditProfile} color='bg-transparent' className='gray-1000 mt-8 w-24 border border-gray-300 p-2' name='Cancel' type='button' />
											</div>
										</form>
									</>
								)}
							</Formik>
						)}
					</div>
				</div>
				<div className='gap-8 py-5 md:flex items-start justify-center'>
					<Elements.SideDescription description='Change your password.' title='Security' />
					{this.state.changePassword ? null : (
						<div className='sm:flex md:basis-3/5 md:justify-between md:self-start'>
							<div className='basis-4/6 xxs:mt-2 md:mt-0'>
								<div className='text-dark select-none'>Password</div>
								<p className='tracking-widest text-bluey-grey'>••••••••••••••••••••••••</p>
							</div>
							<span onClick={this.showChangePassword} className='text-primary cursor-pointer'>
								Change Password
							</span>
						</div>
					)}
					{this.state.changePassword && (
						<Formik
							validateOnBlur={false}
							validateOnChange={false}
							initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
							validationSchema={passwordValidationSchema}
							onSubmit={(values) => {
								this.changePasswordSubmit(values);
							}}>
							{({ handleSubmit, handleChange, values, errors }) => (
								<>
									<form onSubmit={handleSubmit} className='flex w-full basis-3/5 select-none flex-col'>
										<div className='relative flex items-start justify-start flex-col pt-5'>
											<Elements.InputLabel for='currentPassword' label='Current Password' />
											<Elements.Input type={this.state.showCurrentPassword ? 'password' : 'text'} value={values.currentPassword} onChange={handleChange} id='currentPassword' placeholder={'Current Password'} />
											<Elements.FormErrorText error={errors.currentPassword} />
											<Elements.PasswordInput onClick={this.showCurrentPassword} show={this.state.showCurrentPassword}></Elements.PasswordInput>
										</div>
										<div className='relative flex items-start justify-start flex-col pt-5'>
											<Elements.InputLabel for='newPassword' label='New Password' />
											<Elements.Input type={this.state.showNewPassword ? 'password' : 'text'} value={values.newPassword} onChange={handleChange} id='newPassword' placeholder='New Password' />
											<Elements.FormErrorText error={errors.newPassword} />
											<Elements.PasswordInput onClick={this.showNewPassword} show={this.state.showNewPassword} />
										</div>
										<div className='relative flex items-start justify-start flex-col pt-5'>
											<Elements.InputLabel for='confirmPassword' label='Confirm Password' />
											<Elements.Input type={this.state.showConfirmPassword ? 'password' : 'text'} value={values.confirmPassword} onChange={handleChange} id='confirmPassword' placeholder='Confirm Password' />
											<Elements.FormErrorText error={errors.confirmPassword} />
											<Elements.PasswordInput onClick={this.showConfirmPassword} show={this.state.showConfirmPassword} />
										</div>
										<div className='flex flex-row-reverse space-x-4 space-x-reverse'>
											{/* NOT: butonlar loadingde bozuluyor */}
											<Elements.Button loading={this.props.changePassword.isLoading} className='mt-8 w-24 text-white' name='Update' type='submit' />
											{!this.props.changePassword.isLoading && <Elements.Button color='bg-transparent' className='gray-1000 mt-8 w-24 border border-gray-300 p-2' onClick={this.showChangePassword} name='Cancel' type='button' />}
										</div>
									</form>
								</>
							)}
						</Formik>
					)}
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	user: state.account.userProfile,
	countries: state.auth.countries,
	timezones: state.auth.timezones,
	changePassword: state.account.changePassword,
	updatedProfile: state.account.updateProfile
});

const mapDispatch = {
	getUserProfile: () => accountActions.userProfileAction(),
	updateUserProfile: ({ name, surname, email, password, country, timezone }: accountTypes.IUpdateProfileRequest) => accountActions.updateProfileAction({ name, surname, email, password, country, timezone }),
	getCountries: () => authActions.listCountriesAction(),
	getTimeZones: () => authActions.listTimezonesAction(),
	changePasswordAction: ({ current_password, password }: accountTypes.IChangePasswordRequest) => accountActions.changePasswordAction({ current_password, password })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withNavigate(ProfileInformation));
