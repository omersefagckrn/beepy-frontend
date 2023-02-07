import React from 'react';

import { SelectProps, SelectStates } from '../../@types/components/Elements/Select';
class Select extends React.Component<SelectProps, SelectStates> {
	render() {
		return (
			<>
				<select id={this.props.id} onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder} className='text-bluey-grey border-cloudy-blue focus:shadow-outline placeholder:text-bluey-grey mt-1 w-full appearance-none rounded-lg border py-3.5 px-2.5 focus:outline-none'>
					{this.props.children}
				</select>
			</>
		);
	}
}
export default Select;
