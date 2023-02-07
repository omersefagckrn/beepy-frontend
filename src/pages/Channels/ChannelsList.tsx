import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { AiOutlinePlus } from 'react-icons/ai';

import { ChannelsListTypes } from '../../@types/pages';
import { channelTypes } from '../../@types/reducers';
import { ChannelsStatus } from '../../@types/pages/Channels/';

import { RootState } from '../../store';
import { channelActions } from '../../actions';

import Channel from './ChannelItem';
import { alert, router } from '../../helpers';
class Channels extends React.Component<ChannelsListTypes.ChannelsProps & ConnectedProps<typeof connector>, ChannelsListTypes.ChannelsStates> {
	state: ChannelsListTypes.ChannelsStates = {
		channels: null,
		focusedChannel: null
	};

	deleteChannel = (guid: string) => {
		this.props.deleteChannel({ channel: guid });
	};

	activateChannel = (guid: string) => {
		this.props.activateChannel({ channel: guid });
	};

	componentDidMount() {
		this.props.getChannelList(this.props.type);
	}

	componentDidUpdate(prevProps: ChannelsListTypes.ChannelsProps & ConnectedProps<typeof connector>) {
		if (prevProps.type !== this.props.type) {
			this.setState({
				channels: null
			});

			this.props.getChannelList(this.props.type);
		}

		if (prevProps.deletedChannel !== this.props.deletedChannel && !this.props.deletedChannel.isLoading) {
			alert.fire({
				message: this.props.deletedChannel.error ? (this.props.deletedChannel.data as unknown as any).message : 'The channel has just been deleted successfully!',
				error: this.props.deletedChannel.error
			});

			this.setState({
				channels: null
			});

			this.props.getChannelList(this.props.type);
			if (!this.props.deletedChannel.error && this.props.deletedChannel.success && this.state.channels?.list && this.state.channels?.list.length - 1 === 0) this.props.navigate('/channels', { replace: true });
		}
		if (prevProps.activateChannelState !== this.props.activateChannelState && !this.props.activateChannelState.isLoading) {
			alert.fire({
				message: this.props.activateChannelState.error ? (this.props.activateChannelState.data as unknown as any).message : 'The channel has just been activated successfully!',
				error: this.props.activateChannelState.error
			});

			this.setState({
				channels: null
			});

			this.props.getChannelList(this.props.type);
			if (!this.props.activateChannelState.error && this.props.activateChannelState.success && this.state.channels?.list && this.state.channels?.list.length - 1 === 0) this.props.navigate('/channels', { replace: true });
		}

		if (prevProps.channelList !== this.props.channelList && !this.props.channelList.isLoading && !this.props.channelList.error && this.props.channelList.success) {
			this.setState({
				channels: this.props.channelList.data as channelTypes.IChannelList
			});
		}
	}

	setFocus = (index: number) => {
		this.setState({
			focusedChannel: this.state.focusedChannel === index ? null : index
		});
	};

