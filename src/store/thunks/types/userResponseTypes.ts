import { IPromoCode, IWebEvents, IUserinfo, INews } from "../../../types/types"

export interface IUserRegData {
    promosByServer: IPromoCode[];
    getRegUserPromo: {
        promos: IPromoCode[];
    };
    subfields: IWebEvents[];
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