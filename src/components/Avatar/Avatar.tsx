import React from 'react';

import { Image } from 'react-bootstrap';

//media
import { DefaultAvatar } from '../../media';
//

//redux
import { useAppSelector } from '../../hooks/redux';
//

interface PropsTypes {
    type: string;
};

export default function Avatar({ type }: PropsTypes){
    const avatarSrc = useAppSelector((state) => state.user.userinfo?.avatar);
    const resultSrc = avatarSrc ? avatarSrc.urlPath : DefaultAvatar;

    if(type === 'rounded'){
        return(
            <Image className="mt-4" src={resultSrc} width="250px" height="250px" rounded alt="avatar" />
        );
    }

    if(type === 'roundedCircle'){
        return(
            <Image src={resultSrc} width="100%" height="100%" roundedCircle alt="avatar" />
        );
    }

    return(null);
}