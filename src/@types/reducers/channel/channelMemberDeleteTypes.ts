import { BaseState, IDataFail } from "../rootReducer"

export interface IChannelMemberDelete {
    status: boolean,
    requirement: string | null;
}

export interface IChannelMemberDeleteRequest {
    member: string
}
export type ChannelMemberDeleteState = BaseState & {
    data?: IChannelMemberDelete | IDataFail;
    request?: IChannelMemberDeleteRequest;
}

export type ChannelMemberDeleteAction = {
    type: string;
    data?: IChannelMemberDelete | IDataFail;
    request?: IChannelMemberDeleteRequest
}

export type ChannelMemberDeleteDispatchType = (args: ChannelMemberDeleteAction) => ChannelMemberDeleteAction;
