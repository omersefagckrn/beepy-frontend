import React from 'react';

import { ChannelNotificationTypes } from '../../@types/pages';
import { Elements } from '../../components';

class ChannelNotification extends React.Component<ChannelNotificationTypes.ChannelNotificationProps, ChannelNotificationTypes.ChannelNotificationStates> {
	state: ChannelNotificationTypes.ChannelNotificationStates = {
		hover: false
	};
	Move = () => this.setState({ hover: true });

	Leave = () => this.setState({ hover: false });

	render() {
		const { currentItem } = this.props;

		if (!currentItem) return null;

		return (
			<>
				<div onMouseMove={this.Move} onMouseLeave={this.Leave} className='mb-4 rounded-lg border gray-400 p-5'>
					<div className='flex items-center justify-between text-xs'>
						<div className='flex items-center justify-center'>
							{currentItem.label ? (
								<div className='mr-2 rounded-full text-xs bg-opacity-10 px-2 py-0.5' style={{ backgroundColor: `#${currentItem.label.bg_color}`, color: `#${currentItem.label.text_color}` }}>
									{currentItem.label.text}
								</div>
							) : null}
							<div className='text-bluey-grey'> {currentItem.date}</div>
						</div>
						<div>
							<div onClick={this.props.onDelete} className='flex items-center justify-center self-end'>
								{this.state.hover && <Elements.Trash />}
							</div>
						</div>
					</div>
					<div className='mt-1 max-w-[60rem]'>
						<span className='text-dark font-semibold'>{currentItem.title}</span>
					</div>
					<div className='mt-1 max-w-[60rem]'>
						<span className='text-bluey-grey text-sm'>{currentItem.description}</span>
					</div>
				</div>
			</>
		);
	}
}
export default ChannelNotification;