	render() {
		const { channels } = this.state;
		if (!channels) return null;

		return (
			<main className='mx-auto w-full max-w-[70rem] flex-grow'>
				<Helmet>
					<title>{this.props.type === ChannelsStatus.INACTIVE ? 'Inactive Channels | Beepy' : 'Channels | Beepy'}</title>
				</Helmet>
				<div className='mt-4 select-none p-2 flex items-start flex-col md:flex-row md:justify-between'>
					<div>
						<div className='text-dark-grey-blue text-3xl font-semibold'>{this.props.type === ChannelsStatus.INACTIVE ? 'Inactive Channels' : 'Channels'}</div>
						<div className='text-bluey-grey py-3 font-light'>Your own or invited channels are listed below.</div>
					</div>
					{this.props.type === ChannelsStatus.ACTIVE && (
						<Link to='create'>
							<div className='bg-primary w-full items-center justify-center rounded-lg p-2'>
								<div className='flex items-center justify-between text-white'>
									<AiOutlinePlus size={18} />
									<div className='ml-1'>Create Channel</div>
								</div>
							</div>
						</Link>
					)}
				</div>
				{this.state.channels?.inactive_channels_count && this.state.channels?.inactive_channels_count > 0 && this.props.type !== ChannelsStatus.INACTIVE ? (
					<div className='mb-4 mr-2 flex cursor-pointer select-none items-start justify-end'>
						<Link to='inactive' replace={true}>
							<div className='w-full text-lg font-semibold text-gray-500 underline'>Inactive Channels ({this.state.channels.inactive_channels_count})</div>
						</Link>
					</div>
				) : null}

				{channels.list && Array.isArray(channels.list) && channels.list.length > 0 ? (
					channels.list.map((channel, index) => (
						<Channel deletedChannel={this.props.deletedChannel} deleteChannel={this.deleteChannel} key={index} setFocus={this.setFocus} channelLength={channels.list.length} index={index} channel={channel} isFocused={this.state.focusedChannel === index} activateChannel={this.activateChannel} activateChannelState={this.props.activateChannelState} />
					))
				) : (
					<>
						<div className='create mx-auto w-80 text-center'>
							<p className='select-none pt-24 pb-2 text-xl text-black'>Welcome to Beepy!</p>
							<div className='text-bluey-grey flex flex-col items-center justify-center text-sm font-light'>
								<p>Let's create your first channel and send notifications.</p>
								<p className='py-2'>
									You can also check our
									<a className={'text-primary ml-1 mr-1'} href={'https://api.beepy.io/'}>
										documentation
									</a>
									page how to send notifications to your channels via API or Webhooks.
								</p>
							</div>
						</div>

						<div className='mx-auto mt-4 w-full max-w-full select-none rounded-md p-4 opacity-20 shadow'>
							<div className='flex space-x-4'>
								<div className='bg-bluey-grey h-16 w-16 rounded-lg object-cover'></div>
								<div className='flex-1 space-y-3 py-1'>
									<div className='flex items-start justify-start'>
										<div className='bg-bluey-grey h-3 rounded-lg sm:w-[10rem]'></div>
										<div className='bg-bluey-grey ml-2 h-3 rounded-lg sm:w-[10rem]'></div>
									</div>
									<div>
										<div className='grid grid-cols-3 gap-4'>
											<div className='bg-bluey-grey col-span-2 h-2 rounded-lg sm:w-[24rem]'></div>
											<div className='bg-bluey-grey col-span-1 h-5 rounded-lg'></div>
										</div>
										<div className='bg-bluey-grey h-2 rounded-lg sm:w-[15rem]'></div>
									</div>
									<div className='flex items-center justify-center'>
										<div className='bg-bluey-grey h-2 rounded-lg sm:w-[8rem]'></div>
									</div>
								</div>
							</div>
						</div>
						<div className='border-bluey-grey mx-auto mt-4 w-full max-w-full select-none rounded-md p-4 opacity-20 shadow'>
							<div className='flex space-x-4'>
								<div className='bg-bluey-grey h-16 w-16 rounded-lg object-cover'></div>
								<div className='flex-1 space-y-3 py-1'>
									<div className='flex items-start justify-start'>
										<div className='bg-bluey-grey h-3 rounded-lg sm:w-[10rem]'></div>
										<div className='bg-bluey-grey ml-2 h-3 rounded-lg sm:w-[10rem]'></div>
									</div>
									<div>
										<div className='grid grid-cols-3 gap-4'>
											<div className='bg-bluey-grey col-span-2 h-2 rounded-lg sm:w-[24rem]'></div>
											<div className='bg-bluey-grey col-span-1 h-5 rounded-lg'></div>
										</div>
										<div className='bg-bluey-grey h-2 rounded-lg sm:w-[15rem]'></div>
									</div>
								</div>
							</div>
							<div className='mt-10 flex flex-col space-y-3 py-1'>
								<div className='flex'>
									<div className='flex items-start justify-start'>
										<div className='bg-bluey-grey h-3 rounded-lg sm:w-[3rem]'></div>
										<div className='bg-bluey-grey ml-2 h-3 rounded-lg sm:w-[8rem]'></div>
									</div>
									<div className='ml-4 flex items-start justify-start'>
										<div className='bg-bluey-grey h-3 rounded-lg sm:w-[3rem]'></div>
										<div className='bg-bluey-grey ml-2 h-3 rounded-lg sm:w-[8rem]'></div>
									</div>
								</div>
								<div className='flex'>
									<div className='flex items-start justify-start'>
										<div className='bg-bluey-grey h-3 rounded-lg sm:w-[5rem]'></div>
										<div className='bg-bluey-grey ml-2 h-3 rounded-lg sm:w-[8rem]'></div>
									</div>
									<div className='ml-4 flex items-start justify-start'>
										<div className='bg-bluey-grey h-3 rounded-lg sm:w-[5rem]'></div>
										<div className='bg-bluey-grey ml-2 h-3 rounded-lg sm:w-[8rem]'></div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</main>
		);
	}
}

const mapState = (state: RootState) => ({
	channelList: state.channel.channelList,
	deletedChannel: state.channel.channelDelete,
	activateChannelState: state.channel.channelActivate
});

const mapDispatch = {
	getChannelList: (type: ChannelsListTypes.ChannelsStatus) => channelActions.channelListAction(type),
	deleteChannel: ({ channel }: channelTypes.IChannelDeleteRequest) => channelActions.channelDeleteAction({ channel }),
	activateChannel: ({ channel }: channelTypes.IChannelActivateRequest) => channelActions.channelActivateAction({ channel })
};

const connector = connect(mapState, mapDispatch);

export default connector(router.withRouter(Channels));
