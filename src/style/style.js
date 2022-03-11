import styled, { keyframes } from 'styled-components';
import { fadeIn, pulse } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;
const pulseAnimation = keyframes`${pulse}`;

const Background = styled.div`
    background: no-repeat center center fixed;
    background-image: url(${ props => props.image });
    background-size: cover;
    z-index: -99;
    position: fixed;
    width: 100%;
    height: 100%;
`;

const BackgroundContainer = styled.div`
    padding: 15px;
    color: black;
    // background-color: rgba(223, 215, 215, .6);
    background-color: rgba(241, 212, 212, .6);
    // background-color: rgba(75, 93, 103, .9);
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
`;

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
});

const Header = styled.div({
    flex: '0 0 auto'
});

const Main = styled.div({
    flex: '1 0 auto',
    marginTop: '40px',
    marginBottom: '40px'
});

const Footer = styled.div({
    flex: '0 0 auto',
    backgroundColor: 'black',
    color: 'white'
});

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

const FooterContainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    align-content: center;

    @media (min-width: 320px) and (max-width: 529px) {
        flex-direction: column;
    }
`;

const FooterCardTitle = styled.div`
    width: 250px;

    @media (min-width: 320px) and (max-width: 529px) {
        &:not(:first-child){
            margin-top: 20px;
        }
    }

    @media (min-width: 530px) and (max-width: 991px){
        margin-top: 0px;
        &:nth-child(3){
            margin-top: 20px;
        }
        &:nth-child(4){
            margin-top: 20px;
        }
    }

    @media (min-width: 992px) and (max-width: 1199px){
        &:nth-child(4){
            margin-top: 20px;
        }
    }
`;

const FooterCardBody = styled.div`
    font-weight: 300;
    font-size: 80%;

    @media (min-width: 1200px){
        &:first-child{
            margin-top: 20px;
        }
    }
`;

const FooterCardElement = styled.a`
    color: inherit;

    &:hover{
        text-decoration: none;
    }
`;

const CoockieContainer = styled.div`
    position: fixed;
    bottom: 0;
    background-color: rgba(255, 255, 255, .9);
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    z-index: 999;
`;

const FooterCopyright = styled.div`
    text-align: center;
    font-weight: 300;
    font-size: 90%;
    margin-bottom: 10px;
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

const CardThread = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid black;
    color: black;
    text-decoration: none;
    padding: 10px;

    &:hover{
        color: black;
        transition: all .3s ease-out;
        cursor: pointer;
        background-color: rgba(255, 255, 255, .3); 
    }

    &:not(:last-child){
        margin-bottom: 10px;
    }

    & .title{
        .subTitle{
            color: grey;
            font-size: 70%;
        }
    }

    & .information{
        & .authorName{
            color: #FBD148;
        }
    }
`;

const ThreadContainer = styled.div``;

export {
    ThreadContainer,
    CardThread,
    ButtonChangeServerStyle,
    PlaceHolderForForm,
    ContainerForForm,
    FooterCopyright,
    CoockieContainer,
    FooterCardElement,
    FooterContainer,
    FooterCardTitle,
    FooterCardBody,
    Background,
    PromoCard,
    PromoCardBlock,
    PromoExpired,
    Wrapper,
    Header,
    Main,
    Footer,
    BackgroundContainer
};