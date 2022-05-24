import { IUserinfo } from "../../../types/types";

export interface IAllUsersResponse {
    regUsers: IUserinfo[];
};

export interface ISearchUserByLoginResponse {
    searchUsersByName: IUserinfo[];
};

export interface ILogOutForUserResponse {
    revokeRefreshTokensForRegUser: boolean;
};