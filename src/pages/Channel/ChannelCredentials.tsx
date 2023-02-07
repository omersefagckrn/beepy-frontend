import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';
import { Tooltip } from '@mui/material';

import { channelTypes } from '../../@types/reducers';
import { ChannelCredentialsTypes } from '../../@types/pages';

import { RootState } from '../../store';
import { alert, modal, router } from '../../helpers';
import { channelActions } from '../../actions';

import { ReactComponent as ArrowUpRight } from '../../assets/arrow-up-right.svg';
import { Elements } from '../../components';
import PasswordConfirmation from '../../components/Modal/PasswordConfirmation';

const validationSchema = Yup.object({
	serverName: Yup.string().required('Required'),
	ipAddress: Yup.string().required('Required')
});

class ChannelCredentials extends React.Component<ChannelCredentialsTypes.ChannelCredentialsProps & ConnectedProps<typeof connector>, ChannelCredentialsTypes.ChannelCredentialsStates> {
	modal: React.RefObject<PasswordConfirmation>;
	formik: React.RefObject<FormikProps<{ serverName: string; ipAddress: string }>>;

	constructor(props: ChannelCredentialsTypes.ChannelCredentialsProps & ConnectedProps<typeof connector>) {
		super(props);
		this.modal = React.createRef<PasswordConfirmation>();
		this.formik = React.createRef<FormikProps<{ serverName: string; ipAddress: string }>>();
	}

	state: ChannelCredentialsTypes.ChannelCredentialsStates = {
		showApiKey: false,
		whiteLists: null,
		credentials: null,
		limits: null
	};

	componentDidMount() {
		this.props.getWhiteList({ channel: this.props.params.id });
		this.props.getCredentials({ channel: this.props.params.id });
		this.props.getLimits({ channel: this.props.params.id });
	}

	componentDidUpdate(prevProps: ChannelCredentialsTypes.ChannelCredentialsProps & ConnectedProps<typeof connector>) {
		if (prevProps.whiteLists !== this.props.whiteLists && !this.props.whiteLists.isLoading && !this.props.whiteLists.error && this.props.whiteLists.success) {
			this.setState({
				whiteLists: this.props.whiteLists.data as channelTypes.IWhiteListGet[]
			});
		} else if (prevProps.credentials !== this.props.credentials && !this.props.credentials.isLoading && !this.props.credentials.error && this.props.credentials.success) {
			this.setState({
				credentials: this.props.credentials.data as channelTypes.ICredentialsGet
			});
		} else if (prevProps.limits !== this.props.limits && !this.props.limits.isLoading && !this.props.limits.error && this.props.limits.success) {
			this.setState({
				limits: this.props.limits.data as unknown as channelTypes.IChannelLimits
			});
		}

		if (prevProps.addWhiteListState !== this.props.addWhiteListState && !this.props.addWhiteListState.isLoading) {
			alert.fire({
				message: this.props.addWhiteListState.error ? (this.props.addWhiteListState.data as unknown as any).message : 'The IP adress has just been added successfuly.',
				error: this.props.addWhiteListState.error
			});

			this.props.getWhiteList({ channel: this.props.params.id });
			this.props.getLimits({ channel: this.props.params.id });
		}

		if (prevProps.deleteWhiteListState !== this.props.deleteWhiteListState && !this.props.deleteWhiteListState.isLoading) {
			alert.fire({
				message: this.props.deleteWhiteListState.error ? (this.props.deleteWhiteListState.data as unknown as any).message : 'The ip address has just been deleted successfully!',
				error: this.props.deleteWhiteListState.error
			});
			this.props.getWhiteList({ channel: this.props.params.id });
			this.props.getLimits({ channel: this.props.params.id });
		}

		if (prevProps.newCredentials !== this.props.newCredentials && !this.props.newCredentials.isLoading) {
			alert.fire({
				message: this.props.newCredentials.error ? (this.props.newCredentials.data as unknown as any).message : 'The credentials have just been updated successfully!',
				error: this.props.newCredentials.error
			});

			this.props.getCredentials({ channel: this.props.params.id });
		}
	}

