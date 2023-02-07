import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect, ConnectedProps } from 'react-redux';

import { ChannelDetailsTypes } from '../../@types/pages';
import { channelTypes } from '../../@types/reducers';

import { RootState } from '../../store';
import { alert, modal, router } from '../../helpers';
import { authActions, channelActions } from '../../actions';

import UploadLogo from '../../components/UploadLogo/UploadLogo';
import { Elements } from '../../components';
import ChannelDetailMember from './ChannelDetailMember';

const validationSchema = Yup.object({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	category: Yup.string().required('Required')
});
class ChannelDetails extends React.Component<ChannelDetailsTypes.ChannelDetailsProps & ConnectedProps<typeof connector>, ChannelDetailsTypes.ChannelDetailsStates> {
	state: ChannelDetailsTypes.ChannelDetailsStates = {
		editProfile: false,
		details: null
	};

	componentDidMount() {
		this.props.getChannelDetails({ channel: this.props.params.id });
		this.props.getCategories();
	}

	componentDidUpdate(prevProps: ChannelDetailsTypes.ChannelDetailsProps & ConnectedProps<typeof connector>) {
		if (prevProps.details !== this.props.details && !this.props.details.isLoading && !this.props.details.error && this.props.details.success) {
			this.setState({
				details: this.props.details.data as channelTypes.IChannelDetails
			});
		}

		if (prevProps.updatedDetails !== this.props.updatedDetails && !this.props.updatedDetails.isLoading) {
			alert.fire({
				message: this.props.updatedDetails.error ? (this.props.updatedDetails.data as unknown as any).message : 'The channel information has just been updated successfully!',
				error: this.props.updatedDetails.error
			});

			this.props.getChannelDetails({ channel: this.props.params.id });
		}

		if (prevProps.deletedChannel !== this.props.deletedChannel && !this.props.deletedChannel.isLoading) {
			alert.fire({
				message: this.props.deletedChannel.error ? (this.props.deletedChannel.data as unknown as any).message : 'The channel has just been deleted successfully!',
				error: this.props.deletedChannel.error
			});

			if (!this.props.deletedChannel.error) this.props.navigate('/channels', { replace: true });
		}

		if (prevProps.inactivatedChannel !== this.props.inactivatedChannel && !this.props.inactivatedChannel.isLoading) {
			alert.fire({
				message: this.props.inactivatedChannel.error ? (this.props.inactivatedChannel.data as unknown as any).message : 'The channel has just been inactivated successfully!',
				error: this.props.inactivatedChannel.error
			});

			if (!this.props.inactivatedChannel.error) this.props.navigate('/channels', { replace: true });
		}

		if (prevProps.uploadedLogo !== this.props.uploadedLogo && !this.props.uploadedLogo.isLoading) {
			alert.fire({
				message: this.props.uploadedLogo.error ? (this.props.uploadedLogo.data as unknown as any).message : 'The channel logo has just been updated successfully!',
				error: this.props.uploadedLogo.error
			});

			this.props.getChannelDetails({ channel: this.props.params.id });
		}
	}

	showProfile = () => {
		this.setState({
			editProfile: !this.state.editProfile
		});
	};

	onSubmit = (values: { title: string; description: string; category: string }) => {
		this.props.updateDetails({
			channel: this.props.params.id,
			title: values.title,
			description: values.description,
			category: values.category
		});
		this.setState({
			editProfile: !this.state.editProfile
		});
	};

