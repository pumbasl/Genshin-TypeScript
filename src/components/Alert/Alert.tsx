import React from 'react';
import styled from 'styled-components';

const AlertStyle = styled.div`
    padding: 10px;
    background-color: rgb(45, 47, 51);
    color: white;
    font-size: 18px;
`;

const ColorLink = styled.span`
    margin-left: 5px;

    a{
        color: #61dafb;
        text-decoration: none;
    }
`;

const Alert = () => {
    return(
        <AlertStyle className='text-center'>
            Поддержите Украину 🇺🇦 
            <ColorLink>
                <a href='https://opensource.fb.com/support-ukraine'>Помогите с гуманитарной помощью Украине. Россияне, не молчите! Нет войне!</a>
            </ColorLink>
        </AlertStyle>
    );
};

export default Alert;