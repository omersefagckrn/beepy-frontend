import React from 'react';

import { ReactComponent as Invitation } from '../../assets/no-invitations-yet-icon.svg';

class NoInvitation extends React.Component {
	render() {
		return (
			<>
				<div className='flex flex-col items-center justify-center'>
					<Invitation className='h-[7.5rem] mt-6 w-[10rem]' />
					<div className='mt-2 text-lg text-dark text-center'>Pending Invitations</div>
					<div className='text-bluey-grey mt-1 mb-4 text-center'>There is no any pending invitations here. To invite someone to your channel please use the form in Members section.</div>
				</div>
				{[1, 2, 3].map((index) => (
					<div key={index} className={`${index === 1 && 'opacity-80'} ${index === 2 && 'opacity-40'} ${index === 3 && 'opacity-20'} mb-3 select-none w-full max-w-[82rem] rounded-lg border gray-400 p-2 md:flex items-center justify-center md:justify-between md:p-5`}>
						<div className='flex items-center justify-start'>
							<div className='h-[3rem] w-[3rem] rounded-full bg-bluey-grey md:m-0 opacity-50' />
							<div className='ml-1 lg:ml-4'>
								<div className='mb-2 h-3 w-[6rem] md:w-[10rem] rounded-full bg-bluey-grey opacity-50' />
								<div className='rounded-full h-3 w-[10rem] md:w-[15rem] bg-bluey-grey opacity-20' />
							</div>
						</div>
						<div className='flex md:flex-none mt-4 md:mt-0 items-center justify-between'>
							{[1, 2, 3].map((i) => (
								<div key={i} className={`${i === 1 && 'md:mr-20'} ${i === 2 && 'md:mr-2'} rounded-full md:mt-2 md:ml-2 h-5 w-[4rem] md:w-[6rem] bg-bluey-grey opacity-20`} />
							))}
						</div>
					</div>
				))}
			</>
		);
	}
}

export default NoInvitation;
