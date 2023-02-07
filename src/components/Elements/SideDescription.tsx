import React from 'react';
import { SideDescriptionProps } from '../../@types/components/Elements/SideDescription';

class SideDescription extends React.Component<SideDescriptionProps> {
	render() {
		return (
			<div className={`${this.props.type === 'title' ? 'select-none pb-5 mt-4 border-b gray-400' : 'text-dark basis-2/5 select-none text-sm font-semibold'}`}>
				<div className={`${this.props.type === 'title' ? 'text-dark mb-2 text-[1.125rem] font-semibold' : 'text-dark basis-2/5 select-none text-sm font-semibold'}`}>{this.props.title}</div>
				<div className='text-bluey-grey text-sm font-normal'>{this.props.description}</div>
			</div>
		);
	}
}
export default SideDescription;
