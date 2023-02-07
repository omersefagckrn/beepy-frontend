import React from 'react';
import { CgSpinner } from 'react-icons/cg';

import { ButtonProps, ButtonStates } from '../../@types/components/Elements/Button';
class Button extends React.Component<ButtonProps, ButtonStates> {
	render() {
		return (
			<button disabled={this.props.loading || this.props.disabled} onClick={this.props.onClick} type={this.props.type} className={`${this.props.color ? this.props.color : 'bg-primary'} disabled:bg-gray-400 select-none rounded-lg ${this.props.className ? this.props.className : 'max-h-auto text-white p-2'}`}>
				{this.props.loading ? (
					<div className='flex cursor-not-allowed items-center justify-center p-1'>
						<CgSpinner className='animate-spin' />
					</div>
				) : (
					this.props.name
				)}
			</button>
		);
	}
}

export default Button;
