import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Helmet } from 'react-helmet-async';
import Dropzone from 'react-dropzone';

import { Elements } from '../../components';
import { CreateChannelProps, CreateChannelStates } from '../../@types/pages/Channels';
import { connect, ConnectedProps } from 'react-redux';
import { alert, router } from '../../helpers';
import { RootState } from '../../store';
import { authActions, channelActions } from '../../actions';
import { channelTypes } from '../../@types/reducers';
import { ICategories } from '../../@types/reducers/auth';

import noImages from '../../assets/no-images.png';
import { ReactComponent as PrivateChannel } from '../../assets/private-channel.svg';
import { ReactComponent as CompletedStep } from '../../assets/step-completed.svg';
import { ReactComponent as UploadImageLogo } from '../../assets/uploadLogo.svg';

const validationSchemaStepTwo = Yup.object({
	title: Yup.string().required('Required'),
	description: Yup.string().required('Required')
});

class CreateChannel extends React.Component<CreateChannelProps & ConnectedProps<typeof connector>, CreateChannelStates> {
	state: CreateChannelStates = {
		stepPage: 1,
		categories: [],
		selectedCategory: null,
		title: '',
		description: '',
		channelType: 'Private',
		channelCategory: 'ALERT',
		files: []
	};

	pageSteps = [
		{
			title: 'Channel Type',
			description: 'Setup Your Channel Type'
		},
		{
			title: 'Channel Details',
			description: 'Setup Your Channel Details'
		},
		{
			title: 'Channel Category',
			description: 'Your Business Related Info'
		},
		{
			title: 'Channel Logo',
			description: 'Set Your Channel Logo'
		},
		{
			title: 'Preview',
			description: 'Check before you go'
		}
	];

	componentDidMount() {
		this.props.getCategories();
	}

	componentDidUpdate(prevProps: CreateChannelProps & ConnectedProps<typeof connector>) {
		if (prevProps.categories !== this.props.categories && !this.props.categories.isLoading) {
			this.setState({
				categories: this.props.categories.data as ICategories[]
			});
		}
		if (prevProps.uploadedLogo !== this.props.uploadedLogo && !this.props.uploadedLogo.isLoading) {
			let channel: string = this.props.uploadedLogo.request?.channel as string;
			this.props.navigate('/channels/' + channel + '/notifications');
		}
		if (prevProps.createdChannel !== this.props.createdChannel && !this.props.createdChannel.isLoading) {
			let data: channelTypes.ICreateChannel = this.props.createdChannel.data as channelTypes.ICreateChannel;
			alert.fire({
				message: this.props.createdChannel.error ? (this.props.createdChannel.data as unknown as any).message : 'The channel has just been created successfully',
				error: this.props.createdChannel.error
			});
			if (!this.props.createdChannel.error) {
				if (!this.state.files || this.state.files.length === 0) {
					this.props.navigate('/channels/' + data.channel + '/notifications');
				} else {
					this.props.uploadLogo({ logo: this.state.files[0], channel: data.channel });
				}
			} else {
				this.props.navigate('/channels');
			}
		}
	}

	stepDescription = (title: string, description: string) => (
		<>
			<div className='select-none'>
				<div className='text-dark-grey-blue text-3xl font-medium'>{title ?? ''}</div>
				<div className='text-bluey-grey py-2 opacity-90'>{description ?? ''}</div>
			</div>
		</>
	);

	stepButtons = () => (
		<div className='flex flex-col space-y-4 '>
			<Elements.Button
				onClick={() => {
					this.setState({ stepPage: this.state.stepPage + 1 });
				}}
				type='submit'
				name='Continue'
				className='p-2 text-white mt-4'
			/>
			<Elements.Button
				onClick={() => {
					this.setState({
						stepPage: this.state.stepPage - 1
					});
				}}
				type='button'
				name='Back'
				color='bg-transparent'
				className='rounded-lg border p-2 mt-4'
			/>
		</div>
	);
	allSubmit = () => {
		this.props.createChannel({
			title: this.state.title,
			description: this.state.description,
			type: this.state.channelType as 'Private' | 'Public',
			slug: '',
			category: this.state.channelCategory as string
		});
		this.setState({
			title: '',
			description: '',
			channelType: null,
			selectedCategory: null,
			files: []
		});
	};
	radioCheck = (index: string, _category: ICategories) => {
		this.setState({
			selectedCategory: _category,
			channelCategory: index
		});
	};

	stepTwoOnSubmit = (values: { title: string; description: string }) => {
		this.setState({
			title: values.title,
			description: values.description
		});
		this.setState({ stepPage: this.state.stepPage + 1 });
	};

