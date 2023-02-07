import React from 'react';
import { SidePane } from 'react-side-pane';
import { connect, ConnectedProps } from 'react-redux';
import { Tooltip } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

import { MessagesProps, MessagesStates } from '../../@types/components/Messages/Messages';
import { accountTypes } from '../../@types/reducers';

import { sidepane } from '../../helpers';
import { RootState } from '../../store';
import { accountActions } from '../../actions';

import Message from './Message';
import MessageDetail from './MessageDetail';

import { ReactComponent as IconCloseX } from '../../assets/x.svg';
class Messages extends React.Component<MessagesProps & ConnectedProps<typeof connector>, MessagesStates> {
	state: MessagesStates = {
		selectedMessage: null,
		selectedMessageGuid: null,
		currentPage: 1,
		totalPages: null,
		messageList: []
	};

	componentDidMount() {
		this.props.listMessages({ id: this.state.currentPage });
	}

	componentDidUpdate(prevProps: MessagesProps & ConnectedProps<typeof connector>) {
		if (prevProps.messages !== this.props.messages && !this.props.messages.isLoading && !this.props.messages.error) {
			this.setState({
				totalPages: (this.props.messages.data as accountTypes.IMessageList).meta.last_page,
				messageList: [...(this.state.messageList && this.state.messageList.length > 0 ? (this.state.messageList as accountTypes.IMessageList['data']) : []), ...(this.props.messages.data as accountTypes.IMessageList).data]
			});
		}
	}

	selectMessage = (guid: string | null, message: accountTypes.IMessageList['data'][0] | null) => {
		this.setState({
			selectedMessage: message,
			selectedMessageGuid: guid
		});

		if (message) this.props.readMessage({ guid: message?.guid });
		this.refresh();

		return true;
	};

	loadMore = () => {
		this.setState({
			currentPage: this.state.currentPage + 1
		});

		this.props.listMessages({ id: this.state.currentPage });
	};

	refresh = () => {
		this.setState({
			currentPage: 1,
			messageList: []
		});

		this.props.listMessages({ id: 1 });
		this.props.getUserProfile();
	};

	render() {
		return (
			<>
				<SidePane width={sidepane.calculateSidePaneWidth(window.screen.width)} onClose={this.props.handleClose} open={this.props.isMessagesOpen}>
					<>
						<div className='flex flex-col h-screen select-none'>
							<div className='flex items-center w-full justify-between bg-gray-100 p-6'>
								<div className='text-[1.25rem]'>Messages</div>
								<div className='flex items-center justify-center'>
									<Tooltip title='Close' arrow>
										<IconCloseX onClick={this.props.handleClose} className='w-[1.25rem] cursor-pointer' />
									</Tooltip>
								</div>
							</div>
							<div id='scrollableDiv' className='flex-1 mt-2 overflow-y-auto'>
								{this.state.messageList ? (
									<>
										<InfiniteScroll
											dataLength={this.state.messageList.length}
											next={this.loadMore}
											endMessage={
												<p className='text-center'>
													<b>Yay! You have seen it all</b>
												</p>
											}
											hasMore={this.state.currentPage <= (this.state.totalPages ?? 0)}
											loader={<h4>Loading...</h4>}
											scrollableTarget='scrollableDiv'>
											{this.state.messageList.map((data, key) => {
												return <Message key={key} selectMessage={() => this.selectMessage(key as unknown as string, data)} datasLength={this.state.messageList?.length ?? 0} index={key} data={data} />;
											})}
										</InfiniteScroll>
									</>
								) : (
									<>
										<div className='text-bluey-grey flex items-center justify-center'>No Messages</div>
									</>
								)}
							</div>
						</div>
						<MessageDetail refresh={this.refresh} data={this.state.selectedMessage} onClose={() => this.selectMessage(null, null)} open={this.state.selectedMessageGuid !== null ? true : false} />
					</>
				</SidePane>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	readedMessage: state.account.readMessage,
	messages: state.account.messageList
});

const mapDispatch = {
	readMessage: ({ guid }: { guid: string }) => accountActions.messageReadAction({ message: guid }),
	listMessages: ({ id }: { id: number }) => accountActions.messageListAction({ id }),
	getUserProfile: () => accountActions.userProfileAction()
};

const connector = connect(mapState, mapDispatch);
export default connector(Messages);
