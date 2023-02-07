import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { channelTypes, reportTypes } from '../../@types/reducers';
import { ChannelMemberDetailTypes } from '../../@types/pages';
import { channelActions, reportActions } from '../../actions';
import { Elements } from '../../components';
import { alert, modal, router } from '../../helpers';
import { RootState } from '../../store';

class ChannelDetailMember extends React.Component<ChannelMemberDetailTypes.ChannelDetailMemberProps & ConnectedProps<typeof connector>, ChannelMemberDetailTypes.ChannelDetailMemberStates> {
	description = (title: string, description: string | number) => (
		<>
			<div className='mb-4 mt-4 flex flex-row items-center justify-start border-b gray-400 pb-4'>
				<div className='text-dark basis-2/5'>{title}</div>
				<div className='basis-3/5 text-left text-bluey-grey'>{description}</div>
			</div>
		</>
	);
	leaveChannelTrigger = ({ channel }: channelTypes.IChannelLeaveRequest) => {
		modal.confirmModal({
			title: 'Leave Channel',
			description: 'Are you sure you want to leave this channel?',
			actionName: 'Leave',
			color: 'bg-red-600',
			onClick: () => {
				this.props.leaveChannel({ channel });
			}
		});
	};
	createIssue = (guid: string) => {
		this.props.issue({ guid: guid, type: 'CHANNEL' });
	};
	componentDidUpdate(prevProps: ChannelMemberDetailTypes.ChannelDetailMemberProps & ConnectedProps<typeof connector>) {
		if (prevProps.leftChannel !== this.props.leftChannel && !this.props.leftChannel.isLoading) {
			alert.fire({
				message: this.props.leftChannel.error ? (this.props.leftChannel.data as unknown as any).message : 'You left the channel successfully. ',
				error: this.props.leftChannel.error
			});
			if (!this.props.leftChannel.error) this.props.navigate('/channels');
		}
		if (prevProps.reportState !== this.props.reportState && !this.props.reportState.isLoading) {
			alert.fire({
				message: this.props.reportState.error ? (this.props.reportState.data as unknown as any).message : 'Your report reached us. We will contact with you!',
				error: this.props.reportState.error
			});
		}
	}
	render() {
		return (
			<>
				<div className='select-none'>
					<Elements.SideDescription type='title' title='Channel Details' description='You can make your channel-related edits here.' />
					<div className='mt-4 flex flex-col items-start justify-start border-b gray-400'>
						<div className='text-dark text-lg'>About Channel</div>
						<div className='text-bluey-grey text-sm font-normal mb-4'>This is my new Beepy channel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisi lorem, tempus sit amet ultricies eget, convallis molestie nisi. Fusce dapibus ornare sem. Nam lobortis vehicula eros, et ornare enim faucibus non.</div>
					</div>

					{this.description('Created At', this.props.details.date)}
					{this.description('Created By', this.props.details.members)}
					{this.description('Type', this.props.details.type)}
				</div>
				<div className='mt-6 select-none text-sm '>
					<div className='text-dark font-semibold'>Leave Channel Permanently</div>
					<div className='text-bluey-grey mt-1'>Leave your channel permanently or you can send us a message about complaint.</div>
					<div className='mt-2 flex'>
						<Elements.Button
							loading={this.props.reportState.isLoading}
							onClick={() => {
								this.createIssue(this.props.id);
							}}
							className='w-24 bg-gray-200 text-black mr-2'
							type='button'
							name='Report'
						/>
						<Elements.Button
							loading={this.props.leftChannel.isLoading}
							onClick={() => {
								this.leaveChannelTrigger({ channel: this.props.id });
							}}
							color='bg-red-600'
							type='button'
							name='Leave Channel'
						/>
					</div>
				</div>
			</>
		);
	}
}
const mapState = (state: RootState) => ({
	leftChannel: state.channel.channelLeave,
	reportState: state.report.issue
});

const mapDispatch = {
	leaveChannel: ({ channel }: channelTypes.IChannelLeaveRequest) => channelActions.channelLeaveAction({ channel }),
	issue: ({ guid, type }: reportTypes.IIssueRequest) => reportActions.issueAction({ guid, type })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withNavigate(ChannelDetailMember));
