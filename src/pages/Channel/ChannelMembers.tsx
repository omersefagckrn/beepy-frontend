import React from 'react';
import { BsPersonPlusFill } from 'react-icons/bs';
import { connect, ConnectedProps } from 'react-redux';

import { channelTypes } from '../../@types/reducers';
import { ChannelMembersTypes } from '../../@types/pages';

import { alert, modal, router } from '../../helpers';
import { RootState } from '../../store';
import { channelActions } from '../../actions';
import { ChannelMember } from '../../pages';
import InviteUser from '../../components/Modal/InviteUser';

class ChannelMembers extends React.Component<ChannelMembersTypes.ChannelMembersProps & ConnectedProps<typeof connector>, ChannelMembersTypes.ChannelMembersStates> {
	modal: React.RefObject<InviteUser>;

	constructor(props: ChannelMembersTypes.ChannelMembersProps & ConnectedProps<typeof connector>) {
		super(props);
		this.modal = React.createRef<InviteUser>();
	}

	state: ChannelMembersTypes.ChannelMembersStates = {
		selectedMember: null,
		members: null,
		limits: null
	};

	setSelectedMembers = (member: string) => {
		if (this.state.selectedMember === member) {
			this.setState({ selectedMember: null });
		} else {
			this.setState({ selectedMember: member });
		}
	};

	componentDidMount() {
		this.props.getMembers({ channel: this.props.params.id });
		this.props.getLimits({ channel: this.props.params.id });
	}

	componentDidUpdate(prevProps: ChannelMembersTypes.ChannelMembersProps & ConnectedProps<typeof connector>) {
		if (prevProps.members !== this.props.members && !this.props.members.isLoading && !this.props.members.error && this.props.members.success) {
			this.setState({
				members: this.props.members.data as channelTypes.IChannelMembers
			});
		}

		if (prevProps.limits !== this.props.limits && !this.props.limits.isLoading && !this.props.limits.error && this.props.limits.success) {
			this.setState({
				limits: this.props.limits.data as channelTypes.IChannelLimits
			});
		}

		if (prevProps.invitedMember !== this.props.invitedMember && !this.props.invitedMember.isLoading) {
			alert.fire({
				message: this.props.invitedMember.error ? (this.props.invitedMember.data as unknown as any).message : 'The member has just been invited to the channel successfully!',
				error: this.props.invitedMember.error
			});

			this.props.getMembers({ channel: this.props.params.id });
		}

		if (prevProps.deleteMemberState !== this.props.deleteMemberState && !this.props.deleteMemberState.isLoading) {
			alert.fire({
				message: this.props.deleteMemberState.error ? (this.props.deleteMemberState.data as unknown as any).message : 'The member has just been deleted successfully!',
				error: this.props.deleteMemberState.error
			});

			this.props.getMembers({ channel: this.props.params.id });
		}
	}

	render() {
		return (
			<>
				<InviteUser title='Invite Member' description='Add a new member to this channel' ref={this.modal} onSubmit={(email) => this.props.addMember({ channel: this.props.params.id as string, email })} membersCount={this.state.limits?.members.members_count} membersLimit={this.state.limits?.members.max_limit} />
				<div>
					<div className='justify-start select-none border-b gray-400 mb-4 items-center md:flex md:justify-between'>
						<div className='flex flex-col items-start justify-start pb-5 mt-4'>
							<div className='text-dark mb-2 text-[1.125rem] font-semibold'>Channel Members</div>
							<div className='text-bluey-grey text-sm font-normal'>Channel members are listed below. You can add new members.</div>
						</div>
						<button onClick={() => this.modal.current?.show()} className='bg-primary mb-2 md:mb-0 flex items-center justify-start rounded-lg px-4 text-white h-[2.25rem] p-4'>
							<BsPersonPlusFill className='mr-2 h-[1rem] w-[1rem]' />
							<div className='font-semibold text-base'>Add Member</div>
						</button>
					</div>
					{this.state.members && Array.isArray(this.state.members.list) && this.state.members.list.length > 0 && (
						<>
							{this.state.members.list.map((member, index) => (
								<div
									onClick={() => {
										this.setSelectedMembers(member.guid);
									}}
									key={index}
									className='mb-3 w-full max-w-[82rem] rounded-lg border gray-400 text-gray-900 p-2 md:flex md:items-center md:justify-between md:p-5'>
									<ChannelMember
										onDelete={() => {
											modal.confirmModal({
												actionName: 'Delete',
												description: 'Are you sure you want to delete this member?',
												onClick: () => {
													this.props.deleteMember({ member: member.guid });
												},
												color: 'bg-red-600',
												title: 'Delete Member'
											});
										}}
										selectedMember={this.state.selectedMember === member.guid}
										index={index}
										member={member}
									/>
								</div>
							))}
						</>
					)}
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	limits: state.channel.channelLimits,
	members: state.channel.channelMembers,
	invitedMember: state.channel.channelInvitaitonSend,
	deleteMemberState: state.channel.channelMemberDelete
});

const mapDispatch = {
	getLimits: ({ channel }: channelTypes.IChannelLimitsRequest) => channelActions.channelLimitsAction({ channel }),
	getMembers: ({ channel }: channelTypes.IChannelMembersRequest) => channelActions.channelMembersAction({ channel }),
	addMember: ({ channel, email }: channelTypes.IInvitationSendRequest) => channelActions.channelInvitationSendAction({ channel, email }),
	deleteMember: ({ member }: channelTypes.IChannelMemberDeleteRequest) => channelActions.channelMemberDeleteAction({ member })
};

const connector = connect(mapState, mapDispatch);

export default connector(router.withParams(ChannelMembers));
