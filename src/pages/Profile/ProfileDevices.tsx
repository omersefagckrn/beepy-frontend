import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ProfileTypes } from '../../@types/pages';
import { accountTypes } from '../../@types/reducers';

import { RootState } from '../../store';
import { accountActions } from '../../actions';
import { alert, modal } from '../../helpers';

import { ProfileDevice } from '../index';
import { Elements } from '../../components';
class ProfileDevices extends React.Component<ProfileTypes.ProfileDevicesProps & ConnectedProps<typeof connector>, ProfileTypes.ProfileDevicesStates> {
	state: ProfileTypes.ProfileDevicesStates = {
		selectedDevice: null,
		devices: null,
		isLoading: false
	};

	componentDidMount() {
		this.props.getDevices();
	}

	componentDidUpdate(prevProps: ProfileTypes.ProfileInformationProps & ConnectedProps<typeof connector>) {
		if (prevProps.devices !== this.props.devices && !this.props.devices.isLoading && !this.props.devices.error && this.props.devices.success) {
			this.setState({
				devices: this.props.devices.data as accountTypes.IDevice[]
			});
		}

		if (prevProps.deletedDevice !== this.props.deletedDevice && !this.props.deletedDevice.isLoading) {
			alert.fire({
				message: this.props.deletedDevice.error ? (this.props.deletedDevice.data as unknown as any).message : 'Device deleted successfully!',
				error: this.props.deletedDevice.error
			});

			this.props.getDevices();

			this.setState({
				isLoading: false
			});
		}
	}

	setSelectedDevice = (device: string) => {
		if (this.state.selectedDevice === device) {
			this.setState({ selectedDevice: null });
		} else {
			this.setState({ selectedDevice: device });
		}
	};

	render() {
		const { devices } = this.state;

		return (
			<>
				<div className='text-bluey-grey mt-4 w-full'>
					<Elements.SideDescription type='title' title='Where you’re logged in' description='Control your devices.' />
				</div>
				<div className='mt-4 text-sm sm:flex sm:items-start sm:justify-between'>
					<Elements.SideDescription title='Devices' description='Manage your device.' />
					<div>
						{devices &&
							devices.length > 0 &&
							devices.map((device, index) => (
								<div
									key={index}
									onClick={() => {
										this.setSelectedDevice(device.guid);
									}}>
									<ProfileDevice
										onDelete={({ guid }) => {
											if (!this.state.isLoading) {
												modal.confirmModal({
													title: 'Delete device',
													description: 'Are you sure you want to delete this device?',
													actionName: 'Delete',
													onClick: () => {
														this.setState({ isLoading: true });
														this.props.deleteDevice({ guid });
													},
													color: 'bg-red-600'
												});
											}
										}}
										selectedDevice={this.state.selectedDevice === device.guid}
										data={device}
										index={index}
									/>
								</div>
							))}
					</div>
				</div>
			</>
		);
	}
}

const mapState = (state: RootState) => ({
	devices: state.account.deviceList,
	deletedDevice: state.account.deleteDevice
});

const mapDispatch = {
	getDevices: () => accountActions.deviceListAction(),
	deleteDevice: ({ guid }: accountTypes.IDeleteDeviceRequest) => accountActions.deleteDeviceAction({ guid })
};

const connector = connect(mapState, mapDispatch);
export default connector(ProfileDevices);
