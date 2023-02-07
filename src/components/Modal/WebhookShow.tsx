import React from 'react';

import { Modal as ModalType } from '../../@types/components';
import { alert } from '../../helpers';

import { Elements } from '../../components';

import Modal from '../../components/Modal/Modal';

class WebhookShow extends React.Component<ModalType.WebhookShowProps, ModalType.WebhookShowStates> {
	modal: React.RefObject<Modal>;
	constructor(props: ModalType.WebhookShowProps) {
		super(props);
		this.modal = React.createRef();
	}

	copiedUrl = () => {
		navigator.clipboard.writeText(this.props.webhook?.webhook ?? '');
		alert.fire({
			message: 'Webhook URL copied to clipboard!',
			error: false
		});
	};

	show = () => this.modal.current?.show();
	hide = () => this.modal.current?.hide();

	render() {
		return (
			<Modal ref={this.modal} onClose={this.props.onClose} modalBodyClass='w-full md:w-[45rem]' title={this.props.title} description={this.props.description}>
				<div className='flex items-start justify-between'>
					<div className='truncate'>
						<div className='truncate select-none text-dark-grey-blue font-semibold'>{this.props.webhook?.label}</div>
						<div className='text-bluey-grey mt-1'>Here we can get things related to api.</div>
					</div>
					<div
						onClick={() => {
							this.props.onDelete(this.props.webhook);
							this.hide();
						}}>
						<Elements.Trash />
					</div>
				</div>
				<div onClick={this.copiedUrl} className='p-3 cursor-pointer mt-4 truncate rounded-lg bg-[#353e54] text-[#84caff]'>
					{this.props.webhook?.webhook}
				</div>
				<div className='flex select-none justify-between mt-4'>
					<Elements.Button name='Cancel' onClick={() => this.hide()} type='button' color='bg-transparent' className='w-1/2 border border-gray-300 p-2' />
					<Elements.Button name='Copy URL' onClick={this.copiedUrl} type='button' className='w-1/2 p-2 text-white ml-3' />
				</div>
			</Modal>
		);
	}
}
export default WebhookShow;
