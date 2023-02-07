import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SidePane } from 'react-side-pane';
import { Tooltip } from '@mui/material';

import { InvitationsProps, InvitationsStates } from '../../@types/components/Invitations/Invitations';
import { accountTypes } from '../../@types/reducers';

import { alert, sidepane } from '../../helpers';
import { RootState } from '../../store';
import { accountActions } from '../../actions';

import Invitation from './Invitation';

import { ReactComponent as IconCloseX } from '../../assets/x.svg';

class Invitations extends React.Component<InvitationsProps & ConnectedProps<typeof connector>, InvitationsStates> {
	state = {
		isLoading: false
	};

	componentDidMount() {
		this.props.getInvitations();
	}

	componentDidUpdate(prevProps: InvitationsProps & ConnectedProps<typeof connector>) {
		if (prevProps.inviteAction !== this.props.inviteAction && !this.props.inviteAction.isLoading) {
			alert.fire({
				message: this.props.inviteAction.error ? (this.props.inviteAction.data as unknown as any).message : 'Invitation ' + this.props.inviteAction.request?.action.toLowerCase() + ' successfully!',
				error: this.props.inviteAction.error
			});

			this.props.getInvitations();
			this.props.getUserProfile();

			this.setState({
				isLoading: false
			});
		}
	}

	acceptInvite = ({ guid }: { guid: string }) => {
		if (!this.state.isLoading) {
			this.setState({
				isLoading: true
			});

			this.props.invitationAction({ guid, action: 'ACCEPTED' });
		}
	};

	rejectInvite = ({ guid }: { guid: string }) => {
		if (!this.state.isLoading) {
			this.setState({
				isLoading: true
			});

			this.props.invitationAction({ guid, action: 'REJECTED' });
		}
	};

	render() {
		const invitations = this.props.invitaitons.data as accountTypes.IInvitation[];

		return (
			<SidePane width={sidepane.calculateSidePaneWidth(window.screen.width)} onClose={this.props.handleClose} open={this.props.isInvitationsOpen}>
				<div className='flex flex-col h-screen select-none'>
					<div className='flex items-center w-full justify-between bg-gray-100 p-6'>
						<div className='text-[1.25rem]'>Invitations</div>
						<div className='flex items-center justify-center'>
							<Tooltip title='Close' arrow>
								<IconCloseX onClick={this.props.handleClose} className='w-[1.25rem] cursor-pointer' />
							</Tooltip>
						</div>
					</div>
					<div className='flex-1 mt-2 overflow-y-auto'>
						{invitations && invitations.length > 0 ? (
							invitations.map((data, key) => {
								return <Invitation onAccepted={({ guid }) => this.acceptInvite({ guid })} onRejected={({ guid }) => this.rejectInvite({ guid })} key={key} datasLength={invitations.length} index={key} data={data} />;
							})
						) : (
							<div className='text-bluey-grey flex items-center justify-center'>No Invitations</div>
						)}
					</div>
				</div>
			</SidePane>
		);
	}
}

const mapState = (state: RootState) => ({
	invitaitons: state.account.invitationList,
	inviteAction: state.account.invitationAction
});

const mapDispatch = {
	getInvitations: () => accountActions.invitationListAction(),
	invitationAction: ({ guid, action }: accountTypes.IInviteActionsRequest) => accountActions.inviteAction({ guid, action }),
	getUserProfile: () => accountActions.userProfileAction()
};

const connector = connect(mapState, mapDispatch);
export default connector(Invitations);
