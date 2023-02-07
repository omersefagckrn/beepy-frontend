import React from 'react';

import { UserInfoProps } from '../../@types/components/Elements/UserInfo';
class UserInfo extends React.Component<UserInfoProps> {
	render() {
		return (
			<>
				<div className={`mb-4 flex basis-3/5 items-start justify-between pb-4 ${this.props.title !== 'Subscription' && 'border-b gray-400'}`}>
					<div className='basis-5/6'>
						<div className='text-dark flex select-none items-center'>{this.props.title}</div>
						<p className='xxs:max-w-[8rem] w-full truncate sm:max-w-sm text-bluey-grey'>{this.props.description}</p>
					</div>
				</div>
			</>
		);
	}
}
export default UserInfo;
