import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ChannelInvitationsTypes } from '../../@types/pages';
import { channelTypes } from '../../@types/reducers';

import { channelActions } from '../../actions';

import { alert, modal, router } from '../../helpers';
import { RootState } from '../../store';

import { Animation } from '../../components';
import { ChannelInvitation } from '../index';

class ChannelInvitations extends React.Component<ChannelInvitationsTypes.ChannelInvitationsProps & ConnectedProps<typeof connector>, ChannelInvitationsTypes.ChannelInvitationsStates> {
	state: ChannelInvitationsTypes.ChannelInvitationsStates = {
		selectedInvitation: null,
		invitations: null
	};

	setSelectedInvitations = (invitation: string) => {
		if (this.state.selectedInvitation === invitation) {
			this.setState({ selectedInvitation: null });
		} else {
			this.setState({ selectedInvitation: invitation });
		}
	};

	resendInvitation = (guid: string) => {
		this.props.resendInvitation({ guid });
	};

	componentDidMount() {
		this.props.getInvitations({ channel: this.props.params.id });
	}

	componentDidUpdate(prevProps: ChannelInvitationsTypes.ChannelInvitationsProps & ConnectedProps<typeof connector>) {
		if (prevProps.invitations !== this.props.invitations && !this.props.invitations.isLoading && !this.props.invitations.error && this.props.invitations.success) {
			this.setState({
				invitations: this.props.invitations.data as channelTypes.IChannelInvitationList
			});
		}

		if (prevProps.resentInvitaiton !== this.props.resentInvitaiton && !this.props.resentInvitaiton.isLoading) {
			alert.fire({
				message: this.props.resentInvitaiton.error ? (this.props.resentInvitaiton.data as unknown as any).message : 'The invitation has just been resent successfully',
				error: this.props.resentInvitaiton.error
			});
		}

		if (prevProps.cancelledInvitation !== this.props.cancelledInvitation && !this.props.cancelledInvitation.isLoading) {
			alert.fire({
				message: this.props.cancelledInvitation.error ? (this.props.cancelledInvitation.data as unknown as any).message : 'The invitation has just been cancelled successfully',
				error: this.props.cancelledInvitation.error
			});

			this.props.getInvitations({ channel: this.props.params.id });
		}
	}

	render() {
		const { invitations } = this.state;

		if (!invitations) return null;

		return Array.isArray(invitations.list) && invitations.list.length > 0 ? (
			invitations.list.map((invitation, index) => (
				<div
					key={index}
					onClick={() => {
						this.setSelectedInvitations(invitation.guid);
					}}>
					<ChannelInvitation
						selectedInvitation={this.state.selectedInvitation === invitation.guid}
						invitation={invitation}
						index={index}
						resendInvitation={() => {
							this.resendInvitation(invitation.guid);
						}}
						cancelInvitation={() => {
							modal.confirmModal({
								title: 'Cancel Invitation',
								description: 'Are you sure you want to cancel this invitation?',
								color: 'bg-red-600',
								onClick: () => {
									this.props.cancelInvitation({ guid: invitation.guid });
								},
								actionName: 'Cancel'
							});
						}}
					/>
				</div>
			))
		) : (
			<Animation.NoInvitation />
		);
	}
}

const mapState = (state: RootState) => ({
	invitations: state.channel.channelInvitationList,
	resentInvitaiton: state.channel.channelInvitationResend,
	cancelledInvitation: state.channel.channelInvitationCancel
});

const mapDispatch = {
	getInvitations: ({ channel }: channelTypes.IChannelInvitationListRequest) => channelActions.channelInvitationListAction({ channel }),
	resendInvitation: ({ guid }: channelTypes.IInvitationResendRequest) => channelActions.channelInvitationResenAction({ guid }),
	cancelInvitation: ({ guid }: channelTypes.IInvitationCancelRequest) => channelActions.channelInvitationCancelAction({ guid })
};

const connector = connect(mapState, mapDispatch);
export default connector(router.withParams(ChannelInvitations));
