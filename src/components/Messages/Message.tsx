import React from 'react';
import { MessageProps, MessageStates } from '../../@types/components/Messages/Message';

class Message extends React.Component<MessageProps, MessageStates> {
	render() {
		const { data, index, datasLength, selectMessage } = this.props;
		return (
			<>
				<div onClick={() => selectMessage(index as unknown as string)} className='message-title mb-2 border-l-8 p-3' style={{ borderLeftColor: `#${data.label && data.label.bg_color}` }}>
					<div className='mt-4 mb-2 flex select-none items-center justify-between'>
						<div className={`flex items-center rounded-full bg-[#${data.label && data.label.bg_color}] px-2 py-1 text-xs`} style={{ backgroundColor: `#${data.label && data.label.bg_color}` }}>
							<span className='relative flex items-center justify-center'>
								<span className={`relative inline-flex rounded-full bg-[#${data.label && data.label.bg_color}]`}></span>
								<span className='flex w-full items-center justify-center' style={{ color: `#${data.label && data.label.text_color}` }}>
									{data.label.text}
								</span>
							</span>
						</div>
						<div className='text-sm text-gray-400'>{new Date(data.created_at).toLocaleString()}</div>
					</div>
					<div className='text-max-length message-title text-max-length max-w-[14rem] cursor-pointer font-semibold text-black'>{data.title}</div>
					<div className='text-elipsis description-max-length mb-2 mt-1 text-gray-700'>{data.description}</div>
				</div>
				{datasLength - 1 !== index && <div className='mx-5 mb-4 border-b-[2px] border-[#f1f1f1]'></div>}
			</>
		);
	}
}
export default Message;
