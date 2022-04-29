import React from 'react';
import styled from 'styled-components';

const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

interface IProps {
    children: React.ReactNode;
};

const Wrapper = ({ children }: IProps) => (
    <WrapperStyle>
        {children}
    </WrapperStyle>
);

export default Wrapper;