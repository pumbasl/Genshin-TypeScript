import React from 'react';

import { Image } from 'react-bootstrap';

//media
import { DefaultAvatar } from '../../media/';
//

//redux
import { useSelector } from 'react-redux';
//

export default function Avatar({ type }){
    const avatarSrc = useSelector((state) => state.user.userinfo.avatar);
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
}