import React from 'react';
import StyledModal from 'styled-react-modal';

import { Modal as ModalType } from '../../@types/components';

class Modal extends React.Component<ModalType.ModalProps, ModalType.ModalStates> {
	state = { isOpen: false };
	show = () => {
		this.setState({ isOpen: true });
	};

	hide = () => {
		if (this.props.hideOnBackgroundClick !== null && this.props.hideOnBackgroundClick === false) return null;

		this.props.onClose && this.props.onClose();
		this.setState({ isOpen: false });
	};

	render() {
		return (
			<StyledModal onBackgroundClick={this.hide} isOpen={this.state.isOpen} onEscapeKeydown={this.hide}>
				<div className={`rounded-xl shadow-xl bg-white p-4 ${this.props.modalBodyClass ? this.props.modalBodyClass : 'w-[28rem]'}`}>
					<div className='flex flex-col'>
						<div className='select-none text-dark-grey-blue font-semibold'>{this.props.title}</div>
						<div className='text-bluey-grey mt-1'>{this.props.description}</div>
					</div>
					<div className='overflow-y-auto'>{this.props.children}</div>
				</div>
			</StyledModal>
		);
	}
}

export default Modal;
