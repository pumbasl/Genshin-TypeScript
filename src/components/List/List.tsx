import React from 'react';

//Style
import {
    FooterContainer,
    FooterCardTitle,
    FooterCardBody,
} from './style';
//

interface IProps {
    children: React.ReactNode;
};

const List = {
    Container: function Container({ children }: IProps){
        return(
            <FooterContainer>
                {children}
            </FooterContainer>
        );
    },

    Title: function Title({ children }: IProps){
        return(
            <FooterCardTitle>
                {children}
            </FooterCardTitle>
        );
    },

    Body: function Body({ children }: IProps){
        return(
            <FooterCardBody>
                {children}
            </FooterCardBody>
        );
    }
};

export default List;