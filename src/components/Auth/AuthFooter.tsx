import React from 'react';
import { CgMail } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import { AuthFooterProps, AuthFooterStates } from '../../@types/components/Auth/AuthFooter';
class AuthFooter extends React.Component<AuthFooterProps, AuthFooterStates> {
	currentYear = new Date().getFullYear();

	render() {
		return this.props.footerType === 'login' || 'checkMail' || 'forgotPassword' || 'newPassword' || 'passwordSuccess' ? (
			<footer className='pb-9 pl-2 md:pl-8'>
				<ul className='select-none flex text-bluey-grey items-center justify-center md:justify-between'>
					<li>© beepy.io {this.currentYear}</li>
					<li className='ml-4 md:ml-10'>
						<Link to='#'>Terms &amp; Confitions</Link>
					</li>
					<li className='ml-4 md:ml-12'>
						<Link to='#'>Privacy Policy</Link>
					</li>
					<li className='ml-4 flex-1 md:ml-12'>
						<Link to='#'>Cookie Policy</Link>
					</li>
				</ul>
			</footer>
		) : (
			<footer className='pb-9'>
				<ul className='select-none flex items-center justify-between'>
					<li>© beepy.io {this.currentYear}</li>
					<li className='flex items-center justify-center'>
						<CgMail className='w-4 h-4 mr-1' />
						<a href='mailto:help@beepy.io'>help@beepy.io</a>
					</li>
				</ul>
			</footer>
		);
	}
}

export default AuthFooter;
