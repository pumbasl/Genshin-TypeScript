import styled from 'styled-components';

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

export {
    PlaceHolderForForm,
    ContainerForForm,
    FooterCardElement
};