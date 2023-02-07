import React from 'react';

import LoginRightImage from '../../assets/login-right-image.svg';
import { ReactComponent as RightTopPattern } from '../../assets/right-top-pattern.svg';
import { ReactComponent as LeftBottomPattern } from '../../assets/left-bottom-pattern.svg';

class AuthImageArea extends React.Component {
	render() {
		return (
			<div className='bg-dark bg-hero-pattern hidden w-[30rem] select-none flex-col bg-right-top bg-no-repeat md:flex md:w-1/2'>
				<div className='self-end object-self absolute'>
					<RightTopPattern />
				</div>
				<div className='my-auto object-contain mx-auto relative flex items-center flex-col justify-center'>
					<div>
						<img alt={''} src={LoginRightImage} />
					</div>
					<div className='hero-text mt-10 text-center'>
						<div className='text-[1.25rem] text-white'>Welcome to your new dashboard</div>
						<div className='text-primary mt-1 text-opacity-70'>Sign in to explore changes we've made.</div>
					</div>
				</div>
				<div className='bg-left-bottom'>
					<LeftBottomPattern className='w-[15rem] h-[10rem]' />
				</div>
			</div>
		);
	}
}

export default AuthImageArea;
