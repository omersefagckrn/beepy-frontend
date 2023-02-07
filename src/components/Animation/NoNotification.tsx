import React from 'react';

import { ReactComponent as NoNotifications } from '../../assets/no-notification-yet-icon.svg';

class NoNotification extends React.Component {
	render() {
		return (
			<>
				<div className='flex flex-col items-center justify-center'>
					<NoNotifications className='mt-4 h-[7.5rem] w-[10rem]' />
					<div className='text-lg text-dark mt-2'>Notifications List</div>
					<div className='mt-1 mb-4 flex flex-col items-center justify-center text-center text-bluey-grey'>
						<div>There is no any notification in this channel.</div>
						<div className='flex flex-col items-center justify-center'>
							You can also check our
							<a rel='noreferrer' target='_blank' href='https://api.beepy.io/' className='text-primary underline'>
								documentation
							</a>
							page how to send notifications to your channels via API or Webhooks.
						</div>
					</div>
				</div>
				{[1, 2, 3].map((index) => (
					<div key={index} className={`${index === 1 && 'opacity-80'} ${index === 2 && 'opacity-40'} ${index === 3 && 'opacity-20'} mb-2 rounded-lg border gray-400 p-6 select-none`}>
						<div className='flex opacity-50'>
							<div className='rounded-lg h-3 w-10 md:w-20 bg-bluey-grey' />
							<div className='ml-4 w-20 md:w-40 h-3 rounded-lg bg-bluey-grey' />
						</div>
						<div className='h-3 rounded-full mt-2 sm:w-[30rem] bg-bluey-grey opacity-20' />
					</div>
				))}
			</>
		);
	}
}
export default NoNotification;
