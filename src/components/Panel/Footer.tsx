import React from 'react';
class Footer extends React.Component {
	render() {
		const year = new Date().getFullYear();
		return (
			<footer className='text-bluey-grey my-5'>
				<div className='flex items-center justify-center'>
					<div className='select-none'>{year} © Beepy® Registered trademark. All rights reserved.</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
