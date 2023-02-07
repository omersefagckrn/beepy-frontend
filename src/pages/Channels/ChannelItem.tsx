import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { ChannelsListTypes } from '../../@types/pages';

import { channels, modal } from '../../helpers';

import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';
import { ReactComponent as ChannelLock } from '../../assets/channel-lock.svg';
import { Elements } from '../../components';

class Channel extends React.Component<ChannelsListTypes.ChannelProps, ChannelsListTypes.ChannelStates> {
	channelDescription = (title: string, description: string | number | boolean) => (
		<div className={`${title !== 'Type' && 'ml-6'}`}>
			<div className='text-cloudy-blue text-opacity-60'>{title}</div>
			<div className='text-dark font-bold'>{description}</div>
		</div>
	);

	render() {
		const { index, channel, channelLength, isFocused, setFocus } = this.props;

		return (
			<div className={`border-[0.1px] border-gray-300 shadow-md ${channelLength - 1 !== index && 'mb-4'}`}>
				<div
					onClick={() => {
						setFocus(index);
					}}
					className='px-2 w-full py-6 md:px-8'>
					<div className='flex items-start justify-between'>
						<div className='absolute select-none'>
							<img src={channel.logo} alt={''} className='h-16 w-16 rounded-[4px] object-cover' />
							{channel.type === 'PRIVATE' && (
								<div className='absolute -right-2 -bottom-[0.3rem] inline-flex rounded-full'>
									<ChannelLock />
								</div>
							)}
						</div>
						<div className='ml-20'>
							<div className='flex items-center justify-start'>
								<div className='line-clamp-1 flex items-center justify-start'>
									<div className='text-dark-grey-blue flex text-lg font-semibold'>
										<span className='max-w-[8rem] truncate sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl'>{channel.title}</span>
										<div className={`ml-4 flex items-center justify-center rounded-full bg-opacity-20 px-2 py-[0.15rem] text-xs ${channels.getChannelColor(channel.status)} ${channels.getChannelTextColor(channel.status)}`}>
											<span className='sticky mr-2 flex h-2 w-2 items-center justify-between'>
												<span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${channels.getChannelColor(channel.status)}`}></span>
												<span className={`sticky inline-flex h-2 w-2 rounded-full ${channels.getChannelColor(channel.status)}`}></span>
											</span>
											<span className='text-xs capitalize'>{channel.status.toLowerCase()}</span>
										</div>
									</div>
								</div>
							</div>
							<div className={`text-cloudy-blue select-none text-xs ${this.props.channel.status === 'INACTIVE' && 'mb-4'} `}>{channel.slug}</div>
							{this.props.channel.status === 'ACTIVE' && <div className='text-cloudy-blue line-clamp-1 w-auto text-sm lg:w-[55rem]'>{channel.last_notification !== null ? channel.last_notification.description : channel.description}</div>}
						</div>
						<div className='w-16 hidden h-16 relative select-none cursor-pointer items-center justify-end lg:flex'>
							<Tooltip title={isFocused ? 'Hide' : 'Show'} placement='bottom' arrow>
								<Chevron className={`${isFocused ? 'rotate-0' : 'rotate-180'} opacity-30 duration-700`} />
							</Tooltip>
						</div>
					</div>
				</div>

				{isFocused && (
					<div className='shadow-box bg-cloudy-blue bg-opacity-30 px-2 py-5 md:px-8 sm:flex select-none items-start justify-between'>
						<div className='flex items-start text-[0.6rem] sm:text-sm justify-start'>
							<div>{this.channelDescription('Type', channel.type)}</div>
							<div>{this.channelDescription('Category', channel.category)}</div>
							<div>{this.channelDescription('Members', channel.members)}</div>
							<div>{this.channelDescription('You Are', channel.isOwner ? 'Owner' : 'Member')}</div>
							{channel.status === 'INACTIVE' && (
								<>
									{/* <div>{this.channelDescription('Inactivated', channel.inactivated_date)}</div> */}
									<div>{this.channelDescription('Created', channel.date)}</div>
								</>
							)}
						</div>
						<div className='flex items-start justify-start text-[0.6rem] sm:text-sm mt-2 md:mt-0'>
							{channel.status !== 'ACTIVE' || 'INACTIVE' ? (
								channel.status === 'ACTIVE' ? (
									<Link to={`/channels/${channel.guid}/notifications`} className='text-primary'>
										<div className='flex items-center justify-center'>
											See Details
											<div className='ml-1 w-4 md:ml-2'>
												<RightArrow fill='orange' />
											</div>
										</div>
									</Link>
								) : (
									<div>
										<Elements.Button
											type='button'
											name='Activate Channel'
											color='bg-primary'
											loading={this.props.activateChannelState.isLoading}
											onClick={() => {
												modal.confirmModal({
													actionName: 'Activate Channel',
													description: 'Are you sure you want to activate this channel?',
													color: 'bg-primary',
													title: 'Activate',
													onClick: () => {
														this.props.activateChannel(this.props.channel.guid);
													}
												});
											}}
										/>
										<Elements.Button
											className='ml-2 text-white p-2'
											type='button'
											name='Delete Channel'
											color='bg-red-600'
											loading={this.props.deletedChannel.isLoading}
											onClick={() => {
												modal.confirmModal({
													actionName: 'Delete Channel',
													color: 'bg-red-600',
													description: 'Are you sure you want to delete this channel permanently?',
													title: 'Delete',
													onClick: () => {
														this.props.deleteChannel(this.props.channel.guid);
													}
												});
											}}
										/>
									</div>
								)
							) : (
								<div className='cursor-pointer text-bluey-grey'>Please Contact Us</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Channel;
