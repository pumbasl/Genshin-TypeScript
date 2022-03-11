let error = false;

export default async function resultFetch(data, api){
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

async function newAccessToken(data, api){
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

async function CustomFetch(data, api){
    return await fetch(`${process.env.REACT_APP_ENDPOINT}${api}`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': process.env.REACT_APP_ENDPOINT,
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });
}