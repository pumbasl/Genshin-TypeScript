import styled from 'styled-components';

export const FooterContainer = styled.div`
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

export const FooterCardTitle = styled.div`
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

export const FooterCardBody = styled.div`
    font-weight: 300;
    font-size: 80%;

    @media (min-width: 1200px){
        &:first-child{
            margin-top: 20px;
        }
    }
`;