	render() {
		const { details } = this.state;
		if (!details) return null;
		return (
			<>
				{details.isOwner ? (
					<>
						<Elements.SideDescription type='title' title='Channel Details' description='You can make your channel-related edits here.' />
						<div className='sm:basis-2/5 sm:flex items-start justify-start mt-4 border-b gray-400'>
							<Elements.SideDescription title='Channel Logo' description='To change your channel logo' />
							<UploadLogo
								buttonActive={true}
								onSubmit={(file) => {
									this.props.uploadLogo({
										channel: this.props.params.id as string,
										logo: file as File
									});
								}}
							/>
						</div>
						<div className='py-3 sm:flex border-b gray-400'>
							<div className='basis-2/5'>
								<Elements.SideDescription title='Channel Information' description='Update your channel information' />
							</div>
							<div className='xxs:mt-2 basis-3/5 sm:mt-0'>
								{!this.state.editProfile && details && (
									<div>
										<div className='mb-4 flex basis-3/5 items-start justify-between border-b gray-400 pb-4'>
											<div className='basis-5/6'>
												<div className='select-none text-bluey-grey text-sm'>Title</div>
												<div className='text-dark xxs:max-w-[8rem] w-full truncate sm:max-w-[12rem]'>{details.title}</div>
											</div>
										</div>
										<div className='mb-4 flex basis-3/5 items-start justify-between border-b gray-400 pb-4'>
											<div className='basis-5/6'>
												<div className='select-none text-bluey-grey text-sm'>Description</div>
												<div className='text-dark'>{details.description}</div>
											</div>
										</div>
										<div className='flex basis-3/5 items-start justify-between gray-400 pb-4 sm:mb-4'>
											<div className='basis-5/6'>
												<div className='select-none text-bluey-grey text-sm'>Category</div>
												<div className='text-dark'>{details.category}</div>
											</div>
										</div>
										<div onClick={this.showProfile} className='text-primary flex cursor-pointer select-none flex-row-reverse sm:mb-0'>
											Edit Details
										</div>
									</div>
								)}
								{this.state.editProfile && details && (
									<Formik
										validateOnBlur={false}
										validateOnChange={false}
										initialValues={{ title: details.title, description: details.description, category: details.category }}
										validationSchema={validationSchema}
										onSubmit={(values) => {
											this.onSubmit(values);
										}}>
										{({ handleSubmit, handleChange, values, errors }) => (
											<>
												<form onSubmit={handleSubmit} className='flex select-none flex-col'>
													<div className='flex flex-col pt-5'>
														<Elements.InputLabel for='title' label='Title' />
														<Elements.Input value={values.title} onChange={handleChange} type='text' id='title' placeholder='e.g. Title' />
														<Elements.FormErrorText error={errors.title} />
													</div>

													<div className='flex flex-col pt-5'>
														<Elements.InputLabel for='description' label='Description' />
														<Elements.Input value={values.description} onChange={handleChange} type='text' id='description' placeholder='e.g. Description' />
														<Elements.FormErrorText error={errors.description} />
													</div>

													<div className='flex flex-col pt-5'>
														<Elements.InputLabel for='category' label='Category' />
														<Elements.Select onChange={handleChange} value={values.category} id='category'>
															{!this.props.categories.isLoading && !this.props.categories.error && this.props.categories.success && this.props.categories.data && typeof this.props.categories.data === 'object' && (
																<>
																	{Object.entries(this.props.categories.data).map((category, index) => (
																		<option key={index} value={category[0]}>
																			{category[0]}
																		</option>
																	))}
																</>
															)}
														</Elements.Select>
														<Elements.FormErrorText error={errors.category} />
													</div>

													<div className='flex select-none flex-row-reverse space-x-4 space-x-reverse'>
														<Elements.Button loading={this.props.updatedDetails.isLoading} className='mt-8 w-24 text-white' name='Update' type='submit' />
														{!this.props.updatedDetails.isLoading && <Elements.Button onClick={this.showProfile} color='bg-transparent' className='gray-1000 mt-8 w-24 border border-gray-300 p-2' name='Cancel' type='button' />}
													</div>
												</form>
											</>
										)}
									</Formik>
								)}
							</div>
						</div>
						<div className='mt-4 select-none'>
							<Elements.SideDescription title='Delete Channel Permanently' description='This action will delete channel information , notifications, members, credentials and webhooks permanently. This action cannot be undone.' />
							<div className='mt-2 flex flex-col sm:flex-row items-start justify-start'>
								<div className='mr-2'>
									<Elements.Button
										onClick={() => {
											modal.confirmModal({
												actionName: 'Delete Channel',
												color: 'bg-red-600',
												description: 'Are you sure you want to delete this channel permanently?',
												title: 'Delete',
												onClick: () => {
													this.props.deleteChannel({ channel: this.props.params.id });
												}
											});
										}}
										className='w-32 p-2 text-white'
										type='button'
										color='bg-red-600'
										name='Delete Channel'
										loading={this.props.deletedChannel.isLoading}
									/>
								</div>
								<Elements.Button
									onClick={() => {
										modal.confirmModal({
											actionName: 'Inactivate Channel',
											color: 'bg-gray-700',
											description: 'Are you sure you want to inactivate this channel?',
											title: 'Inactivate',
											onClick: () => {
												this.props.inactivateChannel({ channel: this.props.params.id });
											}
										});
									}}
									className='w-40 mt-2 sm:mt-0 p-2 text-white'
									type='button'
									color='bg-gray-700'
									name='Inactivate Channel'
									loading={this.props.inactivatedChannel.isLoading}
								/>
							</div>
						</div>
					</>
				) : (
					// @ts-ignore
					<ChannelDetailMember id={this.props.params.id} details={this.state.details} />
				)}
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	details: state.channel.channelDetails,
	updatedDetails: state.channel.channelDetailsUpdate,
	categories: state.auth.categories,
	deletedChannel: state.channel.channelDelete,
	inactivatedChannel: state.channel.channelInactivate,
	uploadedLogo: state.channel.uploadLogo,
	channelLeft: state.channel.channelLeave
});

const mapDispatch = {
	getChannelDetails: ({ channel }: channelTypes.IChannelDetailsRequest) => channelActions.channelDetailsAction({ channel }),
	updateDetails: ({ channel, title, description, category }: channelTypes.IChannelDetailsUpdateRequest) => channelActions.channelDetailsUpdateAction({ channel, title, description, category }),
	getCategories: () => authActions.listCategoriesAction(),
	deleteChannel: ({ channel }: channelTypes.IChannelDeleteRequest) => channelActions.channelDeleteAction({ channel }),
	inactivateChannel: ({ channel }: channelTypes.IChannelInactivateRequest) => channelActions.channelInactivateAction({ channel }),
	uploadLogo: ({ channel, logo }: channelTypes.IUploadLogoRequest) => channelActions.uploadLogoAction({ channel, logo }),
	leaveChannel: ({ channel }: channelTypes.IChannelLeaveRequest) => channelActions.channelLeaveAction({ channel })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(ChannelDetails));
