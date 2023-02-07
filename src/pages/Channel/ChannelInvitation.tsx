import React from 'react';
import { BsHourglassSplit } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';

import { ChannelInvitationTypes } from '../../@types/pages';
import { ReactComponent as CheckCircle } from '../../assets/check-circle.svg';

class ChannelInvitation extends React.Component<ChannelInvitationTypes.ChannelInvitationProps, ChannelInvitationTypes.ChannelInvitationStates> {
	render() {
		const { invitation } = this.props;
		return (
			<>
				<div className='text-bluey-grey mt-6 mb-2'>
					<div className='flex w-full sm:items-center xxs:flex-col sm:flex-row xxs:p-3 sm:justify-between rounded-lg border gray-400 text-dark-grey-blue sm:h-auto sm:max-w-[82rem] sm:p-6'>
						<div className='flex items-center justify-start sm:w-[50%]'>
							<div className='bg-primary select-none text-white mr-2 flex items-center justify-center rounded-full uppercase p-3'>
								<BsHourglassSplit className='h-[1.25rem] w-auto' fill='black' />
							</div>
							<div className='flex items-start justify-start flex-col leading-5 '>
								<div className='text-dark'>{invitation.email}</div>
								<div className='text-bluey-grey'>{invitation.date}</div>
							</div>
						</div>
						{invitation.status === 'PENDING' && (
							<div className='flex items-center justify-between sm:w-[50%] xxs:mt-4 sm:mt-0 select-none'>
								<div className='bg-brick-orange flex items-center justify-center rounded-full bg-opacity-10 px-2 py-0.5'>
									<div className='text-brick-orange text-sm'>Pending</div>
								</div>
								<div className='text-rusty-red flex items-center justify-center cursor-pointer'>
									<IoIosClose className='flex h-6 w-6 items-center justify-center' />
									<div onClick={this.props.cancelInvitation} className='text-sm'>
										Cancel
									</div>
								</div>
								<div className='flex items-center justify-center text-green-400 cursor-pointer'>
									<CheckCircle className='flex items-center justify-center h-4 w-4' />
									<div onClick={this.props.resendInvitation} className='text-sm ml-2'>
										Resend
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</>
		);
	}
}
export default ChannelInvitation;
