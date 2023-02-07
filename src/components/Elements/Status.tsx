import React from 'react';

import { StatusProps } from '../../@types/components/Elements/Status';

class Status extends React.Component<StatusProps> {
	render() {
		return (
			<div className='xxs:hidden select-none flex-col items-center justify-start sm:flex'>
				<div className='flex h-6 items-center self-end rounded-full bg-green-400 bg-opacity-10 px-2 py-1 '>
					{this.props.ping && (
						<div className='relative mr-2 flex h-2 w-2'>
							<div className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#12b76a] opacity-75'></div>
							<div className='relative inline-flex h-2 w-2 rounded-full bg-[#12b76a]'></div>
						</div>
					)}
					<div className='capitalize text-xs text-[#027a48]'>{this.props.text}</div>
				</div>
			</div>
		);
	}
}

export default Status;
