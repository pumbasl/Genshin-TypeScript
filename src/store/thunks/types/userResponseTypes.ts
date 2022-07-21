import { IPromoCode, IWebEvents, IUserinfo, INews } from "../../../types/types"

export interface IUserRegData {
    promosByServer: IPromoCode[];
    getRegUserPromo: {
        promos: IPromoCode[];
    };
    subfields: IWebEvents[];
};

export interface INewAvatarResponse {
    code: boolean;
    ref?: string;
    urlPath?: string;
    message: string;
};

export interface ILoginResponse {
    login: {
        accessToken: string;
    }
};

export interface IRegistreationResponse {
    registration: {
        accessToken: string;
    }
};

export interface IRegUserInfoResponse {
    regUser: IUserinfo
};

export interface IGetNewsResponse {
    getNews: INews[];
}