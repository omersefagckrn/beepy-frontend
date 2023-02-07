import React from 'react';
import { BsFillPeopleFill, BsFillPersonFill } from 'react-icons/bs';

import { ChannelMemberTypes } from '../../@types/pages';
import { Elements } from '../../components';

class ChannelMember extends React.Component<ChannelMemberTypes.ChannelMemberProps, ChannelMemberTypes.ChannelMemberStates> {
	state: ChannelMemberTypes.ChannelMemberStates = {
		hover: false
	};

	move = () => {
		this.setState({ hover: true });
	};

	leave = () => {
		this.setState({ hover: false });
	};

	render() {
		const { member } = this.props;
		return (
			<div className='md:grid grid-cols-4 w-full' onMouseMove={this.move} onMouseLeave={this.leave}>
				<div className='flex items-center justify-start'>
					<div className='m-2 relative md:m-0'>
						<div className='bg-dark text-white flex select-none items-center justify-center rounded-full p-3 uppercase'>
							{member.name
								.split(' ')
								.map((n) => n[0])
								.toString()
								.replaceAll(',', '') +
								member.surname
									.split(' ')
									.map((n) => n[0])
									.toString()
									.replaceAll(',', '')}
						</div>
						<div className={`border-white-50 absolute right-0 bottom-0 h-3 w-3 rounded-full border ${member.status ? 'bg-[#12b76a] ' : 'bg-red-500'}`}></div>
					</div>
					<div className='flex ml-2 flex-col flex-1 items-start justify-start'>
						<p className='text-dark'>{member.name + ' ' + member.surname}</p>
						<p className='text-bluey-grey'>{member.email}</p>
					</div>
				</div>
				<div className='flex items-center justify-center md:justify-end'>
					<div className='flex items-center justify-center'>
						<div className='xxs:m-1 flex items-center justify-center rounded-full px-2 py-0.5 text-[0.75rem] md:m-0 bg-[#f2f4f7]'>
							<div className='bg-primary mr-1 rounded-lg'>
								<div>
									{member.type === 'MEMBER' && <BsFillPeopleFill className='m-[0.15rem]' fill='white' />}
									{member.type === 'OWNER' && <BsFillPersonFill className='m-[0.15rem]' fill='white' />}
								</div>
							</div>
							<div className='flex select-none items-center justify-center text-[#344054]'>{member.type}</div>
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center md:justify-end'>
					<div className='text-[0.75rem]'>{member.date}</div>
				</div>
				<div className='flex items-center justify-center md:justify-end'>
					<div className='flex items-center xxs:mb-2 justify-center sm:mb-0'>
						{member.type === 'MEMBER' && this.state.hover ? (
							<div onClick={this.props.onDelete} className='xxs:mt-2 md:mt-0 cursor-pointer'>
								<Elements.Trash />
							</div>
						) : (
							<div className='w-[2.25rem]'></div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default ChannelMember;
