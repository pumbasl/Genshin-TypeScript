import React from "react";

export interface IGameInfo{
    gameNickName: string;
    adventureLvl: number;
    mainChar: string;
}

export interface ILoginData {
    login: string;
    password: string;
};

export interface IRegistradionData extends IServer {
    login: string;
    password: string;
    re_password: string;
};

export interface IServer {
    server: 'All' | 'Europe' | 'America' | 'Asia';
}

export interface IPromoCode extends IServer{
    _id: string;
    code: string;
    expired: number;
    created: number;
}

export interface IWebEvents{
    _id: string;
    name: string;
    link: string;
    expired: number;
    created: number;
}

export interface IAvatar{
    urlPath: string;
    ref: string;
}

export interface IUserinfo extends IServer{
    _id: string;
    login: string;
    reg: number;
    roles: string[];
    email: string | null;
    avatar: IAvatar;
    ua: string;
    gameInfo: IGameInfo
}

export interface INews{
    _id: string;
    title: string;
    subtitle: string;
    text: string;
    author: { login: string; }
    date: number;
}

export interface IFetch{
    query: string;
    variables: any;
}


export interface IStateButton {
    text: string;
    disabled: boolean;
}

export interface IAlert {
    _id: string;
    text: string;
    expired: number;
    type: string;
}

export interface IChildren {
    children?: React.ReactNode;
}

export interface IRefreshResponse {
    ok: boolean;
    accessToken: string;
}