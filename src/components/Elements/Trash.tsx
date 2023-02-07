import React from 'react';

import { Tooltip } from '@mui/material';
import { BsFillTrashFill } from 'react-icons/bs';

class Trash extends React.Component {
	render() {
		return (
			<>
				<Tooltip title='Delete' placement='bottom' arrow>
					<div>
						<BsFillTrashFill className='text-bluey-grey cursor-pointer h-[1rem] w-[1rem]' />
					</div>
				</Tooltip>
			</>
		);
	}
}
export default Trash;
