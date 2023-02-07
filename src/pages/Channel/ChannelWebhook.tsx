import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Tooltip } from '@mui/material';

import { ChannelWebhookTypes } from '../../@types/pages';
class ChannelWebhook extends React.Component<ChannelWebhookTypes.ChannelWebhookProps, ChannelWebhookTypes.ChannelWebhookStates> {
	render() {
		const { webhook, index, webhooksLength } = this.props;

		return (
			<>
				<div className={`flex items-center justify-between mt-2 sm:mt-0 p-1 md:p-3 hover:rounded hover:bg-[#f1f1f1] md:basis-3/5 ${webhooksLength - 1 !== index && 'border-b gray-400'}`}>
					<div className='flex flex-col items-start justify-start'>
						<div className={`truncate text-[#344054] w-full max-w-[7rem] md:max-w-lg ${webhook.status !== 'ACTIVE' && 'text-gray-300'} `}>{webhook.label}</div>
						<div className={`text-sm truncate w-full max-w-[7rem] md:max-w-lg ${webhook.status !== 'ACTIVE' && 'text-gray-300'}`}>{webhook.date}</div>
					</div>
					<div className='grid grid-col-3'>
						<div className='flex items-center justify-start'>
							<div onClick={this.props.setWebHookActive} className={`m-2 flex h-auto w-8 cursor-pointer items-center justify-center rounded-full p-[0.1rem] ${webhook.status === 'INACTIVE' && 'bg-gray-200 pl-[0.3rem]'} ${webhook.status === 'ACTIVE' && 'bg-primary pr-[0.3rem]'}`}>
								<div className={`mx-auto flex h-4 w-4 transform items-center justify-center rounded-full bg-white duration-300 ease-in-out ${webhook.status === 'INACTIVE' && 'sticky -translate-x-2'} ${webhook.status === 'ACTIVE' && 'sticky translate-x-2'}`}></div>
							</div>
							<div className={`text-sm font-semibold ${webhook.status === 'ACTIVE' ? ' sm:ml-6' : 'sm:ml-2'}`}>{webhook.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}</div>
							<Tooltip title='Show WebHook' placement='bottom' arrow>
								<div className='ml-4' onClick={() => this.props.showWebhook(webhook)}>
									<FaEye className='text-bluey-grey cursor-pointer flex h-[1rem] w-[1rem] items-center justify-center ' />
								</div>
							</Tooltip>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ChannelWebhook;
