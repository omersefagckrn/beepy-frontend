import { Tooltip } from '@mui/material';
import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

import { CardProps, CardStates } from '../../@types/components/Payment/Card';

import { payment } from '../../helpers';

class Card extends React.Component<CardProps, CardStates> {
	state: CardStates = {
		hover: false
	};

	Move = () => this.setState({ hover: true });

	Leave = () => this.setState({ hover: false });

	render() {
		const { card } = this.props;

		if (!card) return null;

		return (
			<div onMouseLeave={this.Leave} onMouseEnter={this.Move} className='flex items-start space-x-4 rounded-lg p-3 md:p-5 leading-tight text-gray-700 ring-[1px] ring-gray-200'>
				<div className='flex-shrink-0 flex items-center justify-center h-12 w-16 rounded-md p-2 ring-1 ring-gray-200/40'>
					<img src={payment.getBrandIcon(card.card_brand)} alt={''} />
				</div>
				<div className='flex flex-grow flex-col items-start'>
					<span className='font-semibold'>
						{payment.getBrandName(card.card_brand)} ending in {card.last_four}
					</span>
					<div className='text-sm opacity-50'>
						Expiry {card.expiry_month}/{card.expiry_year}
					</div>
					{!card.primary && (
						<div className='mt-2 flex items-center space-x-4'>
							<button onClick={() => this.props.onSelect(card.id)} className='text-sm font-semibold underline'>
								Set as Primary
							</button>
						</div>
					)}
				</div>
				<div>
					{card.primary && <span className='font-semibold text-[#ff9b01]'>Primary</span>}
					<Tooltip title='Delete' placement='bottom' arrow>
						<BsFillTrashFill onClick={() => this.props.onDelete(card.id)} className={`${this.state.hover && !card.primary ? 'visible' : 'invisible'} cursor-pointer`} />
					</Tooltip>
				</div>
			</div>
		);
	}
}
export default Card;
