import { Location,Params, useNavigate } from 'react-router-dom'; 
import { channelTypes } from '../../reducers';

export type ChannelState ={
	details: channelTypes.IChannelDetails | null;
}
export type ChannelProps = {
	location: Location;
	params: Params;
	navigate: typeof useNavigate
};
