import React from 'react';

import { InputProps, InputStates } from '../../@types/components/Elements/Input';

class Input extends React.Component<InputProps, InputStates> {
	render() {
		return (
			<input
				hidden={this.props.hidden}
				maxLength={this.props.maxLength}
				autoComplete={this.props.autoComplete}
				id={this.props.id}
				onChange={this.props.onChange}
				value={this.props.value}
				type={this.props.type}
				placeholder={this.props.placeholder}
				className='text-bluey-grey bg-white appearance-none border border-cloudy-blue rounded-lg w-full py-3 px-2.5 mt-1 focus:outline-none focus:text-bluey-grey-outline placeholder:text-bluey-grey'
			/>
		);
	}
}

export default Input;
