import React from 'react';

import { FormErrorTextProps } from '../../@types/components/Elements/FormErrorText';
export default class FormErrorText extends React.Component<FormErrorTextProps> {
	render() {
		return (
			<>
				<span className='text-red-600'>{this.props.error}</span>
			</>
		);
	}
}
