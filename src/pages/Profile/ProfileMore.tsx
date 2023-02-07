import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BsArrowUpRight } from 'react-icons/bs';

import { ProfileTypes } from '../../@types/pages';
import { authTypes } from '../../@types/reducers';

import { RootState } from '../../store';
import { authActions } from '../../actions';
import { Elements } from '../../components';

class ProfileMore extends React.Component<ProfileTypes.ProfileMoreProps & ConnectedProps<typeof connector>, ProfileTypes.ProfileMoreStates> {
	state: ProfileTypes.ProfileMoreStates = {
		urls: null
	};

	componentDidMount() {
		this.props.getUrls();
	}

	componentDidUpdate(prevProps: ProfileTypes.ProfileMoreProps & ConnectedProps<typeof connector>) {
		if (prevProps.urls !== this.props.urls && !this.props.urls.isLoading && !this.props.urls.error && this.props.urls.success) {
			this.setState({
				urls: this.props.urls.data as authTypes.IUrls
			});
		}
	}
	render() {
		const { urls } = this.state;
		if (!urls) return null;

		return (
			<>
				<Elements.SideDescription type='title' title='Policies' description='You can see our policies and terms from this section.' />
				<div className='select-none text-[0.6rem] md:text-sm'>
					{urls &&
						Object.values(urls).map((url, key) =>
							Object.entries(url).map(([_key, value]) => (
								<div key={_key} className={`flex items-center justify-start pt-2 pb-2 ${Object.values(urls).length + 1 !== key && 'border-b border-gray-200'}`}>
									<div className='text-dark font-semibold'>{value.label}</div>
									<a target='_blank' rel='noreferrer' href={value.url} className='text-primary ml-4 flex items-center justify-center'>
										<div className='hover:underline'>{value.label}</div>
										<div>
											<BsArrowUpRight className='ml-1 w-5' />
										</div>
									</a>
								</div>
							))
						)}
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	urls: state.auth.urls
});

const mapDispatch = {
	getUrls: () => authActions.listUrlsAction()
};

const connector = connect(mapState, mapDispatch);
export default connector(ProfileMore);
