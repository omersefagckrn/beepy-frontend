import { BaseState, IDataFail } from "../rootReducer"

export interface memberList {
    guid: string,
    channel_guid: string,
    user_guid: string,
    name: string,
    surname: string,
    email: string,
    status: string,
    type: string,
    date: string
}
export interface IChannelMembers {
    members_count: number,
    invitations_count: number,
    members_max_limit: number,
    list: memberList[]
}

export interface IChannelMembersRequest {
    channel: string | undefined;
}
export type ChannelMembersState = BaseState & {
    data?: IChannelMembers | IDataFail;
    request?: IChannelMembersRequest;
}

export type ChannelMembersAction = {
    type: string;
    data?: IChannelMembers | IDataFail;
    request?: IChannelMembersRequest
}

export type ChannelMembersDispatchType = (args: ChannelMembersAction) => ChannelMembersAction;
