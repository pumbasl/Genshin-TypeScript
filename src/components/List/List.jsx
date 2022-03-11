import React from 'react';

//Style
import {
    FooterContainer,
    FooterCardTitle,
    FooterCardBody,
} from '../../style/style';
//


const List = {

    Container: function Container(props){
        return(
            <FooterContainer>
                {props.children}
            </FooterContainer>
        );
    },

    Title: function Title(props){
        return(
            <FooterCardTitle>
                {props.children}
            </FooterCardTitle>
        );
    },

    Body: function Body(props){
        return(
            <FooterCardBody>
                {props.children}
            </FooterCardBody>
        );
    }
};

export default List;