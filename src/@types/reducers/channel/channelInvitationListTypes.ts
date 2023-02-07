import { Id } from 'react-toastify';
import { BaseState, IDataFail } from '../rootReducer';

export interface list {
    guid: string;
    channel_guid: string;
    user_guid: string;
    name: string;
    surname: string;
    email: string;
    status: string;
    type: string;
    date: string;
}
export interface IChannelInvitationList {
    members_count: number;
    invitations_count: number;
    members_max_limit: number;
    list: list[]
}
export interface IChannelInvitationListRequest {
    channel: string | undefined,
}
export type ChannelInvitationListState = BaseState & {
    data?: IChannelInvitationList | IDataFail;
    request?: IChannelInvitationListRequest;
}
export type ChannelInvitationListAction = {
    type: string;
    data?: IChannelInvitationList | IDataFail;
    request?: IChannelInvitationListRequest;
}
export type ChannelInvitationListDispatchType = (args: ChannelInvitationListAction) => ChannelInvitationListAction;