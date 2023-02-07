import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ChannelSettingsTypes } from '../../@types/pages';
import { channelTypes } from '../../@types/reducers';

import { channelActions } from '../../actions';
import { Elements } from '../../components';
import { alert, router } from '../../helpers';
import { RootState } from '../../store';

class ChannelSettings extends React.Component<ChannelSettingsTypes.ChannelSettingsProps & ConnectedProps<typeof connector>, ChannelSettingsTypes.ChannelSettingsStates> {
	state: ChannelSettingsTypes.ChannelSettingsStates = {
		channelSettings: null,
		muteable: false,
		invitations_notify: false
	};

	setMuteable = () => {
		if (this.state.channelSettings) {
			this.setState({
				channelSettings: {
					...this.state.channelSettings,
					muteable: !this.state.channelSettings.muteable
				}
			});
			let val = !this.state.channelSettings.muteable;
			this.props.updateChannel({
				channel: this.props.params.id,
				muteable: val,
				display_logo: null,
				invitations_notify: this.state.channelSettings.invitations_notify
			});
		}
	};

	setInviteNotifications = () => {
		if (this.state.channelSettings) {
			this.setState({
				channelSettings: {
					...this.state.channelSettings,
					invitations_notify: !this.state.channelSettings.invitations_notify
				}
			});

			let value = !this.state.channelSettings.invitations_notify;
			this.props.updateChannel({
				channel: this.props.params.id,
				muteable: this.state.channelSettings.muteable,
				display_logo: null,
				invitations_notify: value
			});
		}
	};
	componentDidMount() {
		this.props.getChannelSettings({ channel: this.props.params.id });
	}
	componentDidUpdate(prevProps: ChannelSettingsTypes.ChannelSettingsProps & ConnectedProps<typeof connector>) {
		if (prevProps.channelSettings !== this.props.channelSettings && !this.props.channelSettings.isLoading && !this.props.channelSettings.error && this.props.channelSettings.success && this.props.channelSettings.data) {
			this.setState({
				channelSettings: this.props.channelSettings.data as channelTypes.IChannelSettings
			});
		} else if (prevProps.updateChannelState !== this.props.updateChannelState && !this.props.updateChannelState.isLoading) {
			alert.fire({
				message: this.props.updateChannelState.error ? (this.props.updateChannelState.data as unknown as any).message : 'The channel settings has just ben updated successfully!',
				error: this.props.updateChannelState.error
			});

			this.props.getChannelSettings({ channel: this.props.params.id });
		}
	}
	render() {
		if (!this.state.channelSettings) return null;
		const { muteable, invitations_notify } = this.state.channelSettings;

		return (
			<>
				<Elements.SideDescription type='title' title='Channel Settings' description='To update channel settings.' />
				<div className='md:flex py-3 pb-5 items-center border-b gray-400 justify-start'>
					<Elements.SideDescription title='Mutable' description='You can allow or disallow your channel to be muted by channel members.' />
					<div onClick={this.setMuteable} className='flex cursor-pointer items-center md:justify-center'>
						<div className={`m-2 flex h-auto w-8 items-center justify-center rounded-full p-[0.09rem] ${!muteable && 'bg-gray-400 pl-[0.3rem]'} ${muteable && 'bg-primary pr-[0.2rem]'}`}>
							<div className={`mx-auto flex h-4 w-4 transform items-center justify-center rounded-full bg-white duration-300 ease-in-out ${!muteable && 'sticky -translate-x-2'} ${muteable && 'sticky translate-x-2'}`}></div>
						</div>
						<span className='ml-1 select-none text-xs font-semibold'>{muteable ? 'Enabled' : 'Disabled'}</span>
					</div>
				</div>
				<div className='md:flex py-2 pb-5 items-center justify-start mt-2'>
					<Elements.SideDescription title='Invitation Action' description='We will notify you when people take accept/reject action for your channel invitations.' />
					<div onClick={this.setInviteNotifications} className='flex cursor-pointer items-center md:justify-center'>
						<div className={`m-2 flex h-auto w-8 items-center justify-center rounded-full p-[0.1rem] ${!invitations_notify && 'bg-gray-400 pl-[0.3rem]'} ${invitations_notify && 'bg-primary pr-[0.3rem]'}`}>
							<div className={`mx-auto flex h-4 w-4 transform items-center justify-center rounded-full bg-white duration-300 ease-in-out ${!invitations_notify && 'sticky -translate-x-2'} ${invitations_notify && 'sticky translate-x-2'}`}></div>
						</div>
						<span className='ml-1 select-none text-xs font-semibold'>{invitations_notify ? 'Enabled' : 'Disabled'}</span>
					</div>
				</div>
			</>
		);
	}
}
const mapState = (state: RootState) => ({
	channelSettings: state.channel.channelSettings,
	updateChannelState: state.channel.channelSettingsUpdate
});
const mapDispatch = {
	getChannelSettings: ({ channel }: channelTypes.IChannelSettingsRequest) => channelActions.channelSettingsAction({ channel }),
	updateChannel: ({ channel, muteable, display_logo, invitations_notify }: channelTypes.IChannelSettingsUpdateRequest) => channelActions.channelSettingsUpdateAction({ channel, muteable, display_logo, invitations_notify })
};
const connector = connect(mapState, mapDispatch);
export default connector(router.withParams(ChannelSettings));
