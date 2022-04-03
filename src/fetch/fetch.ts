import { IFetch } from "../types";

let error = false;

export default async function resultFetch(data: IFetch | {}, api: string){
    let resultData;

    await CustomFetch(data, api)
    .then(res => res.json())
    .then(
        (result) => {
            if(result?.errors?.length > 0){
                for(const value of result.errors){
                    if(value.message === 'not authenticated'){
                        if(!error){
                            error = true;
                            resultData = newAccessToken(data, api);
                        }
                    } else {
                        resultData = { error: true, message: value.message };
                    }
                }
            } else {
                error = false;
                resultData = result.data;
            }
        },

        (error) => {
            console.log(error)
            resultData = { error: true, message: error.message };
        }
    );

    return resultData;
}

async function newAccessToken(data: IFetch | {}, api: string){
    let resultData;

    await CustomFetch({}, 'refresh_token')
    .then(res => res.json())
    .then(
        (result) => {
            if(result.ok === true){
                localStorage.setItem('token', result.accessToken);
                resultData = resultFetch(data, api);
            } else {
                throw new Error('FAIL_UPDATE_TOKENS');
            }
        },
        (error) => {
            console.log(error);
            resultData = { error: true, message: error.message };
        }
    );
    
    return resultData;
}

async function CustomFetch(data: IFetch | {}, api: string){
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    requestHeaders.set('Access-Control-Allow-Origin', process.env.REACT_APP_ENDPOINT);
    requestHeaders.set('authorization', `Bearer ${localStorage.getItem('token')}`);
    
    return await fetch(`${process.env.REACT_APP_ENDPOINT}${api}`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: requestHeaders,
        body: JSON.stringify(data)
    });
}