	render() {
		const { files } = this.state;
		return (
			<>
				<Helmet>
					<title>Create Channel | Beepy</title>
				</Helmet>
				<div className='flex min-h-[calc(100vh_-_5rem)]'>
					<div className='bg-dark hidden w-1/3 flex-shrink-0 px-8 text-white lg:block select-none'>
						<div className='mt-16 flex flex-col md:justify-start'>
							{this.pageSteps.map((step, index) => (
								<div key={index}>
									{index !== 0 && (
										<div className='-mt-2 flex w-8 items-center justify-center'>
											<div className='h-12 rounded border-[1.5px] border-solid border-white mb-2' />
										</div>
									)}
									<div className='flex'>
										<div className={`flex mr-4 h-8 w-8 items-center justify-center rounded-full border-2 border-white text-lg ${this.state.stepPage - 1 === index && 'bg-primary'}`}>
											{this.state.stepPage - 1 > index && (
												<div className='flex items-center justify-center'>
													<CompletedStep className='w-8' />
												</div>
											)}
											{this.state.stepPage - 1 <= index && <div className='h-2 w-2 rounded-full bg-white' />}
										</div>
										<div>
											<div>{step.title}</div>
											<div className='opacity-50'>{step.description}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Step One */}
					{this.state.stepPage === 1 && (
						<>
							<div className='flex flex-shrink-0 flex-grow items-center justify-center'>
								<div className='flex items-center justify-center'>
									<div className='flex flex-shrink-0 flex-grow items-center justify-center'>
										<div className='w-[18rem] sm:w-[40rem]'>
											<form
												onSubmit={() => {
													this.setState({ stepPage: this.state.stepPage + 1 });
												}}
												className='flex flex-col'>
												<div className='space-y-8 mb-4'>
													{this.stepDescription('Choose Channel Type', 'Please choose one of the best channel types below for you.')}
													<div className='mb-4 flex items-start space-x-4 rounded-lg border-[1px] gray-400 p-4 ring-[0.1px]'>
														<div className='rounded-full bg-yellow-500 p-2'>
															<PrivateChannel />
														</div>
														<div className='flex-grow'>
															<div className='text-dark'>Private Channel</div>
															<div className='text-battleship-grey text-sm'>Private channels are used for special projects.</div>
														</div>
														<input type='radio' defaultChecked={this.state.channelType === 'Private'} required name='channel-type' />
													</div>
												</div>
												<Elements.Button type='submit' name='Continue' />
											</form>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
					{/* Step One */}
					{/* Step Two */}
					{this.state.stepPage === 2 && (
						<>
							<div className='flex flex-shrink-0 flex-grow items-center justify-center'>
								<div className='w-[18rem] sm:w-[40rem]'>
									<Formik
										validateOnBlur={false}
										validateOnChange={false}
										initialValues={{ title: this.state.title, description: this.state.description }}
										validationSchema={validationSchemaStepTwo}
										onSubmit={(values) => {
											this.stepTwoOnSubmit(values);
										}}>
										{({ handleSubmit, handleChange, values, errors }) => (
											<>
												<form onSubmit={handleSubmit} className='sticky flex flex-col'>
													<div className='space-y-8'>
														{this.stepDescription('Channel Details', 'Create your channel title and description.')}
														<div className='flex flex-col space-y-2 rounded-lg'>
															<Elements.InputLabel label='Channel Title' for='channeltitle' />
															<Elements.Input id='title' value={values.title} onChange={handleChange} type='text' placeholder='e.g. New channel' />
															<Elements.FormErrorText error={errors.title} />
														</div>
														<div className='flex flex-col space-y-2 rounded-lg'>
															<Elements.InputLabel for='description' label='Description' />
															<Elements.Textarea value={values.description} id='description' onChange={handleChange} rows={6} maxLength={275} placeholder='e.g. This is my new Beepy channel' />
															<Elements.FormErrorText error={errors.description} />
														</div>
													</div>
													<div className='flex flex-col space-y-4 '>
														<Elements.Button type='submit' name='Continue' className='p-2 text-white mt-4' />
														<Elements.Button
															onClick={() => {
																this.setState({
																	stepPage: this.state.stepPage - 1
																});
															}}
															type='button'
															name='Back'
															color='bg-transparent'
															className='rounded-lg border p-2 mt-4'
														/>
													</div>
												</form>
											</>
										)}
									</Formik>
								</div>
							</div>
						</>
					)}
					{/* Step Two */}
					{/* Step Three */}
					{this.state.stepPage === 3 && (
						<div className='flex flex-grow items-center justify-center '>
							<div className='w-[18rem] sm:w-[35rem] md:w-[40rem]'>
								{this.stepDescription('Channel Category', 'Please choose one of the best categories below for you.')}
								<div className='h-[30rem] scrollbar rounded-lg p-1 space-y-5 mt-4'>
									{this.state.categories &&
										Object.entries(this.state.categories).map(([index, _category]) => (
											<div key={index}>
												<div onClick={() => this.radioCheck(index, _category)}>
													<div className={`${this.state.channelCategory === index ? 'bg-yellow-500/10 ring-yellow-500' : 'ring-gray-200'} flex cursor-pointer items-center justify-between space-x-4 rounded-lg py-2 px-4 ring-[1.5px] transition-colors`}>
														<div>
															<div className='font-medium text-dark-grey-blue'>{_category.title}</div>
															<div className='text-bluey-grey'>{_category.description}</div>
														</div>
														<input name='category' value={index} checked={this.state.channelCategory === index} type='radio' />
													</div>
												</div>
											</div>
										))}
								</div>
								{this.stepButtons()}
							</div>
						</div>
					)}
					{/* Step Three */}
					{/* Step Four */}
					{this.state.stepPage === 4 && (
						<div className='flex flex-shrink-0 flex-grow items-center justify-center'>
							<div className='w-[18rem] sm:w-[40rem]'>
								<form className='flex flex-col'>
									<div className='space-y-8'>
										{this.stepDescription('Channel Logo', 'Create your channel logo.')}
										{/* UPLOAD IMAGE */}
										{files && files.length === 0 ? (
											<Dropzone
												accept='image/jpg, image/jpeg, image/png'
												multiple={false}
												onDrop={(acceptedFiles) => {
													this.setState({
														files: acceptedFiles.map((file) =>
															Object.assign(file, {
																preview: URL.createObjectURL(file)
															})
														)
													});
												}}>
												{({ getRootProps, getInputProps }) => (
													<div {...getRootProps({ className: 'dropzone' })} className='w-[18rem] sm:w-[40rem] max-h-auto flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-[1.5px] gray-400 p-6 text-center transition-colors hover:border-yellow-500'>
														<input {...getInputProps()} />
														<div className='rounded-full bg-gray-100 p-2'>
															<div className='rounded-full bg-gray-200 p-2'>
																<UploadImageLogo />
															</div>
														</div>
														<div className='font-medium text-gray-500'>
															<div className='text-sm'>
																<span className='select-none text-sm text-indigo-600'>Click to upload</span> or drag and drop
															</div>
															<div className='text-xs'>JPG, JPEG, PNG allowed (Maximum: 512x512, Minimum: 128x128)</div>
														</div>
													</div>
												)}
											</Dropzone>
										) : (
											<>
												{files.map((file) => (
													<div className={`rounded-lg border-[3px] gray-400 space-y-4 transition-colors hover:border-yellow-500`} key={file.name}>
														<img className={'w-[40rem] h-auto rounded-lg '} src={file.preview} alt={''} />
													</div>
												))}
											</>
										)}
									</div>
								</form>
								{this.stepButtons()}
							</div>
						</div>
					)}
					{/* Step Four */}
					{/* Step Five */}
					{this.state.stepPage === 5 && (
						<div className='flex flex-shrink-0 flex-grow items-center justify-center'>
							<div className='w-[18rem] sm:w-[40rem]'>
								<form onSubmit={this.allSubmit} className='flex flex-col'>
									<div className='space-y-6'>
										{this.stepDescription('Almost Done!', 'Please check your channel details before create!')}
										<div className='grid grid-rows-2 rounded-lg ring-[1.5px] ring-gray-200'>
											<div className='flex space-x-4 px-6 py-4'>
												{/* the picture will come */}
												{files.length > 0 ? files.map((file) => <img className={'w-[5rem] h-auto rounded-lg '} src={file.preview} alt={''} />) : <img className={'w-[5rem] h-auto rounded-lg '} src={noImages} alt='' />}

												<div className='flex flex-col space-y-1'>
													<div className='flex space-x-2'>
														<div className='font-semibold text-dark-grey-blue'>Title</div>
														<Elements.Status text='Active' ping={true} />
													</div>
													<div className='text-sm text-bluey-grey'>Description</div>
												</div>
											</div>
											<div className='flex items-center bg-[#e9eaec]'>
												<div className='flex space-x-14 px-8'>
													<div className='flex flex-col'>
														<div className='text-sm font-medium text-gray-400'>Type</div>
														<div className='font-semibold uppercase text-black/60'>{this.state.channelType}</div>
													</div>
													<div className='flex flex-col'>
														<div className='text-sm font-medium text-gray-400'>Category</div>
														<div className='font-semibold uppercase text-black/60'>{this.state.channelCategory}</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</form>
								<div className='flex flex-col space-y-4 '>
									<Elements.Button loading={this.props.createdChannel.isLoading || this.props.uploadedLogo.isLoading} onClick={this.allSubmit} type='submit' name='Create' className='p-2 text-white mt-4' />
									<Elements.Button
										onClick={() => {
											this.setState({
												stepPage: this.state.stepPage - 1
											});
										}}
										type='button'
										name='Back'
										color='bg-transparent'
										className='rounded-lg border p-2 mt-4'
									/>
								</div>
							</div>
						</div>
					)}
					{/* Step Five */}
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	categories: state.auth.categories,
	createdChannel: state.channel.createChannel,
	uploadedLogo: state.channel.uploadLogo
});

const mapDispatch = {
	getCategories: () => authActions.listCategoriesAction(),
	createChannel: ({ title, description, type, slug, category }: channelTypes.ICreateChannelRequest) => channelActions.createChannelAction({ title, description, type, slug, category }),
	uploadLogo: ({ channel, logo }: channelTypes.IUploadLogoRequest) => channelActions.uploadLogoAction({ channel, logo })
};

const connector = connect(mapState, mapDispatch);

export default connector(router.withRouter(CreateChannel));
