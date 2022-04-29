import React from 'react';
import styled from 'styled-components';

//pictures
// import { One, Two, Three, Four } from '../../media';
import { Six } from '../../media';
//

//style
const Background = styled.div`
    background: no-repeat center center fixed;
    background-image: url(${ (props: IProps) => props.image });
    background-size: cover;
    z-index: -99;
    position: fixed;
    width: 100%;
    height: 100%;
`;
//

interface IProps {
    image: string;
};

// const pictures = [One, Two, Three, Four];

// function randomInteger(min, max) {
//     const rand = min + Math.random() * (max + 1 - min);
//     return Math.floor(rand);
// }

export default function BackgroundComponent(){
    // const BackgroundRandom = pictures[randomInteger(0, 3)];
    return(
        <Background image={Six} />
    );
}