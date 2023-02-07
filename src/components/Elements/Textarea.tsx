import React from 'react';

import { TextareaProps, TextareaStates } from '../../@types/components/Elements/Textarea';

class Textarea extends React.Component<TextareaProps, TextareaStates> {
	render() {
		return (
			<textarea
				value={this.props.value}
				rows={this.props.rows}
				hidden={this.props.hidden}
				maxLength={this.props.maxLength}
				autoComplete={this.props.autoComplete}
				id={this.props.id}
				onChange={this.props.onChange}
				placeholder={this.props.placeholder}
				className='text-bluey-grey border-cloudy-blue focus:text-bluey-grey-outline placeholder:text-bluey-grey mt-1 w-full appearance-none rounded-lg border py-3.5 px-2.5 focus:outline-none'
			/>
		);
	}
}

export default Textarea;
