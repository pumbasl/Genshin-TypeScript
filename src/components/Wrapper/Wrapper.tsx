import React from 'react';
import styled from 'styled-components';
import { IChildren } from '../../types'

const WrapperStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Wrapper = ({ children }: IChildren) => (
    <WrapperStyle>
        {children}
    </WrapperStyle>
);

export default Wrapper;