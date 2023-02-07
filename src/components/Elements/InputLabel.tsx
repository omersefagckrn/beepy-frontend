import React from 'react';

import { InputLabelProps, InputLabelStates } from '../../@types/components/Elements/InputLabel';
class InputLabel extends React.Component<InputLabelProps, InputLabelStates> {
	render() {
		return (
			<>
				<label htmlFor={this.props.for} className='text-slate-blue flex select-none items-center text-sm'>
					{this.props.label}
				</label>
			</>
		);
	}
}
export default InputLabel;
