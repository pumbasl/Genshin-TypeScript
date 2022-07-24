import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArrowUp } from '../../media';

const ScrollUpDiv = styled.div`
    position: fixed;
    cursor: pointer;
    bottom: 0;
    right: 0;

    margin-bottom: 15px;
    margin-right: 15px;
    padding-top: 5px;

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255,255,255, .8);
    text-align: center;
`;

const ScrollUp = () => {
    const [ show, setShow ] = useState(false); 

    const checkScroll = () => {
        setShow(window.scrollY > 200)
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    if(show) {
        return(
            <ScrollUpDiv onClick={handleClick}>
                <img className='text-align' src={ArrowUp} alt='arrow' width='100%' height='100%' />
            </ScrollUpDiv>
        );
    }

    return null;
}

export default ScrollUp;