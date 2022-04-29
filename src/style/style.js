import styled, { keyframes } from 'styled-components';
import { fadeIn, pulse } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;
const pulseAnimation = keyframes`${pulse}`;

const PromoCard = styled.div`
    animation: 1s ${fadeInAnimation};
    &:not(:last-child){
        margin-bottom: 15px;
    }
`;

const PromoCardBlock = styled.div`
    border: 1px solid #000;
    padding: 15px;
    display: block;
    
    &:after {
        display: block;
        content: "";
        clear: both;
    }

    &:hover{
        animation: .3s ${pulseAnimation};
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        color: white;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .3);
    }
`;

const PromoExpired = styled.div`
    float: right;
`;

const FooterCardElement = styled.a`
    color: inherit;

    &:hover{
        text-decoration: none;
    }
`;

const ContainerForForm = styled.div`
    margin: auto;
    border: 1px solid #fff;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    color: white;
    background-color: rgba(51, 71, 86, .5);
    padding: 15px;
    width: 500px;

    @media (min-width: 320px) and (max-width: 540px){
        width: 100%;
    }
`;

const PlaceHolderForForm = styled.div`
    background-color: rgba(255, 255, 255, .3);
    text-align: center;
    line-height: 35vh;
    width: 100%;
    height: 35vh;
`;

const ButtonChangeServerStyle = styled.div`
    animation: infinite 2s ${pulseAnimation};
    position: fixed;
    right: 0;
    top: 7%;
    margin-right: 10px;
`;

export {
    ButtonChangeServerStyle,
    PlaceHolderForForm,
    ContainerForForm,
    FooterCardElement,
    PromoCard,
    PromoCardBlock,
    PromoExpired
};