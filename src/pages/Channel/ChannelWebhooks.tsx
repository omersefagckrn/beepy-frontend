import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { channelTypes } from '../../@types/reducers';
import { ChannelWebhooksTypes } from '../../@types/pages';

import { channelActions } from '../../actions';
import { alert, modal, router } from '../../helpers';
import { RootState } from '../../store';

import ChannelWebhook from './ChannelWebhook';
import { Elements } from '../../components';
import CreateWebhook from '../../components/Modal/CreateWebhook';
import WebhookShow from '../../components/Modal/WebhookShow';

class ChannelWebhooks extends React.Component<ChannelWebhooksTypes.ChannelWebhooksProps & ConnectedProps<typeof connector>, ChannelWebhooksTypes.ChannelWebhooksStates> {
	createWebhookModal: React.RefObject<CreateWebhook>;
	showWebhookModal: React.RefObject<WebhookShow>;

	constructor(props: ChannelWebhooksTypes.ChannelWebhooksProps & ConnectedProps<typeof connector>) {
		super(props);
		this.createWebhookModal = React.createRef<CreateWebhook>();
		this.showWebhookModal = React.createRef<WebhookShow>();
	}

	state: ChannelWebhooksTypes.ChannelWebhooksStates = {
		webhooks: null,
		limits: null,
		currentWebhook: null
	};

	setWebHookActive = (webhook: channelTypes.IWebHooksGet['webhook']) => {
		this.props.updateWebHook({ webhook: webhook });
	};

	componentDidMount() {
		this.props.getWebHooks({ channel: this.props.params.id });
		this.props.getChannelLimits({ channel: this.props.params.id });
	}

	componentDidUpdate(prevProps: ChannelWebhooksTypes.ChannelWebhooksProps & ConnectedProps<typeof connector>) {
		if (prevProps.webhooks !== this.props.webhooks && !this.props.webhooks.isLoading && !this.props.webhooks.error && this.props.webhooks.success) {
			this.setState({ webhooks: this.props.webhooks.data as channelTypes.IWebHooksGet[] });
		}

		if (prevProps.limits !== this.props.limits && !this.props.limits.isLoading && !this.props.limits.error && this.props.limits.success) {
			this.setState({ limits: this.props.limits.data as channelTypes.IChannelLimits });
		}

		if (prevProps.createdWebhook !== this.props.createdWebhook && !this.props.createdWebhook.isLoading) {
			alert.fire({
				message: this.props.createdWebhook.error ? (this.props.createdWebhook.data as unknown as any).message : 'The webhook has just been created successfully!',
				error: this.props.createdWebhook.error
			});

			this.componentDidMount();
		}

		if (prevProps.updatedWebhook !== this.props.updatedWebhook && !this.props.updatedWebhook.isLoading) {
			alert.fire({
				message: this.props.updatedWebhook.error ? (this.props.updatedWebhook.data as unknown as any).message : 'The webhook has just been updated successfully!',
				error: this.props.updatedWebhook.error
			});

			this.componentDidMount();
		}

		if (prevProps.deletedWebhook !== this.props.deletedWebhook && !this.props.deletedWebhook.isLoading) {
			alert.fire({
				message: this.props.deletedWebhook.error ? (this.props.deletedWebhook.data as unknown as any).message : 'The webhook has just been deleted successfully!',
				error: this.props.deletedWebhook.error
			});

			this.componentDidMount();
		}
	}

	render() {
		const { webhooks } = this.state;
		if (!webhooks) return null;
		return (
			<>
				<CreateWebhook title='Create Webhook' description='Add a new Webhook to the channel!' ref={this.createWebhookModal} onSubmit={(webhook) => this.props.createWebhook({ label: webhook, channel: this.props.params.id as string })} webhookLimit={this.state.limits?.webhooks.max_limit ?? 0} webhooksCount={this.state.limits?.webhooks.webhooks_count ?? 0} />
				<WebhookShow
					ref={this.showWebhookModal}
					webhook={this.state.currentWebhook}
					onDelete={() => {
						modal.confirmModal({
							actionName: 'Delete',
							description: 'Are you sure you want to delete this webhook?',
							color: 'bg-red-600',
							title: 'Delete Webhook',
							onClick: () => {
								this.state.currentWebhook && this.props.deleteWebhook({ webhook: this.state.currentWebhook.guid });
							}
						});
					}}
				/>

				<div className='text-bluey-grey'>
					<Elements.SideDescription type='title' title='Channel Webhooks' description='Webhooks are a simple way to post messages from apps into Beepy Channel.' />
					<div className='items-center justify-between gap-8 border-b gray-400 py-5 sm:flex'>
						<div className='basis-2/5'>
							<Elements.SideDescription title='Create Webhook' description='Webhooks requires POST request from your source.' />
						</div>
						<div className='mt-2 md:mt-0'>
							<Elements.Button onClick={() => this.createWebhookModal.current?.show()} className='text-white w-36 p-2' name='Create Webhook' type='button' />
						</div>
					</div>
					<div className='mt-4 sm:flex sm:items-start sm:justify-start '>
						<Elements.SideDescription title='URL List' description='All of your created webhooks are listed.' />
						<div className='basis-3/5'>
							{webhooks.length > 0
								? webhooks.map((webhook, index) => (
										<ChannelWebhook
											setWebHookActive={() => {
												this.setWebHookActive(webhook.guid);
											}}
											showWebhook={(webhook) => {
												this.setState({ currentWebhook: webhook });
												this.showWebhookModal.current?.show();
											}}
											key={index}
											webhooksLength={webhooks.length}
											index={index}
											webhook={webhook}
										/>
								  ))
								: 'This channel does not have any Incoming Webhook yet.'}
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapState = (state: RootState) => ({
	webhooks: state.channel.webHooksGet,
	createdWebhook: state.channel.createWebHook,
	updatedWebhook: state.channel.updateWebHook,
	deletedWebhook: state.channel.deleteWebHook,
	limits: state.channel.channelLimits
});
const mapDispatch = {
	createWebhook: ({ label, channel }: channelTypes.ICreateWebHooksRequest) => channelActions.createWebHookAction({ label, channel }),
	getWebHooks: ({ channel }: channelTypes.IWebHooksGetRequest) => channelActions.webHooksGetAction({ channel }),
	updateWebHook: ({ webhook }: channelTypes.IUpdateWebHooksRequest) => channelActions.updateWebHookAction({ webhook }),
	deleteWebhook: ({ webhook }: channelTypes.IDeleteWebHooksRequest) => channelActions.deleteWebHookAction({ webhook }),
	getChannelLimits: ({ channel }: channelTypes.IChannelLimitsRequest) => channelActions.channelLimitsAction({ channel })
};
const connector = connect(mapState, mapDispatch);
export default connector(router.withParams(ChannelWebhooks));
