export interface IGameInfo{
    gameNickName: string;
    adventureLvl: number;
    mainChar: string;
}

export interface IPromoCode{
    _id: string;
    code: string;
    server: 'All' | 'Europe' | 'America' | 'Asia';
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

export interface IUserinfo{
    _id: string;
    login: string;
    reg: number;
    roles: string[];
    email: string | null;
    avatar: IAvatar;
    server: string;
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