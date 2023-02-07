import React from 'react';
import { SidePane } from 'react-side-pane';
import Tooltip from '@mui/material/Tooltip';
import { connect, ConnectedProps } from 'react-redux';

import { MessageDetailProps, MessageDetailStates } from '../../@types/components/Messages/MessageDetail';
import { sidepane } from '../../helpers';
import { accountActions } from '../../actions';
import { RootState } from '../../store';

import { ReactComponent as ArrowLeft } from '../../assets/arrow-left.svg';
import { ReactComponent as IconCloseX } from '../../assets/x.svg';
import Button from '../Elements/Button';

class MessageDetail extends React.Component<MessageDetailProps & ConnectedProps<typeof connector>, MessageDetailStates> {
	unreadMsg = () => {
		if (!this.props.data) return;
		this.props.unreadMessage({ guid: this.props.data.guid });
	};

	deleteMsg = () => {
		if (!this.props.data) return;
		this.props.deleteMessage({ guid: this.props.data.guid });
	};

	componentDidUpdate(prevProps: MessageDetailProps & ConnectedProps<typeof connector>) {
		if (prevProps.deletedMsg !== this.props.deletedMsg && !this.props.deletedMsg.isLoading && this.props.deletedMsg.success) {
			this.props.refresh();
			this.props.onClose();
		}

		if (prevProps.unreadedMsg !== this.props.unreadedMsg && !this.props.unreadedMsg.isLoading && this.props.deletedMsg.success) this.props.refresh();
	}

	render() {
		return (
			<SidePane width={sidepane.calculateSidePaneWidth(window.screen.width) - 1.5} onClose={this.props.onClose} open={this.props.open}>
				<>
					<div className='flex items-center w-full justify-between bg-gray-100 p-6 select-none'>
						<Tooltip title='Back' placement='bottom' arrow>
							<ArrowLeft onClick={this.props.onClose} className='cursor-pointer' />
						</Tooltip>
						Message Details
						<Tooltip tabIndex={-2} title='Close' placement='bottom' arrow>
							<IconCloseX onClick={this.props.onClose} className='h-[1.25rem] max-w-[1.25rem] cursor-pointer' />
						</Tooltip>
					</div>
					{this.props.data && (
						<div className='mb-2 p-3'>
							<div className='flex select-none items-center justify-between'>
								<div className='flex items-center rounded-full px-2 py-1 text-xs' style={{ color: `#${this.props.data.label.text_color}`, backgroundColor: `#${this.props.data.label && this.props.data.label.bg_color}` }}>
									<span className='relative flex items-center justify-center'>
										<span className='relative inline-flex rounded-full' style={{ backgroundColor: `#${this.props.data.label && this.props.data.label.bg_color}` }}></span>
									</span>
									<span className='flex w-full items-center justify-center'>{this.props.data.label.text}</span>
								</div>
								<div className='flex items-center justify-center text-sm text-gray-400'>{new Date(this.props.data.created_at).toLocaleString()}</div>
							</div>
							<div className='mt-2 max-w-[22rem] font-semibold text-black'>{this.props.data.title}</div>
							<div className='text-elipsis mb-2 mt-3 text-gray-700'>{this.props.data.description}</div>
							<div className='text-md mt-3 flex flex-1 select-none items-center justify-center'>
								<Button loading={this.props.unreadedMsg.isLoading} name='Mark as Unread' onClick={this.unreadMsg} type='button' className='text-white w-[50%] p-2' />
								<Button loading={this.props.deletedMsg.isLoading} name='Delete' onClick={this.deleteMsg} type='button' color='bg-transparent' className='text-dark ml-2 w-[50%] rounded-lg border p-2' />
							</div>
						</div>
					)}
				</>
			</SidePane>
		);
	}
}

const mapState = (state: RootState) => ({
	unreadedMsg: state.account.unreadMessage,
	deletedMsg: state.account.deleteMessage
});

const mapDispatch = {
	unreadMessage: ({ guid }: { guid: string }) => accountActions.unreadMessageAction({ message: guid }),
	deleteMessage: ({ guid }: { guid: string }) => accountActions.deleteMessageAction({ message: guid })
};

const connector = connect(mapState, mapDispatch);
export default connector(MessageDetail);
