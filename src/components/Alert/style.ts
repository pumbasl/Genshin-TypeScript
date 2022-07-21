import styled from 'styled-components';

interface AlertStyleProps {
    bgColor?: string;
};

const AlertStyle = styled.div<AlertStyleProps>`
    padding: 10px;
    background-color: ${props => props.bgColor ? props.bgColor : 'rgb(45, 47, 51)'};
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

export { AlertStyle, ColorLink };