import React from 'react';

//pictures
// import { One, Two, Three, Four } from '../../media';
import { Five } from '../../media';
//

//style
import { Background } from '../../style/style';
//

// const pictures = [One, Two, Three, Four];

// function randomInteger(min, max) {
//     const rand = min + Math.random() * (max + 1 - min);
//     return Math.floor(rand);
// }

export default function BackgroundComponent(){
    // const BackgroundRandom = pictures[randomInteger(0, 3)];
    return(
        <Background image={Five} />
    );
}