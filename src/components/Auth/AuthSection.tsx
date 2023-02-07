import React from 'react';
import { AuthSectionProps, AuthSectionStates } from '../../@types/components/Auth/AuthSection';
import { Helmet } from 'react-helmet-async';

import AuthFooter from '../../components/Auth/AuthFooter';
import AuthLogo from '../../components/Auth/AuthLogo';
import AuthImageArea from '../../components/Auth/AuthImageArea';

class AuthSection extends React.Component<AuthSectionProps, AuthSectionStates> {
	render() {
		return (
			<>
				<Helmet>
					<title>{this.props.title}</title>
				</Helmet>
				<div className='flex h-screen w-full select-none flex-wrap'>
					<div className='xxs:w-full flex flex-col md:w-1/2'>
						<div className='flex justify-center md:justify-start md:pl-8'>
							<AuthLogo color='dark' />
						</div>
						{this.props.children}
						<div className='flex items-center justify-center md:flex-row md:items-start md:justify-start'>
							<AuthFooter footerType={this.props.footerType} />
						</div>
					</div>
					<AuthImageArea />
				</div>
			</>
		);
	}
}
export default AuthSection;
