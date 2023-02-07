import React from 'react';
import { toast } from 'react-toastify';

import { AlertProps, AlertStates } from '../../@types/components/Alert/Alert';

import { ReactComponent as AlertSuccess } from '../../assets/alertSuccess.svg';
import { ReactComponent as AlertRed } from '../../assets/alertRed.svg';
import { ReactComponent as AlertTriangle } from '../../assets/alertTriangle.svg';

class Alert extends React.Component<AlertProps, AlertStates> {
	selectedIcon = () => {
		switch (this.props.type) {
			case toast.TYPE.SUCCESS:
				return <AlertSuccess />;
			case toast.TYPE.ERROR:
				return <AlertRed />;
			case toast.TYPE.WARNING:
				return <AlertTriangle />;
			default:
				return <AlertTriangle />;
		}
	};

	render() {
		return (
			<div className='flex items-start justify-between'>
				<div className='flex items-center justify-end select-none'>
					<div>{this.selectedIcon()}</div>
				</div>
				<div className='flex-1 mt-1 ml-2 flex flex-col items-start justify-start'>
					<p className='text-[#353e54] text-md'>{this.props.title}</p>
					<p className='text-bluey-grey text-sm'>{this.props.message}</p>
				</div>
			</div>
		);
	}
}

export default Alert;
