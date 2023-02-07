import React from 'react';

import { InvitationProps, InvitationStates } from '../../@types/components/Invitations/Invitation';

import { ReactComponent as Checkmark } from '../../assets/checkMark.svg';
import { ReactComponent as Triangle } from '../../assets/inviteTriangle.svg';

class Invitation extends React.Component<InvitationProps, InvitationStates> {
	render() {
		const { data, index, datasLength } = this.props;

		return (
			<>
				<div className='mb-5 flex items-start justify-start'>
					<div className='ml-5 flex items-start justify-start'>
						<img alt={''} className='h-auto w-[4rem] rounded-[4px] object-scale-down' src={data.logo} />
					</div>
					<section className='ml-5 flex flex-1 flex-col items-start justify-start text-sm'>
						<div className='text-[#344054]'>{data.channel}</div>
						<div className='text-[#667085]'>{data.slug}</div>
						<div className='mt-1 text-sm text-[#667085]'>
							You have been invited to this channel by <b>{data.invited_by}</b>
						</div>
						<span className='text-sm text-[#667085]'>{data.invited_at}</span>
						<div className='mt-3 flex items-center justify-center pr-[4.125rem]'>
							<button onClick={() => this.props.onAccepted({ guid: data.guid })} className='inline-flex w-full items-center justify-center rounded-lg bg-[#11b669] p-2'>
								<Checkmark className='mr-1 h-auto w-[1.1rem]' stroke='white' fill='white' />
								<span className='text-sm text-white'>Accept</span>
							</button>
							<button onClick={() => this.props.onRejected({ guid: data.guid })} className='ml-5 inline-flex w-full items-center justify-center rounded-lg bg-[#d0021b] p-2'>
								<Triangle className='mr-1 h-auto w-[1rem]' stroke='white' fill='white' />
								<span className='text-sm text-white'>Reject</span>
							</button>
						</div>
					</section>
				</div>
				{datasLength - 1 !== index && <div className='mx-5 mb-4 border-b-[2px] border-[#f1f1f1]'></div>}
			</>
		);
	}
}
export default Invitation;
