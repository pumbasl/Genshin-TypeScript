import styled from 'styled-components';

export const CardStyle = styled.div`
    border: 1px solid #000;
    margin: 0px;
    padding: 15px 5px 15px 5px;

    &:hover{
        cursor: pointer;
        text-decoration: none;
        color: inherit;
        color: white;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .3);
    }

    &:not(:last-child){
        margin-bottom: 15px;
    }
`;