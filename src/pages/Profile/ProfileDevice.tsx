import React from 'react';
import { BsDot } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { ProfileTypes } from '../../@types/pages';

import { ReactComponent as Apple } from '../../assets/Apple.svg';
import { ReactComponent as Android } from '../../assets/Android.svg';
import { ReactComponent as Desktop } from '../../assets/Desktop.svg';
import { ReactComponent as Web } from '../../assets/Web.svg';

class ProfileDevice extends React.Component<ProfileTypes.ProfileDeviceProps, ProfileTypes.ProfileDeviceStates> {
	os = 'mx-1 h-[1.5rem] w-[1.5rem]';
	render() {
		const device: JSX.Element = (
			<div className='-mx-2 flex items-center px-4 py-3'>
				{this.props.data.os === 'IOS' ? <Apple className={this.os} /> : this.props.data.os === 'ANDROID' ? <Android className='' /> : this.props.data.os === 'DESKTOP' ? <Desktop className={this.os} /> : <Web className={this.os} />}
				<div className='mx-2 text-sm'>
					<div className='-mb-6 flex items-center justify-start text-black'>
						<div className='text-black'>{this.props.data.os}</div>
						{this.props.data.current && (
							<>
								<BsDot className='animate-ping text-[#12b76a]' size={25} />
								<div className='text-[#12b76a]'>Current Device</div>
							</>
						)}
					</div>
					<div className='mt-5 text-battleship-grey'>{this.props.data.date}</div>
				</div>
			</div>
		);

		return (
			<>
				{!this.props.selectedDevice ? (
					<div className='xxs:mt-4 xxs:w-full right-0 h-auto select-none rounded-md border-2 border-gray-200 sm:w-[25rem] md:mt-2 cursor-pointer'>
						<div className='-mb-10 mr-5 mt-5 flex justify-end'>
							<IoIosArrowDown className='text-gray-400' />
						</div>
						{device}
					</div>
				) : (
					<div className='xxs:mt-4 xxs:w-full right-0 select-none rounded-md border-2 border-gray-200 py-2 sm:w-[25rem] md:mt-2'>
						<div className='cursor-pointer'>
							<div className='-mb-10 mr-5 mt-3 flex items-end justify-end'>
								<IoIosArrowUp fill='black' />
							</div>
							{device}
						</div>

						<div className='mx-5 mb-2 border-b-[1.5px] border-[#f1f1f1]'></div>
						<div className='mx-5 mt-2 mb-2'>
							<div className='flex items-center justify-between'>
								<div className='flex flex-col items-start justify-between text-xs'>
									<div>
										<div className='text-gray-300'>Location</div>
										<div className='text-gray-700'>{`${this.props.data.location.city !== 'Unknown' ? this.props.data.location.city + ', ' : ''}${this.props.data.location.region !== 'Unknown' ? this.props.data.location.region + ', ' : ''}${this.props.data.location.country}`}</div>
									</div>
									<div>
										<div className='mt-2 text-gray-300'>Date</div>
										<div className='text-gray-700'>{this.props.data.date}</div>
									</div>
								</div>
								<div className='flex flex-col items-start justify-between text-xs'>
									<div>
										<div className='text-gray-300'>Version</div>
										<div className='text-gray-700'>{this.props.data.os_version}</div>
									</div>
									<div>
										<div className='mt-2 text-gray-300'>IP Address</div>
										<div className='text-gray-700'>{this.props.data.ip_address}</div>
									</div>
								</div>
							</div>
							{!this.props.data.current && (
								<div className='mt-2 flex items-start justify-start'>
									<button
										onClick={() => {
											this.props.onDelete({ guid: this.props.data.guid });
										}}
										className=' cursor-pointer select-none text-xs text-primary'>
										Delete Device
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</>
		);
	}
}
export default ProfileDevice;
