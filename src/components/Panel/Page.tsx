import React from 'react';
import { Outlet } from 'react-router-dom';

import { PageProps } from '../../@types/components/Panel/Page';

import Navbar from './Navbar';
import Footer from './Footer';
import { router } from '../../helpers';

class Page extends React.Component<PageProps> {
	render() {
		return (
			<div className='bg-[#fafafa]'>
				<div className='flex flex-col min-h-screen max-h-max'>
					{this.props.location.pathname !== 'create' && (
						/* modal açıkken gizlenicek className */
						<header className='sticky top-0 z-50'>
							<Navbar />
						</header>
					)}
					<main className={`${this.props.location.pathname !== '/channels/create' && 'p-4'} flex-grow ${this.props.className}`}>
						<Outlet />
					</main>
					{this.props.location.pathname !== '/channels/create' && (
						<footer className={`p-4 ${this.props.className}`}>
							<Footer />
						</footer>
					)}
				</div>
			</div>
		);
	}
}
export default router.withRouter(Page);
