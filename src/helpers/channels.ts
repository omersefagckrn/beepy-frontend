import { ChannelsStatus } from '../@types/pages/Channels';

const channelColors = {
	ACTIVE: 'bg-green-400',
	INACTIVE: 'bg-gray-600',
	PENDING: 'bg-yellow-400',
	SUSPENDED: 'bg-orange-400',
	EXAMINATION: 'bg-red-400'
};

const channelTextColors = {
	ACTIVE: 'text-[#027a48]',
	INACTIVE: 'text-[#828282]',
	PENDING: 'text-[#ffc107]',
	SUSPENDED: 'text-[#ffc107]',
	EXAMINATION: 'text-[#ff0000]'
};

export default class ChannelsHelper {
	getChannelColor(channelStatus: ChannelsStatus) {
		return channelColors[channelStatus] || channelStatus;
	}

	getChannelTextColor(channelStatus: ChannelsStatus) {
		return channelTextColors[channelStatus] || channelStatus;
	}
}