	toggleShowApiKey = () => {
		this.setState({ showApiKey: !this.state.showApiKey });
	};

	onSubmit = (values: { serverName: string; ipAddress: string }) => {
		this.formik.current?.resetForm();
		this.props.addWhiteList({ channel: this.props.params.id, ip: values.ipAddress, label: values.serverName });
	};

	render() {
		const { whiteLists, credentials, limits } = this.state;

		if (!whiteLists || !credentials || !limits) return null;

		return (
			<>
				<PasswordConfirmation
					ref={this.modal}
					onSubmit={(password) => {
						this.props.renewApiKey({ channel: this.props.params.id as string, password });
					}}
					title='Renew API Key'
					description='Please enter your password for renewing API key.'
					action='Renew'
				/>
				<div className='text-bluey-grey'>
					<Elements.SideDescription type='title' title='Channel Credentials' description='Channel credentials to use to send notifications. These are secrets. Do not share with anyone or anywhere in public.' />
					<div className='border-b gray-400 py-5 sm:flex gap-8'>
						<div className='basis-2/5'>
							<Elements.SideDescription title='Developer Tool' description='Please see our documentation how to use Beepy API or Webhooks to send notifications to your channels.' />
						</div>
						<div className='flex basis-3/5 items-center self-start md:justify-between mt-2 md:mt-0'>
							<div>
								<div className='select-none text-sm text-gray-400'>Developers</div>
								<div className='flex'>
									<a target='_blank' rel='noreferrer' href='https://api.beepy.io/' className='text-primary hover:underline'>
										<div className='flex items-end justify-end'>
											api.beepy.io
											<ArrowUpRight className='ml-1 h-[1.5rem] w-[1.2rem]' />
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className='border-b gray-400 py-5 sm:flex gap-8'>
						<Elements.SideDescription title='API Key' description='The Beepy API uses API keys to authenticate requests. You can view and manage your API key.' />
						<div className='flex basis-3/5 md:items-start flex-col md:flex-row md:justify-between'>
							<div className='basis-5/6 xxs:mt-2 md:mt-0'>
								<div className='select-none text-sm'>API Key</div>
								<div className={`${this.state.showApiKey ? 'xxs:text-[0.72rem]' : 'xxs:text-[0.8rem]'} tracking-widest sm:text-[0.90rem] md:text-[1rem]`}>{this.state.showApiKey ? credentials?.apikey : '••••••••••••••••••••••••••••••' + (credentials?.apikey ? credentials?.apikey.substring(credentials?.apikey.length - 4) : '')}</div>
							</div>
							<div className='flex cursor-pointer select-none items-center md:justify-start md:self-center'>
								{this.state.showApiKey ? (
									<Tooltip title='Hide Api Key' placement='bottom' arrow>
										<div>
											<FaEye className='h-[1rem] w-[1rem] self-end' onClick={this.toggleShowApiKey} />
										</div>
									</Tooltip>
								) : (
									<Tooltip title='Show Api Key' placement='bottom' arrow>
										<div>
											<FaEyeSlash className='h-[1rem] w-[1rem] self-end' onClick={this.toggleShowApiKey} />
										</div>
									</Tooltip>
								)}
								<Tooltip title='Renew Api Key' placement='bottom' arrow>
									<div onClick={() => this.modal.current?.show()} className='ml-5'>
										<FaSync size={12} />
									</div>
								</Tooltip>
							</div>
						</div>
					</div>

					<div className='border-b gray-400 py-5 sm:flex gap-8'>
						<Elements.SideDescription title='Add New IP Address to Whitelist' description='If you do not have any whitelisted ip address, The Beepy API allows access from anywhere.' />
						<div className='basis-3/5'>
							<Formik
								innerRef={this.formik}
								validateOnBlur={false}
								validateOnChange={false}
								initialValues={{ serverName: '', ipAddress: '' }}
								validationSchema={validationSchema}
								onSubmit={(values) => {
									this.onSubmit(values);
								}}>
								{({ handleSubmit, handleChange, values, errors }) => (
									<>
										<form onSubmit={handleSubmit}>
											<div className='sm:flex sm:items-start sm:justify-between'>
												<div className='w-full flex flex-col sm:w-1/2'>
													<label className='text-slate-blue mt-2 flex items-center justify-between text-sm sm:mt-0'>
														<Elements.InputLabel for='label' label='Label' />
														<div>IP Whitelist Limit {limits.whitelist.whitelist_count + '/' + limits.whitelist.max_limit}</div>
													</label>
													<Elements.Input onChange={handleChange} value={values.serverName} type='text' id='serverName' placeholder='e.g. Home IP Address' />
													<Elements.FormErrorText error={errors.serverName} />
												</div>
												<div className='w-full mt-2 flex flex-col sm:mt-0 sm:ml-4 sm:w-1/2'>
													<Elements.InputLabel for='ipAddress' label='IP Address' />
													<Elements.Input onChange={handleChange} value={values.ipAddress} type='text' id='ipAddress' placeholder='e.g. 192.168.1.1 or IPv6' />
													<Elements.FormErrorText error={errors.ipAddress} />
												</div>
											</div>
											<div className='mt-4'>
												<Elements.Button className='w-36 text-white p-2' loading={this.props.addWhiteListState.isLoading} name='Save IP Address' type='submit' />
											</div>
										</form>
									</>
								)}
							</Formik>
						</div>
					</div>

					<div className='py-5 sm:flex gap-8'>
						<Elements.SideDescription title='IP Whitelist' description='You can restrict access to your channel by adding your ip address to whitelist. If you do not have any whitelisted ip address, your api key allows request from anywhere.' />
						<div className='basis-3/5 xxs:mt-2 md:mt-0'>
							{whiteLists.length > 0 ? (
								whiteLists.map((server, index) => (
									<div key={index} className={`${whiteLists.length - 1 !== index && 'border-b gray-400'} ${whiteLists.length - 1 !== index && 'mb-4'} flex items-start justify-between p-2 md:p-4 pb-4 hover:rounded hover:bg-[#f1f1f1]`}>
										<div className='basis-5/6'>
											<div className='text-dark-grey-blue xxs:max-w-[8rem] w-full truncate sm:max-w-[12rem]'>{server.label}</div>
											<div>{server.ip}</div>
										</div>
										<div
											onClick={() => {
												modal.confirmModal({
													actionName: 'Delete',
													color: 'bg-red-600',
													description: 'Are you sure you want to delete this ip address?',
													title: 'Delete IP Address',
													onClick: () => {
														this.props.deleteWhiteList({ channel: this.props.params.id, ip: server.guid });
													}
												});
											}}
											className='flex w-full select-none items-center justify-between self-start align-middle'>
											<div>{server.date}</div>
											<Elements.Trash />
										</div>
									</div>
								))
							) : (
								<div>There is no any whitelisted ip address.</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapState = (state: RootState) => ({
	whiteLists: state.channel.getWhiteList,
	addWhiteListState: state.channel.addWhiteList,
	deleteWhiteListState: state.channel.deleteWhiteList,
	credentials: state.channel.credentialsGet,
	limits: state.channel.channelLimits,
	newCredentials: state.channel.credentialsRenew
});

const mapDispatch = {
	getWhiteList: ({ channel }: channelTypes.IWhiteListGetRequest) => channelActions.whiteListGetAction({ channel }),
	addWhiteList: ({ channel, ip, label }: channelTypes.IAddWhiteListRequest) => channelActions.addWhiteListAction({ channel, ip, label }),
	getCredentials: ({ channel }: channelTypes.ICredentialsGetRequest) => channelActions.credentialsGetAction({ channel }),
	getLimits: ({ channel }: channelTypes.IChannelLimitsRequest) => channelActions.channelLimitsAction({ channel }),
	deleteWhiteList: ({ channel, ip }: channelTypes.IDeleteWhiteListRequest) => channelActions.deleteWhiteListAction({ channel, ip }),
	renewApiKey: ({ password, channel }: channelTypes.ICredentialsRenewRequest) => channelActions.credentialsRenewAction({ password, channel })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withParams(ChannelCredentials));
