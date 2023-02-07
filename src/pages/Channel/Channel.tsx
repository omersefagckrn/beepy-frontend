import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { ChannelTypes } from '../../@types/pages';
import { channelTypes } from '../../@types/reducers';

import { RootState } from '../../store';
import { channelActions } from '../../actions';
import { alert, router } from '../../helpers';

import { ReactComponent as ChannelLock } from '../../assets/channel-lock.svg';
import { Elements } from '../../components';

class Channel extends React.Component<ChannelTypes.ChannelProps & ConnectedProps<typeof connector>, ChannelTypes.ChannelState> {
	state: ChannelTypes.ChannelState = {
		details: null
	};

	links = [
		{ to: `/channels/${this.props.params.id}/notifications`, text: 'Notifications', show: true },
		{ to: `/channels/${this.props.params.id}/members`, text: 'Members', show: false },
		{ to: `/channels/${this.props.params.id}/invitations`, text: 'Invitations', show: false },
		{ to: `/channels/${this.props.params.id}/details`, text: 'Details', show: true },
		{ to: `/channels/${this.props.params.id}/settings`, text: 'Settings', show: false },
		{ to: `/channels/${this.props.params.id}/credentials`, text: 'Credentials', show: false },
		{ to: `/channels/${this.props.params.id}/webhooks`, text: 'Webhooks', show: false }
	];

	navigate = this.props.navigate();

	componentDidMount() {
		this.props.getChannelDetails({ channel: this.props.params.id });
	}

	componentDidUpdate(prevProps: ChannelTypes.ChannelProps & ConnectedProps<typeof connector>) {
		if (prevProps.details !== this.props.details && !this.props.details.isLoading && !this.props.details.error && this.props.details.success) {
			const details = this.props.details.data as channelTypes.IChannelDetails;

			this.setState({ details });

			this.links = this.links.map((link) => {
				if (link.show === false && details && details.isOwner) link.show = true;
				return link;
			});
		} else if (prevProps.details !== this.props.details && !this.props.details.isLoading && this.props.details.error) {
			alert.fire({
				message: this.props.details.error ? (this.props.details.data as unknown as any).message : 'An error occurred while loading channel details.',
				error: true
			});
		}
	}

	render() {
		const { details } = this.state;
		if (!details) return null;

		return (
			<>
				<Helmet>
					<title>{details.title + ' | Beepy'}</title>
				</Helmet>
				<div className='mx-auto w-full max-w-[75rem]'>
					<div className='p-1 mt-4 md:p-2'>
						<div className='text-dark-grey-blue text-3xl font-[500] select-none'>Channel Details</div>
						<div className='text-bluey-grey py-1 font-light select-none'>You can see your channel details.</div>
					</div>
					<div className='bg-white-50 mt-4 rounded-lg p-6'>
						<div className='flex select-none justify-between'>
							<div className='flex mb-12 items-start justify-start'>
								<div className='absolute'>
									<img src={details.logo} alt={''} className='h-16 w-16 rounded-[4px] object-cover' />
									<div className='absolute -right-2 -bottom-[0.3rem] inline-flex rounded-full'>
										<ChannelLock />
									</div>
								</div>
								<div className='ml-20'>
									<div className='flex flex-col items-start justify-start'>
										<div className='text-dark-grey-blue xxs:max-w-[8rem] w-full text-lg truncate font-semibold sm:max-w-sm md:max-w-md'>{details.title}</div>
										<div className='text-cloudy-blue flex items-center text-sm'>{details.slug}</div>
									</div>
								</div>
							</div>
							<Elements.Status ping={true} text={details.status} />
						</div>
						<nav className='scrollbar text-normal flex select-none items-center justify-start border-b gray-400 pb-2.5 text-[#667085]'>
							{this.links.map(
								(link, index) =>
									link.show && (
										<Link to={link.to} key={index} className={`${this.props.location.pathname === link.to && 'active border-primary text-primary border-b-2'} xxs:mr-3 pb-1`}>
											{link.text}
										</Link>
									)
							)}
						</nav>

						<Outlet />
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	details: state.channel.channelDetails
});
const mapDispatch = {
	getChannelDetails: ({ channel }: channelTypes.IChannelDetailsRequest) => channelActions.channelDetailsAction({ channel })
};
const connector = connect(mapState, mapDispatch);
export default connector(router.withRouter(Channel));
