import { confirmAlert } from 'react-confirm-alert';

import { Elements } from '../components';

const confirmModal = ({ title, description, actionName, onClick, color }: { title: string; description: string; actionName: string; onClick: () => void; color: string }) => {
	confirmAlert({
		customUI: ({ onClose }) => {
			return (
				<div className='rounded-xl bg-white p-4 shadow-xl sm:w-[25rem]'>
					<div className='flex flex-col items-start justify-start'>
						<div className='select-none text-dark-grey-blue font-semibold'>{title}</div>
						<div className='text-bluey-grey text-justify w-full sm:max-w-sm mt-1'>{description}</div>
					</div>
					<div className='mt-4 flex select-none items-center justify-center'>
						<Elements.Button onClick={onClose} type='button' name='Cancel' color='bg-gray-1000' className='bg-gray-1000 w-full border bg-transparent border-gray-300 p-2' />
						<Elements.Button
							onClick={() => {
								onClick();
								onClose();
							}}
							type='submit'
							name={actionName}
							className={`w-full p-2 text-white ml-3 ${color}`}
						/>
					</div>
				</div>
			);
		}
	});
};

export { confirmModal };
